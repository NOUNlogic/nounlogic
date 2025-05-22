// Educational AI Replica Configurations

export const TEACHING_ASSISTANT_CONFIG = {
  replicaId: 'teacher-assistant', // Replace with actual replica ID
  name: 'Teaching Assistant',
  description: 'Helps with educational concepts and coursework',
  initialPrompt: `You are an AI teaching assistant helping students with their learning journey. 
Your goal is to provide helpful, educational responses that aid understanding.
Focus on blockchain, Web3, and cryptocurrency concepts, as this is the primary subject area.
When students ask questions:
1. Help them understand concepts, don't just give answers
2. Provide examples and analogies when helpful
3. Break down complex topics into manageable parts
4. Encourage critical thinking and problem-solving
5. Be supportive and encouraging

If you don't know something, be honest about it rather than making up information.
Remember that your purpose is to enhance the educational experience within the NounLogic Learning Management System.`
};

export const SUBJECT_EXPERT_CONFIG = {
  replicaId: 'subject-expert', // Replace with actual replica ID
  name: 'Subject Expert',
  description: 'Provides in-depth knowledge on specific topics',
  initialPrompt: `You are an expert in blockchain and Web3 technologies, providing in-depth knowledge and insights.
Your expertise covers:
- Blockchain fundamentals and architecture
- Smart contract development
- Cryptocurrency economics
- Decentralized applications (dApps)
- NFTs and digital assets
- Web3 infrastructure and protocols
- DeFi (Decentralized Finance)
- DAOs (Decentralized Autonomous Organizations)

Focus on accuracy and clarity in your explanations, using analogies and examples when helpful.
Provide technically precise information while making it accessible to learners.
Cite specific examples, standards, or protocols when relevant.
If there are multiple perspectives or approaches on a topic, present them fairly.

You're part of the NounLogic Learning Management System, helping students gain mastery of Web3 concepts.`
};

export const LEARNING_COACH_CONFIG = {
  replicaId: 'learning-coach', // Replace with actual replica ID
  name: 'Learning Coach',
  description: 'Assists with study strategies and learning methods',
  initialPrompt: `You are a learning coach helping students develop effective study strategies and learning habits.
Your role is to provide guidance on how to approach learning blockchain and Web3 concepts effectively.
Focus on:
1. Effective study techniques and methods
2. Learning resource recommendations
3. Goal setting and learning path planning
4. Overcoming learning challenges
5. Maintaining motivation and consistency
6. Time management for learning
7. Knowledge retention strategies
8. Practical application of concepts

Provide personalized advice based on the student's needs and learning style.
Ask clarifying questions to better understand their situation when needed.
Be encouraging and supportive, acknowledging that learning complex technical topics can be challenging.

You're part of the NounLogic Learning Management System, helping students optimize their learning journey.`
};

// Topic configurations for guided learning experiences
export const TOPIC_CONFIGS = {
  'blockchain': {
    name: 'Blockchain Fundamentals',
    prompt: `I'd like to learn about blockchain fundamentals. Please explain the core concepts, how blockchain works, and why it's important.`,
    description: 'Core blockchain concepts and technology'
  },
  'web3': {
    name: 'Web3 Development',
    prompt: `I want to understand Web3 development. What are the key components, tools, and skills needed for Web3 development?`,
    description: 'Building applications for the decentralized web'
  },
  'defi': {
    name: 'DeFi Basics',
    prompt: `Please explain DeFi (Decentralized Finance) basics to me. What are the key concepts and applications?`,
    description: 'Decentralized financial systems and applications'
  },
  'smart-contracts': {
    name: 'Smart Contracts',
    prompt: `I need help understanding smart contracts. What are they, how do they work, and what are best practices for developing them?`,
    description: 'Self-executing contracts with code'
  },
  'nfts': {
    name: 'NFTs & Digital Assets',
    prompt: `What are NFTs and how do they work? I'd like to understand their applications and the technology behind them.`,
    description: 'Non-fungible tokens and digital ownership'
  },
  'crypto-economics': {
    name: 'Crypto Economics',
    prompt: `Can you explain crypto economics principles? I want to understand tokenomics, incentive mechanisms, and economic models in crypto.`,
    description: 'Economic principles in cryptocurrency systems'
  },
  'dao': {
    name: 'DAOs',
    prompt: `What are DAOs and how do they function? I'd like to understand their governance, structure, and applications.`,
    description: 'Decentralized autonomous organizations'
  },
  'security': {
    name: 'Blockchain Security',
    prompt: `I want to learn about blockchain security best practices. What are common vulnerabilities and how can they be prevented?`,
    description: 'Security considerations for blockchain systems'
  }
};

// Sensay API Configuration
export const getSensayConfig = () => {
  const apiKey = process.env.NEXT_PUBLIC_SENSAY_API_KEY;
  const apiVersion = process.env.NEXT_PUBLIC_SENSAY_API_VERSION || '2025-03-25';
  
  if (!apiKey || apiKey === 'your-sensay-api-key') {
    console.warn('Sensay API key not configured. Please set NEXT_PUBLIC_SENSAY_API_KEY in your environment variables.');
    return null;
  }

  return {
    BASE: 'https://api.sensay.io',
    VERSION: apiVersion,
    TOKEN: apiKey,
    HEADERS: {
      'X-ORGANIZATION-SECRET': apiKey,
      'X-USER-ID': apiKey,
      'X-API-Version': apiVersion,
      'Content-Type': 'application/json'
    },
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'omit'
  };
};

// Initialize Sensay API client
export const createSensayClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_SENSAY_API_KEY;
  const apiVersion = process.env.NEXT_PUBLIC_SENSAY_API_VERSION || '2025-03-25';
  
  if (!apiKey || apiKey === 'your-sensay-api-key') {
    console.warn('Sensay API key not configured. Please set NEXT_PUBLIC_SENSAY_API_KEY in your environment variables.');
    return null;
  }

  try {
    // Import SensayAPI from the new api.ts file
    const { SensayAPI } = require('./api');
    return new SensayAPI({
      apiKey,
      baseURL: 'https://api.sensay.io',
      version: apiVersion
    });
  } catch (error) {
    console.error('Failed to initialize Sensay API:', error);
    return null;
  }
};