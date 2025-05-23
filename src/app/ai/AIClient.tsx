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

const getOrgId = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SENSAY_ORGANIZATION_ID || '';
  }
  return '';
};

const initializeSensaySession = async (apiKey: string, orgId: string) => {
  console.log('Starting Sensay session initialization...');
  console.log('API Key length:', apiKey.length);
  console.log('Org ID length:', orgId.length);
  
  try {
    // Based on endpoints.md, try different authentication approaches
    // First attempt: Use orgId as X-ORGANIZATION-SECRET and apiKey as X-USER-ID
    console.log('Attempt 1: Using orgId as X-ORGANIZATION-SECRET, apiKey as X-USER-ID');
    let client = new SensayAPI({
      HEADERS: {
        'X-ORGANIZATION-SECRET': orgId,
        'X-USER-ID': apiKey
      }
    });
    
    try {
      // Test the connection by trying to list replicas
      await client.replicas.getV1Replicas(undefined, 1, 1);
      console.log('Authentication successful with orgId as secret');
    } catch (error: any) {
      if (error.status === 401) {
        console.log('Attempt 1 failed, trying different approach...');
        // Second attempt: Use apiKey as X-ORGANIZATION-SECRET and orgId as X-USER-ID
        console.log('Attempt 2: Using apiKey as X-ORGANIZATION-SECRET, orgId as X-USER-ID');
        client = new SensayAPI({
          HEADERS: {
            'X-ORGANIZATION-SECRET': apiKey,
            'X-USER-ID': orgId
          }
        });
        
        try {
          await client.replicas.getV1Replicas(undefined, 1, 1);
          console.log('Authentication successful with apiKey as secret');
        } catch (error2: any) {
          if (error2.status === 401) {
            console.log('Attempt 2 failed, trying apiKey for both...');
            // Third attempt: Use apiKey for both (like in endpoints.md)
            client = new SensayAPI({
              HEADERS: {
                'X-ORGANIZATION-SECRET': apiKey,
                'X-USER-ID': apiKey
              }
            });
            
            await client.replicas.getV1Replicas(undefined, 1, 1);
            console.log('Authentication successful with apiKey for both');
          } else {
            throw error2;
          }
        }
      } else {
        throw error;
      }
    }
    
    // 2. Find or create replica
    console.log('Step 2: Looking for existing replica...');
    
    // Search for replica by slug
    let replicas = await client.replicas.getV1Replicas(
      undefined, // ownerUuid
      1, // pageIndex
      100, // pageSize
      SAMPLE_REPLICA_SLUG // slug filter
    );
    
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
          ownerID: apiKey, // Use the API key as owner ID
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
          
          // Try to find it again without filters
          replicas = await client.replicas.getV1Replicas();
          console.log(`Total replicas found: ${replicas.items?.length || 0}`);
          
          if (replicas.items && replicas.items.length > 0) {
            console.log('All replica slugs:', replicas.items.map((r: any) => r.slug));
            
            const sampleReplica = replicas.items.find((r: any) => r.slug === SAMPLE_REPLICA_SLUG);
            if (sampleReplica) {
              replicaId = sampleReplica.uuid;
              console.log(`Found existing replica after conflict: ${replicaId}`);
            }
          }
          
          if (!replicaId) {
            // Use a unique slug as fallback
            const uniqueSlug = `${SAMPLE_REPLICA_SLUG}-${Date.now()}`;
            console.log(`Creating replica with unique slug: ${uniqueSlug}`);
            
            const newReplica = await client.replicas.postV1Replicas(API_VERSION, {
              name: 'Sample Replica',
              shortDescription: 'A sample replica for demonstration',
              greeting: "Hello, I'm the sample replica. How can I help you today?",
              slug: uniqueSlug,
              ownerID: apiKey,
              llm: {
                model: 'claude-3-7-sonnet-latest',
                memoryMode: 'prompt-caching',
                systemMessage: 'You are a helpful AI assistant that provides clear and concise responses.'
              }
            });
            replicaId = newReplica.uuid;
            console.log(`Created replica with unique slug: ${replicaId}`);
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
  const [orgId] = useState(getOrgId());
  const [sensayClient, setSensayClient] = useState<any>(null);
  const [replicaId, setReplicaId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady && apiKey && orgId) {
      setIsLoading(true);
      initializeSensaySession(apiKey, orgId)
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
  }, [apiKey, orgId, isReady]);

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