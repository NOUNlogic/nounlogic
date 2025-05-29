'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ChatInterface } from '@/components/sensay/ChatComponents';
import { SensayAPI } from '@/sensay-sdk';
import { SAMPLE_USER_ID, SAMPLE_REPLICA_SLUG, API_VERSION } from '@/constants/auth';
import { Brain } from 'lucide-react';

const getApiKey = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SENSAY_API_KEY_SECRET || '';
  }
  return '';
};

const initializeSensaySession = async (apiKey: string) => {
  console.log('Starting Sensay session initialization...');
  console.log('API Key length:', apiKey.length);
  
  if (!apiKey) {
    throw new Error('No API key provided');
  }
  
  try {
    // 1. Initialize organization-only client (no user authentication)
    console.log('Step 1: Creating organization-only client...');
    const orgClient = new SensayAPI({
      HEADERS: {
        'X-ORGANIZATION-SECRET': apiKey
      }
    });

    // 2. Check if sample user exists
    console.log('Step 2: Checking if sample user exists...');
    let userExists = false;
    try {
      await orgClient.users.getV1Users(SAMPLE_USER_ID);
      userExists = true;
      console.log('User exists');
    } catch (error) {
      console.log('User does not exist, will create');
    }

    // 3. Create user if needed
    if (!userExists) {
      console.log('Step 3: Creating user...');
      try {
        await orgClient.users.postV1Users(API_VERSION, {
          id: SAMPLE_USER_ID,
          email: `${SAMPLE_USER_ID}@example.com`,
          name: "Sample User"
        });
        console.log('User created successfully');
      } catch (error: any) {
        // If user already exists (409 conflict), that's okay - continue
        if (error.status === 409 || error.message?.includes('Conflict')) {
          console.log('User already exists (409 conflict), continuing...');
        } else {
          console.error('Error creating user:', error);
          throw error;
        }
      }
    }

    // 4. Initialize user-authenticated client for further operations
    console.log('Step 4: Creating user-authenticated client...');
    const client = new SensayAPI({
      HEADERS: {
        'X-ORGANIZATION-SECRET': apiKey,
        'X-USER-ID': SAMPLE_USER_ID
      }
    });
    
    // Test the connection
    console.log('Testing authentication...');
    const testReplicas = await client.replicas.getV1Replicas();
    console.log('Authentication successful, found', testReplicas.items?.length || 0, 'replicas');
    
    // 5. Find or create replica
    console.log('Step 5: Looking for existing replica...');
    
    // List replicas to find our sample replica
    const replicas = await client.replicas.getV1Replicas();
    let replicaId;
    
    // Look for the sample replica by slug
    if (replicas.items && replicas.items.length > 0) {
      const sampleReplica = replicas.items.find((replica: any) => replica.slug === SAMPLE_REPLICA_SLUG);
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
          name: "Sample Replica",
          shortDescription: "A sample replica for demonstration",
          greeting: "Hello, I'm the sample replica. How can I help you today?",
          slug: SAMPLE_REPLICA_SLUG,
          ownerID: SAMPLE_USER_ID,
          llm: {
            model: "claude-3-7-sonnet-latest",
            memoryMode: "prompt-caching",
            systemMessage: "You are a helpful AI assistant that provides clear and concise responses."
          }
        });
        replicaId = newReplica.uuid;
        console.log(`Created new replica: ${replicaId}`);
      } catch (error: any) {
        // If replica already exists (409 conflict), try to find it
        if (error.status === 409 || error.message?.includes('Conflict')) {
          console.log('Replica already exists (409 conflict), searching for it...');
          // Search again for the replica
          const conflictReplicas = await client.replicas.getV1Replicas();
          if (conflictReplicas.items && conflictReplicas.items.length > 0) {
            const existingReplica = conflictReplicas.items.find((replica: any) => replica.slug === SAMPLE_REPLICA_SLUG);
            if (existingReplica) {
              replicaId = existingReplica.uuid;
              console.log(`Found existing replica after conflict: ${replicaId}`);
            } else {
              // If we still can't find it, create with a unique slug
              const uniqueSlug = `${SAMPLE_REPLICA_SLUG}-${Date.now()}`;
              console.log(`Creating replica with unique slug: ${uniqueSlug}`);
              const uniqueReplica = await client.replicas.postV1Replicas(API_VERSION, {
                name: "Sample Replica",
                shortDescription: "A sample replica for demonstration",
                greeting: "Hello, I'm the sample replica. How can I help you today?",
                slug: uniqueSlug,
                ownerID: SAMPLE_USER_ID,
                llm: {
                  model: "claude-3-7-sonnet-latest",
                  memoryMode: "prompt-caching",
                  systemMessage: "You are a helpful AI assistant that provides clear and concise responses."
                }
              });
              replicaId = uniqueReplica.uuid;
              console.log(`Created replica with unique slug: ${replicaId}`);
            }
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
          setError('Failed to initialize Sensay: ' + (err?.message || err?.toString() || 'Unknown error'));
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
      setError('Failed to send message: ' + (err?.message || err?.toString() || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50/30 to-pink-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 px-4 sm:px-6 lg:px-8 py-6 space-y-8 transition-all duration-300">
        {/* Animated floating orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-60 right-32 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-xl animate-float-slow"></div>
        </div>

        {/* Header Section with enhanced design */}
        <div className="relative text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-lg shadow-purple-500/30 animate-float mb-4">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient mb-4">
              NounLogic AI Assistant
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Your intelligent learning companion powered by{' '}
              <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sensay AI
              </span>
            </p>
          </div>
          
          {/* Status indicator with enhanced styling */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-500 animate-pulse' : 'bg-yellow-500 animate-spin'}`}></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {isReady ? 'AI Ready' : isLoading ? 'Initializing AI...' : 'Connecting...'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mx-auto max-w-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 animate-shake">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Connection Error</h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Chat Interface with enhanced 3D design */}
        <div className="mx-auto max-w-4xl">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-3xl transition-all duration-300">
            {/* Chat Header */}
            <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-blue-900/30 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Learning Assistant</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Ask me anything about your courses!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Area with enhanced styling */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white/50 dark:from-slate-900/50 dark:to-slate-800/50">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl mb-4">
                    <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Start a Conversation</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">Ask me about your courses, assignments, or any learning topics!</p>
                  
                  {/* Suggested prompts with enhanced styling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {[
                      "Explain blockchain concepts",
                      "Help with React components", 
                      "Review my course progress",
                      "Study tips for exams"
                    ].map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => isReady && handleSendMessage(prompt)}
                        disabled={!isReady}
                        className="p-3 text-left bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg transition-all duration-200 group"
                      >
                        <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          {prompt}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' 
                        : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-lg'
                    }`}>
                      <p className={`text-sm ${message.role === 'user' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl px-4 py-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-300">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area with enhanced design */}
            <div className="p-6 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 border-t border-slate-200/50 dark:border-slate-700/50">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const message = formData.get('message') as string;
                if (message.trim() && isReady) {
                  handleSendMessage(message.trim());
                  (e.target as HTMLFormElement).reset();
                }
              }}>
                <div className="flex items-end space-x-4">
                  <div className="flex-1 relative">
                    <textarea
                      name="message"
                      placeholder={isReady ? "Type your message..." : "Initializing AI..."}
                      disabled={!isReady || isLoading}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-inner"
                      rows={1}
                      style={{minHeight: '48px', maxHeight: '120px'}}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!isReady || isLoading}
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
              
              {/* AI Features showcase */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {[
                  "💬 Natural conversation",
                  "🧠 Course-specific help", 
                  "📊 Progress insights",
                  "🎯 Personalized tips"
                ].map((feature, index) => (
                  <span key={index} className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AIClient;