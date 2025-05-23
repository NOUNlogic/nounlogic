import axios, { AxiosInstance } from 'axios';

interface SensayAPIConfig {
  apiKey: string;
  baseURL?: string;
  version?: string;
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
  private apiKey: string;
  private version: string;

  constructor(config: SensayAPIConfig) {
    this.apiKey = process.env.NEXT_PUBLIC_SENSAY_API_KEY_SECRET;
    this.version = config.version || '2025-03-25';
    
    this.client = axios.create({
      baseURL: config.baseURL || 'https://api.sensay.io',
      headers: {
        'X-ORGANIZATION-SECRET': this.apiKey,
        'X-USER-ID': this.apiKey,
        'X-API-Version': this.version,
        'Content-Type': 'application/json'
      }
    });
  }

  async listReplicas(): Promise<any> {
    try {
      const response = await this.client.get('/v1/replicas');
      return response.data;
    } catch (error) {
      console.error('Error listing replicas:', error);
      throw error;
    }
  }

  async chatCompletion(replicaId: string, content: string, options?: {
    skipChatHistory?: boolean;
    source?: string;
  }): Promise<any> {
    try {
      const response = await this.client.post(`/v1/replicas/${replicaId}/chat/completions`, {
        content,
        skip_chat_history: options?.skipChatHistory || false,
        source: options?.source || 'web'
      });
      return response.data;
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw error;
    }
  }

  async getChatHistory(replicaId: string, source: 'web' | 'discord' | 'embed' = 'web'): Promise<any> {
    try {
      const endpoint = source === 'web' 
        ? `/v1/replicas/${replicaId}/chat/history/web`
        : `/v1/replicas/${replicaId}/chat/history`;
      
      const response = await this.client.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error getting chat history:', error);
      throw error;
    }
  }

  async createChatHistoryEntry(replicaId: string, content: string, source: string = 'web'): Promise<any> {
    try {
      const response = await this.client.post(`/v1/replicas/${replicaId}/chat/history`, {
        content,
        source
      });
      return response.data;
    } catch (error) {
      console.error('Error creating chat history entry:', error);
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