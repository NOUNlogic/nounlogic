'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSensay } from './context';
import { Message } from './api';
import { 
  TEACHING_ASSISTANT_CONFIG, 
  SUBJECT_EXPERT_CONFIG, 
  LEARNING_COACH_CONFIG 
} from './config';

// Default educational replicas by role
const EDUCATION_REPLICAS = {
  TEACHING_ASSISTANT: TEACHING_ASSISTANT_CONFIG.replicaId,
  SUBJECT_EXPERT: SUBJECT_EXPERT_CONFIG.replicaId,
  LEARNING_COACH: LEARNING_COACH_CONFIG.replicaId,
};

export interface UseSensayEducationOptions {
  role?: 'TEACHING_ASSISTANT' | 'SUBJECT_EXPERT' | 'LEARNING_COACH';
  autoInitialize?: boolean;
  replicaId?: string;
  initialPrompt?: string;
}

export function useSensayEducation(options: UseSensayEducationOptions = {}) {
  const {
    role = 'TEACHING_ASSISTANT',
    autoInitialize = true,
    replicaId,
    initialPrompt
  } = options;

  const sensay = useSensay();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  // Get the appropriate replica ID based on role or use the provided one
  const getReplicaId = useCallback(() => {
    if (replicaId) return replicaId;
    return EDUCATION_REPLICAS[role];
  }, [replicaId, role]);

  // Get the appropriate initial prompt based on the role
  const getInitialPrompt = useCallback(() => {
    if (initialPrompt) return initialPrompt;

    switch (role) {
      case 'TEACHING_ASSISTANT':
        return TEACHING_ASSISTANT_CONFIG.initialPrompt;
      case 'SUBJECT_EXPERT':
        return SUBJECT_EXPERT_CONFIG.initialPrompt;
      case 'LEARNING_COACH':
        return LEARNING_COACH_CONFIG.initialPrompt;
      default:
        return "You are an educational AI assistant helping with learning and teaching.";
    }
  }, [role, initialPrompt]);

  // Initialize the API and create a chat session
  const initialize = useCallback(async () => {
    try {
      setLocalLoading(true);
      if (!sensay.isInitialized) {
        await sensay.initializeApi();
      }

      // Create a new chat session with the appropriate replica
      const targetReplicaId = getReplicaId();
      const customPrompt = getInitialPrompt();
      
      const session = await sensay.createChatSession(targetReplicaId, customPrompt);
      setMessages(session.messages);
      setIsReady(true);
      return session;
    } catch (error) {
      console.error('Failed to initialize Sensay education session:', error);
      throw error;
    } finally {
      setLocalLoading(false);
    }
  }, [sensay, getReplicaId, getInitialPrompt]);

  // Send a message to the AI
  const sendMessage = useCallback(async (content: string) => {
    try {
      setLocalLoading(true);
      if (!isReady) {
        await initialize();
      }

      const response = await sensay.sendMessage(content);
      if (response) {
        setMessages(current => [
          ...current, 
          { role: 'user', content, timestamp: new Date() },
          response
        ]);
        return response;
      }
      return null;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    } finally {
      setLocalLoading(false);
    }
  }, [sensay, isReady, initialize]);

  // Auto-initialize on component mount if specified
  useEffect(() => {
    if (autoInitialize && !isReady && !sensay.isLoading && !localLoading) {
      initialize().catch(console.error);
    }
  }, [autoInitialize, isReady, sensay.isLoading, localLoading, initialize]);

  return {
    messages,
    sendMessage,
    initialize,
    isReady,
    isLoading: sensay.isLoading || localLoading,
    setIsLoading: setLocalLoading,
    error: sensay.error,
  };
}