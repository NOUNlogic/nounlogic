'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ChatInterface } from '@/components/sensay/ChatComponents';
import { 
  TEACHING_ASSISTANT_CONFIG, 
  SUBJECT_EXPERT_CONFIG, 
  LEARNING_COACH_CONFIG,
  TOPIC_CONFIGS 
} from '@/lib/sensay/config';
import { VerboseSensayAPI } from '@/api-debug';
import { SAMPLE_USER_ID, SAMPLE_REPLICA_SLUG, API_VERSION } from '@/constants/auth';

// Educational topics for the AI assistant
const TOPICS = Object.entries(TOPIC_CONFIGS).map(([id, config]) => ({
  id,
  name: config.name,
  prompt: config.prompt,
  description: config.description
}));

// Different AI assistant roles
const ASSISTANT_ROLES = [
  { 
    id: 'TEACHING_ASSISTANT', 
    name: TEACHING_ASSISTANT_CONFIG.name, 
    description: TEACHING_ASSISTANT_CONFIG.description,
    icon: 'teacher'
  },
  { 
    id: 'SUBJECT_EXPERT', 
    name: SUBJECT_EXPERT_CONFIG.name, 
    description: SUBJECT_EXPERT_CONFIG.description,
    icon: 'expert'
  },
  { 
    id: 'LEARNING_COACH', 
    name: LEARNING_COACH_CONFIG.name, 
    description: LEARNING_COACH_CONFIG.description,
    icon: 'coach'
  }
];

const getApiKey = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SENSAY_API_KEY_SECRET || '';
  }
  return '';
};

const initializeSensaySession = async (apiKey: string) => {
  // 1. Org-only client
  const orgClient = new VerboseSensayAPI({
    HEADERS: {
      'X-ORGANIZATION-SECRET': apiKey
    }
  });
  // 2. Check user
  let userExists = false;
  try {
    await orgClient.users.getV1Users(SAMPLE_USER_ID);
    userExists = true;
  } catch (e) {}
  // 3. Create user if needed
  if (!userExists) {
    await orgClient.users.postV1Users(API_VERSION, {
      id: SAMPLE_USER_ID,
      email: `${SAMPLE_USER_ID}@example.com`,
      name: 'Sample User'
    });
  }
  // 4. User-auth client
  const client = new VerboseSensayAPI({
    HEADERS: {
      'X-ORGANIZATION-SECRET': apiKey,
      'X-USER-ID': SAMPLE_USER_ID
    }
  });
  // 5. Find or create replica
  let replicas = await client.replicas.getV1Replicas();
  let replicaId;
  if (replicas.items && replicas.items.length > 0) {
    const sampleReplica = replicas.items.find(r => r.slug === SAMPLE_REPLICA_SLUG);
    if (sampleReplica) replicaId = sampleReplica.uuid;
  }
  if (!replicaId) {
    const newReplica = await client.replicas.postV1Replicas(API_VERSION, {
      name: 'Sample Replica',
      shortDescription: 'A sample replica for demonstration',
      greeting: "Hello, I'm the sample replica. How can I help you today?",
      slug: SAMPLE_REPLICA_SLUG,
      ownerID: SAMPLE_USER_ID,
      llm: {
        model: 'claude-3-7-sonnet-latest',
        memoryMode: 'prompt-caching',
        systemMessage: 'You are a helpful AI assistant that provides clear and concise responses.'
      }
    });
    replicaId = newReplica.uuid;
  }
  return { client, replicaId };
};

const AIClient = () => {
  const [apiKey] = useState(getApiKey());
  const [sensayClient, setSensayClient] = useState<any>(null);
  const [replicaId, setReplicaId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady && apiKey) {
      setIsLoading(true);
      initializeSensaySession(apiKey)
        .then(({ client, replicaId }) => {
          setSensayClient(client);
          setReplicaId(replicaId);
          setIsReady(true);
        })
        .catch((err) => {
          setError('Failed to initialize Sensay: ' + (err?.message || err));
        })
        .finally(() => setIsLoading(false));
    }
  }, [apiKey, isReady]);

  const handleSendMessage = async (message: string) => {
    if (!sensayClient || !replicaId) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    try {
      const response = await sensayClient.chatCompletions.postV1ReplicasChatCompletions(
        replicaId,
        API_VERSION,
        {
          content: message,
          source: 'web',
          skip_chat_history: false
        }
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: response.content }]);
    } catch (err: any) {
      setError('Failed to send message: ' + (err?.message || err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Learning Assistant</h1>
          <p className="text-muted-foreground">
            Get personalized help with your learning journey
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            title="AI Assistant"
            subtitle="Powered by Sensay's Wisdom Engine"
            inputPlaceholder="Ask a question or discuss a topic..."
            emptyStateMessage="Send a message to start the conversation with your AI learning assistant."
          />
          {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
        </div>
      </div>
    </MainLayout>
  );
};

export default AIClient;