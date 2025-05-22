'use client';

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { SensayAPI, ChatSession, Message } from './api';

interface SensayContextType {
  isInitialized: boolean;
  replicas: any[];
  activeChatSession: ChatSession | null;
  chatHistory: Record<string, ChatSession>;
  isLoading: boolean;
  error: string | null;
  initializeApi: () => Promise<void>;
  createChatSession: (replicaId: string, initialMessage?: string) => Promise<ChatSession>;
  sendMessage: (message: string) => Promise<Message | null>;
  clearActiveChatSession: () => void;
}

const SensayContext = createContext<SensayContextType | undefined>(undefined);

export const useSensay = () => {
  const context = useContext(SensayContext);
  if (context === undefined) {
    throw new Error('useSensay must be used within a SensayProvider');
  }
  return context;
};

interface SensayProviderProps {
  children: ReactNode;
}

export const SensayProvider = ({ children }: SensayProviderProps) => {
  const [api, setApi] = useState<SensayAPI | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [replicas, setReplicas] = useState<any[]>([]);
  const [activeChatSession, setActiveChatSession] = useState<ChatSession | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, ChatSession>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Sensay API client (no API version unless required)
  const initializeApi = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const apiKey = process.env.NEXT_PUBLIC_SENSAY_API_KEY;
      if (!apiKey) throw new Error('Sensay API key is not configured');
      const sensayApi = new SensayAPI({ apiKey });
      setApi(sensayApi);
      // Fetch available replicas
      const replicasData = await sensayApi.listReplicas();
      setReplicas(replicasData.replicas || []);
      setIsInitialized(true);
    } catch (err) {
      console.error('Failed to initialize Sensay API:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize Sensay API');
    } finally {
      setIsLoading(false);
    }
  };

  // Create a chat session for a given replica
  const createChatSession = async (replicaId: string, initialMessage?: string): Promise<ChatSession> => {
    if (!api) throw new Error('Sensay API not initialized');
    setIsLoading(true);
    setError(null);
    try {
      const session = await api.createChatSession({ id: replicaId, initialMessage });
      setActiveChatSession(session);
      setChatHistory(prev => ({ ...prev, [session.id]: session }));
      return session;
    } catch (err) {
      console.error('Failed to create chat session:', err);
      setError(err instanceof Error ? err.message : 'Failed to create chat session');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Send a message in the current chat session
  const sendMessage = async (message: string): Promise<Message | null> => {
    if (!api || !activeChatSession) throw new Error('No active chat session');
    setIsLoading(true);
    setError(null);
    try {
      // Add user message to the session
      const userMessage: Message = { role: 'user', content: message, timestamp: new Date() };
      setActiveChatSession(prev => prev ? { ...prev, messages: [...prev.messages, userMessage] } : null);
      // Send message to API
      const response = await api.sendMessage(activeChatSession.id, message);
      setActiveChatSession(prev => prev ? { ...prev, messages: [...prev.messages, response] } : null);
      setChatHistory(prev => {
        if (!activeChatSession) return prev;
        const updatedSession = { ...activeChatSession, messages: [...activeChatSession.messages, userMessage, response] };
        return { ...prev, [activeChatSession.id]: updatedSession };
      });
      return response;
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearActiveChatSession = () => setActiveChatSession(null);

  const value = {
    isInitialized,
    replicas,
    activeChatSession,
    chatHistory,
    isLoading,
    error,
    initializeApi,
    createChatSession,
    sendMessage,
    clearActiveChatSession
  };

  return (
    <SensayContext.Provider value={value}>
      {children}
    </SensayContext.Provider>
  );
};