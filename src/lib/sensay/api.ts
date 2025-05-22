import axios, { AxiosInstance } from 'axios';

interface SensayConfig {
  apiKey: string;
  apiVersion?: string;
  baseUrl?: string;
}

interface ReplicaConfig {
  id: string;
  initialMessage?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatSession {
  id: string;
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
    this.apiVersion = config.apiVersion || '2023-06-01';
    this.baseUrl = config.baseUrl || 'https://api.sensay.io';

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-API-Version': this.apiVersion
      }
    });
  }

  async listReplicas(): Promise<any> {
    try {
      // Use v1/replicas instead of /replicas - common API versioning pattern
      const response = await this.client.get('/v1/replicas');
      return response.data;
    } catch (error) {
      console.error('Error listing replicas:', error);
      // If we get a 404, return an empty list instead of throwing
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn('Replicas endpoint not found, returning empty list');
        return { replicas: [] };
      }
      throw error;
    }
  }

  async createChatSession(replicaConfig: ReplicaConfig): Promise<ChatSession> {
    try {
      // Use v1/chat/sessions instead of /chat/sessions
      const response = await this.client.post('/v1/chat/sessions', {
        replica_id: replicaConfig.id,
        initial_message: replicaConfig.initialMessage
      });
      
      return {
        id: response.data.id,
        messages: response.data.messages || [],
        replicaId: replicaConfig.id
      };
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  }

  async sendMessage(sessionId: string, message: string): Promise<Message> {
    try {
      // Use v1/chat/sessions/... instead of /chat/sessions/...
      const response = await this.client.post(`/v1/chat/sessions/${sessionId}/messages`, {
        role: 'user',
        content: message
      });
      
      return {
        role: 'assistant',
        content: response.data.content,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error sending message:', error);
      // If we get a 404 or any other error, provide a fallback response
      if (axios.isAxiosError(error)) {
        console.warn(`API error (${error.response?.status}): ${error.message}`);
        return {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting to the server. Please try again later.",
          timestamp: new Date()
        };
      }
      throw error;
    }
  }

  async getChatSession(sessionId: string): Promise<ChatSession> {
    try {
      const response = await this.client.get(`/chat/sessions/${sessionId}`);
      
      return {
        id: response.data.id,
        messages: response.data.messages || [],
        replicaId: response.data.replica_id
      };
    } catch (error) {
      console.error('Error getting chat session:', error);
      throw error;
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