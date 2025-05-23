'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ChatInterface } from '@/components/sensay/ChatComponents';
import { SensayAPI } from '@/sensay-sdk';
import { SAMPLE_USER_ID, SAMPLE_REPLICA_SLUG, API_VERSION } from '@/constants/auth';

const getApiKey = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SENSAY_API_KEY_SECRET || '';
  }
  return '';
};

const initializeSensaySession = async (apiKey: string) => {
  console.log('Starting Sensay session initialization...');
  try {
    // 1. Org-only client
    console.log('Step 1: Creating org-only client...');
    const orgClient = new SensayAPI({
      HEADERS: {
        'X-ORGANIZATION-SECRET': apiKey
      }
    });
    
    // 2. Check user
    console.log('Step 2: Checking if user exists...');
    let userExists = false;
    try {
      await orgClient.users.getV1Users(SAMPLE_USER_ID);
      userExists = true;
      console.log('User exists');
    } catch (e) {
      console.log('User does not exist, will create');
    }
    
    // 3. Create user if needed
    if (!userExists) {
      console.log('Step 3: Creating user...');
      try {
        await orgClient.users.postV1Users(API_VERSION, {
          id: SAMPLE_USER_ID,
          email: `${SAMPLE_USER_ID}@example.com`,
          name: 'Sample User'
        });
        console.log('User created successfully');
      } catch (error: any) {
        // If user already exists (409 conflict), that's okay - continue
        if (error.status === 409) {
          console.log('User already exists (409), continuing...');
        } else {
          console.error('Error creating user:', error);
          throw error;
        }
      }
    }
    
    // 4. User-auth client
    console.log('Step 4: Creating user-authenticated client...');
    const client = new SensayAPI({
      HEADERS: {
        'X-ORGANIZATION-SECRET': apiKey,
        'X-USER-ID': SAMPLE_USER_ID
      }
    });
    
    // 5. Find or create replica
    console.log('Step 5: Looking for existing replica...');
    let replicas = await client.replicas.getV1Replicas();
    let replicaId;
    
    // Look for the sample replica by slug
    if (replicas.items && replicas.items.length > 0) {
      const sampleReplica = replicas.items.find((r: any) => r.slug === SAMPLE_REPLICA_SLUG);
      if (sampleReplica) {
        replicaId = sampleReplica.uuid;
        console.log(`Found existing replica: ${replicaId}`);
      }
    }
    
    // Create the sample replica if it doesn't exist
    if (!replicaId) {
      console.log('Creating new replica...');
      try {
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
        console.log(`Created new replica: ${replicaId}`);
      } catch (error: any) {
        if (error.status === 409) {
          console.log('Replica already exists (409), searching again...');
          // Try to find it again
          replicas = await client.replicas.getV1Replicas();
          if (replicas.items && replicas.items.length > 0) {
            const sampleReplica = replicas.items.find((r: any) => r.slug === SAMPLE_REPLICA_SLUG);
            if (sampleReplica) {
              replicaId = sampleReplica.uuid;
              console.log(`Found existing replica after conflict: ${replicaId}`);
            }
          }
          if (!replicaId) {
            throw new Error('Replica creation failed: slug already exists but replica not found');
          }
        } else {
          console.error('Error creating replica:', error);
          throw error;
        }
      }
    }
    
    console.log('Session initialization complete');
    return { client, replicaId };
  } catch (error: any) {
    console.error('Session initialization failed:', error);
    throw error;
  }
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