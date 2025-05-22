'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSensay } from './context';
import { Message } from './api';

// Default educational replicas by role
const EDUCATION_REPLICAS = {
  TEACHING_ASSISTANT: 'teacher-assistant', // Replace with actual replica ID
  SUBJECT_EXPERT: 'subject-expert',        // Replace with actual replica ID
  LEARNING_COACH: 'learning-coach',        // Replace with actual replica ID
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

  // Get the appropriate replica ID based on role or use the provided one
  const getReplicaId = useCallback(() => {
    if (replicaId) return replicaId;
    return EDUCATION_REPLICAS[role];
  }, [replicaId, role]);

  // Initialize the API and create a chat session
  const initialize = useCallback(async () => {
    try {
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
    }
  }, [sensay, getReplicaId]);

  // Get the appropriate initial prompt based on the role
  const getInitialPrompt = useCallback(() => {
    if (initialPrompt) return initialPrompt;

    switch (role) {
      case 'TEACHING_ASSISTANT':
        return "You are an AI teaching assistant helping students with their questions. Your goal is to provide helpful, educational responses that aid understanding. Avoid giving direct answers to homework problems - instead guide students through the learning process.";
      case 'SUBJECT_EXPERT':
        return "You are an expert in your field, providing in-depth knowledge and insights. Focus on accuracy and clarity in your explanations, using analogies and examples when helpful.";
      case 'LEARNING_COACH':
        return "You are a learning coach helping students develop effective study strategies and learning habits. Provide personalized advice based on the student's needs and learning style.";
      default:
        return "You are an educational AI assistant helping with learning and teaching.";
    }
  }, [role, initialPrompt]);

  // Send a message to the AI
  const sendMessage = useCallback(async (content: string) => {
    try {
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
    }
  }, [sensay, isReady, initialize]);

  // Auto-initialize on component mount if specified
  useEffect(() => {
    if (autoInitialize && !isReady && !sensay.isLoading) {
      initialize().catch(console.error);
    }
  }, [autoInitialize, isReady, sensay.isLoading, initialize]);

  return {
    messages,
    sendMessage,
    initialize,
    isReady,
    isLoading: sensay.isLoading,
    error: sensay.error,
  };
}