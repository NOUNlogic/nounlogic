import axios, { AxiosInstance } from 'axios';

interface SensayConfig {
  apiKey: string; // Used for both X-ORGANIZATION-SECRET and X-USER-ID
  apiVersion?: string;
  baseUrl?: string;
}

interface ReplicaConfig {
  id: string; // This is the replica UUID
  initialMessage?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatSession {
  id: string; // Use replica UUID as session id
  messages: Message[];
  replicaId: string;
}

export class SensayAPI {
  private client: AxiosInstance;
  private baseUrl: string;
  private apiKey: string;
  private apiVersion: string;

  constructor(config: SensayConfig) {
    this.apiKey = config.apiKey;
    this.apiVersion = config.apiVersion || '2025-03-25';
    this.baseUrl = config.baseUrl || 'https://api.sensay.io';

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-ORGANIZATION-SECRET': this.apiKey,
        'X-USER-ID': this.apiKey,
        'X-API-Version': this.apiVersion
      }
    });
  }

  async listReplicas(): Promise<any> {
    try {
      const response = await this.client.get('/v1/replicas');
      return response.data;
    } catch (error) {
      console.error('Error listing replicas:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn('Replicas endpoint not found, returning empty list');
        return { replicas: [] };
      }
      throw error;
    }
  }

  async createChatSession(replicaConfig: ReplicaConfig): Promise<ChatSession> {
    // For Sensay, a session is just a replica UUID and a message history
    // We'll store the initial message as the first message in the session
    const messages: Message[] = [];
    if (replicaConfig.initialMessage) {
      // Send the initial message to the chat completions endpoint
      const response = await this.sendMessage(replicaConfig.id, replicaConfig.initialMessage);
      messages.push({ role: 'user', content: replicaConfig.initialMessage, timestamp: new Date() });
      if (response) messages.push(response);
    }
    return {
      id: replicaConfig.id,
      messages,
      replicaId: replicaConfig.id
    };
  }

  async sendMessage(replicaId: string, message: string): Promise<Message> {
    try {
      // POST to /v1/replicas/{replicaUUID}/chat/completions
      const response = await this.client.post(`/v1/replicas/${replicaId}/chat/completions`, {
        content: message,
        skip_chat_history: false,
        source: 'web'
      });
      return {
        role: 'assistant',
        content: response.data.content,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error sending message:', error);
      if (axios.isAxiosError(error)) {
        return {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting to the server. Please try again later.",
          timestamp: new Date()
        };
      }
      throw error;
    }
  }

  async getChatHistory(replicaId: string): Promise<Message[]> {
    try {
      // GET /v1/replicas/{replicaUUID}/chat/history
      const response = await this.client.get(`/v1/replicas/${replicaId}/chat/history`);
      // Map API response to Message[]
      return (response.data?.history || []).map((item: any) => ({
        role: item.role,
        content: item.content,
        timestamp: item.created_at ? new Date(item.created_at) : undefined
      }));
    } catch (error) {
      console.error('Error getting chat history:', error);
      return [];
    }
  }
}

// Provides mock functionality when Sensay API is unavailable
export class MockSensayAPI extends SensayAPI {
  // Override the constructor to avoid creating an actual client
  constructor() {
    super({ apiKey: 'mock-key' });
    // Override the client to prevent actual API calls
    this.client = {
      get: () => Promise.resolve({ data: {} }),
      post: () => Promise.resolve({ data: {} }),
    } as any;
  }

  async listReplicas(): Promise<any> {
    console.log('Using mock replica list');
    return {
      replicas: [
        { id: 'teacher-assistant', name: 'Teaching Assistant' },
        { id: 'subject-expert', name: 'Subject Expert' },
        { id: 'learning-coach', name: 'Learning Coach' }
      ]
    };
  }

  async createChatSession(replicaConfig: ReplicaConfig): Promise<ChatSession> {
    console.log('Creating mock chat session for replica:', replicaConfig.id);
    const initialMessage: Message = {
      role: 'assistant',
      content: 'Hello! I\'m running in demo mode because the Sensay API is unavailable. How can I help you today?',
      timestamp: new Date()
    };

    return {
      id: `mock-session-${Date.now()}`,
      replicaId: replicaConfig.id,
      messages: [initialMessage]
    };
  }

  async sendMessage(sessionId: string, message: string): Promise<Message> {
    console.log('Sending mock message in session:', sessionId);
    // Simple response generator based on message content
    let response = 'I understand you\'re asking about ';
    
    if (message.toLowerCase().includes('blockchain')) {
      response += 'blockchain technology. Blockchain is a decentralized, distributed ledger that records transactions across many computers.';
    } else if (message.toLowerCase().includes('web3')) {
      response += 'Web3. Web3 refers to a decentralized web built on blockchain technology, giving users more control over their data and digital assets.';
    } else if (message.toLowerCase().includes('nft')) {
      response += 'NFTs. Non-Fungible Tokens are unique digital assets verified using blockchain technology.';
    } else if (message.toLowerCase().includes('defi')) {
      response += 'DeFi. Decentralized Finance uses blockchain and cryptocurrency to manage financial transactions without traditional intermediaries.';
    } else {
      response = 'I\'m in demo mode since the Sensay API is unavailable. I can provide simulated responses about blockchain, Web3, NFTs, and DeFi.';
    }

    return {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };
  }
}