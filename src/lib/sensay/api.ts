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
      const response = await this.client.get('/replicas');
      return response.data;
    } catch (error) {
      console.error('Error listing replicas:', error);
      throw error;
    }
  }

  async createChatSession(replicaConfig: ReplicaConfig): Promise<ChatSession> {
    try {
      const response = await this.client.post('/chat/sessions', {
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
      const response = await this.client.post(`/chat/sessions/${sessionId}/messages`, {
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