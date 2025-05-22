'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/sensay/api';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex mb-4 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          message.role === 'assistant'
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-primary text-primary-foreground'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.timestamp && (
          <div className="text-xs mt-1 opacity-70">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  placeholder = 'Type your message...'
}) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

interface ChatHistoryProps {
  messages: Message[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-2 p-4 h-[400px] overflow-y-auto">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  title?: string;
  subtitle?: string;
  inputPlaceholder?: string;
  emptyStateMessage?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  title = 'Chat',
  subtitle,
  inputPlaceholder = 'Type your message...',
  emptyStateMessage = 'Start a conversation by typing a message below.'
}) => {
  return (
    <div className="flex flex-col h-full rounded-lg border border-border overflow-hidden">
      <div className="bg-card p-4 border-b border-border">
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="flex-1 overflow-hidden">
        {messages.length > 0 ? (
          <ChatHistory messages={messages} />
        ) : (
          <div className="flex items-center justify-center h-full p-4">
            <p className="text-muted-foreground text-center">{emptyStateMessage}</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border">
        <ChatInput
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          placeholder={inputPlaceholder}
        />
      </div>
    </div>
  );
};