// Database types based on the database.md schema

// Core Database Types
export interface Role {
  $id: string;
  name: string;
  permissions: string[]; // JSON array stored as string
  $createdAt: string;
  $updatedAt: string;
}

export interface Setting {
  $id: string;
  key: string;
  value: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

// Users Database Types
export interface User {
  $id: string;
  user_id: string;
  email: string;
  profile: string; // JSON stored as string
  role_id: string;
  institution_id: string;
  wallet_address?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface UserProfile {
  $id: string;
  user_id: string;
  bio: string;
  avatar_url: string;
  preferences: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

// Courses Database Types
export interface Course {
  $id: string;
  course_id: string;
  title: string;
  description: string;
  institution_id: string;
  creator_id: string;
  metadata: string; // JSON stored as string
  nft_contract_address?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface Module {
  $id: string;
  module_id: string;
  course_id: string;
  title: string;
  order: number;
  $createdAt: string;
  $updatedAt: string;
}

export interface Lesson {
  $id: string;
  lesson_id: string;
  module_id: string;
  title: string;
  content: string; // JSON stored as string
  order: number;
  $createdAt: string;
  $updatedAt: string;
}

export interface Enrollment {
  $id: string;
  enrollment_id: string;
  user_id: string;
  course_id: string;
  status: string;
  progress: string; // JSON stored as string
  certificate_token_id?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface Assessment {
  $id: string;
  assessment_id: string;
  course_id: string;
  type: string;
  metadata: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

export interface Submission {
  $id: string;
  submission_id: string;
  assessment_id: string;
  user_id: string;
  content: string; // JSON stored as string
  grade: number;
  $createdAt: string;
  $updatedAt: string;
}

// Institutions Database Types
export interface Institution {
  $id: string;
  institution_id: string;
  name: string;
  type: string;
  metadata: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

export interface InstitutionIntegration {
  $id: string;
  integration_id: string;
  institution_id: string;
  type: string;
  config: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

// AI Database Types
export interface AIModel {
  $id: string;
  model_id: string;
  name: string;
  type: string;
  metadata: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

export interface AIRecommendation {
  $id: string;
  recommendation_id: string;
  user_id: string;
  course_id: string;
  data: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

// Analytics Database Types
export interface AnalyticsEvent {
  $id: string;
  event_id: string;
  user_id: string;
  type: string;
  timestamp: string;
  data: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

export interface Metric {
  $id: string;
  metric_id: string;
  name: string;
  value: number;
  timestamp: string;
  $createdAt: string;
  $updatedAt: string;
}

// Integrations Database Types
export interface ExternalIntegration {
  $id: string;
  integration_id: string;
  type: string;
  config: string; // JSON stored as string
  status: string;
  $createdAt: string;
  $updatedAt: string;
}

// Web3 Database Types
export interface Wallet {
  $id: string;
  wallet_address: string;
  user_id: string;
  network: string;
  metadata: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

export interface Transaction {
  $id: string;
  tx_id: string;
  wallet_address: string;
  type: string;
  amount: number;
  status: string;
  timestamp: string;
  metadata: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

export interface Certificate {
  $id: string;
  token_id: string;
  user_id: string;
  course_id: string;
  wallet_address: string;
  contract_address: string;
  issued_at: string;
  metadata: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}

export interface NFTContract {
  $id: string;
  contract_address: string;
  course_id: string;
  network: string;
  metadata: string; // JSON stored as string
  $createdAt: string;
  $updatedAt: string;
}