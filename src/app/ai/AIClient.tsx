'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';
import { ChatInterface } from '@/components/sensay/ChatComponents';
import { useSensayEducation } from '@/sensay/education';
import { BrainIcon } from '@/components/ui/Icons';
import { 
  TEACHING_ASSISTANT_CONFIG, 
  SUBJECT_EXPERT_CONFIG, 
  LEARNING_COACH_CONFIG,
  TOPIC_CONFIGS 
} from '@/lib/sensay/config';

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

const AIClient = () => {
  const [selectedRole, setSelectedRole] = useState(ASSISTANT_ROLES[0].id);
  const [isConfiguring, setIsConfiguring] = useState(true);

  const {
    messages,
    sendMessage,
    isLoading,
    setIsLoading,
    isReady,
    initialize
  } = useSensayEducation({
    role: selectedRole as any,
    autoInitialize: false
  });

  // Auto-initialize on component mount
  useEffect(() => {
    if (!isReady && !isLoading) {
      // This will call initializeApi() internally in useSensayEducation
      initialize().catch(err => {
        console.error("Failed to initialize Sensay:", err);
        // Show a user-friendly error message
        alert("Failed to initialize AI assistant. Please check your API key and try again.");
      });
    }
  }, [isReady, isLoading, initialize]);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleStartChat = async (initialPrompt?: string) => {
    try {
      // Show visual feedback that something is happening
      setIsLoading(true);
      console.log("Starting chat...");
      
      // Make sure we're initialized
      if (!isReady) {
        console.log("Initializing API first...");
        await initialize();
      }
      
      // If there's an initial prompt, send it
      if (initialPrompt) {
        console.log("Sending initial prompt:", initialPrompt);
        await sendMessage(initialPrompt);
      }
      
      // Switch to chat view
      setIsConfiguring(false);
    } catch (error) {
      console.error('Failed to start chat:', error);
      alert("Could not start chat. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  const handleResetChat = () => {
    setIsConfiguring(true);
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

        {isConfiguring ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Assistant Configuration */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Assistant</CardTitle>
                  <CardDescription>
                    Select the type of AI assistant that best suits your needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ASSISTANT_ROLES.map((role) => (
                      <div
                        key={role.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedRole === role.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleRoleSelect(role.id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                            <BrainIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{role.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {role.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-6">
                      <Button
                        onClick={() => handleStartChat()}
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Starting...' : 'Start Custom Conversation'}
                      </Button>
                      {!isReady && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {isLoading ? 'Connecting to AI...' : 'AI Assistant ready to chat'}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Topic Selection */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Topics</CardTitle>
                  <CardDescription>
                    Choose a topic to get started with a guided learning experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {TOPICS.map((topic) => (
                      <div
                        key={topic.id}
                        className={`p-4 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors ${isLoading ? 'opacity-50' : ''}`}
                        onClick={() => !isLoading && handleStartChat(topic.prompt)}
                      >
                        <h3 className="font-medium">{topic.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Get started with {topic.name.toLowerCase()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-lg border border-border bg-secondary/50">
                    <h3 className="font-medium flex items-center">
                      <BrainIcon className="h-5 w-5 mr-2 text-primary" />
                      How it works
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our AI Learning Assistant powered by Sensay's Wisdom Engine provides personalized guidance
                      and answers to help you master blockchain and Web3 concepts. Choose a topic above
                      or start a custom conversation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {ASSISTANT_ROLES.find(r => r.id === selectedRole)?.name || 'AI Assistant'}
                  </CardTitle>
                  <CardDescription>
                    Ask questions or discuss topics to enhance your learning
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={handleResetChat}>
                  New Conversation
                </Button>
              </CardHeader>
              <CardContent className="h-[600px]">
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  title={ASSISTANT_ROLES.find(r => r.id === selectedRole)?.name || 'AI Assistant'}
                  subtitle="Powered by Sensay's Wisdom Engine"
                  inputPlaceholder="Ask a question or discuss a topic..."
                  emptyStateMessage="Send a message to start the conversation with your AI learning assistant."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-border hover:bg-secondary transition-colors">
                    <h3 className="font-medium">Web3 Fundamentals</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Core concepts and technology behind Web3
                    </p>
                    <Button variant="link" className="px-0 mt-2">Learn More</Button>
                  </div>
                  <div className="p-4 rounded-lg border border-border hover:bg-secondary transition-colors">
                    <h3 className="font-medium">Smart Contract Development</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Build and deploy secure smart contracts
                    </p>
                    <Button variant="link" className="px-0 mt-2">Learn More</Button>
                  </div>
                  <div className="p-4 rounded-lg border border-border hover:bg-secondary transition-colors">
                    <h3 className="font-medium">Blockchain Architecture</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Understanding blockchain structure and protocols
                    </p>
                    <Button variant="link" className="px-0 mt-2">Learn More</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AIClient;