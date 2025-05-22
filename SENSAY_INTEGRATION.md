# NounLogic + Sensay Hackathon Submission

This project integrates Sensay's Wisdom Engine with NounLogic Learning Management System to create an AI-powered educational experience.

## Project Overview

NounLogic is a modern, feature-rich Learning Management System that has been enhanced with Sensay's AI technology to provide personalized learning experiences for students. The integration focuses on creating an AI Teaching Assistant that helps answer student questions, provides personalized explanations, and guides learners through difficult concepts.

## Sensay Integration Features

- **AI Teaching Assistant**: Provides personalized help and guidance to students
- **Subject Expert Mode**: Offers in-depth knowledge on specific educational topics
- **Learning Coach**: Assists with study strategies and learning methods
- **Topic-Specific Learning**: Pre-configured topics for guided learning experiences
- **Conversational Interface**: Natural dialogue with the AI to enhance learning

## How It Works

The application uses Sensay's API to:

1. Create customized AI replicas for different educational roles (teaching assistant, subject expert, learning coach)
2. Maintain conversational context for personalized learning experiences
3. Provide topic-specific expertise in blockchain, Web3, and related technologies
4. Enhance the existing LMS with AI-powered learning assistance

## Technical Implementation

- React components for AI chat interface
- Context-based state management for Sensay API integration
- Custom hooks for educational use cases
- Integration with the existing NounLogic LMS architecture
- Responsive design that works across all device sizes

## Hackathon Requirements Met

### Educational Use Case
The integration addresses the need for personalized education by providing AI assistants that can adapt to different learning styles and needs. The AI can help explain complex concepts, answer questions, and provide alternative explanations when students are struggling.

### Milestones for Development

**Milestone 1: Core Integration**
- ✅ Sensay API integration with NounLogic LMS
- ✅ Basic chat interface for student-AI interaction
- ✅ Different AI roles (Teaching Assistant, Subject Expert, Learning Coach)

**Milestone 2: Enhanced Educational Features**
- ✅ Topic-specific learning paths for guided education
- ✅ Contextual awareness for personalized learning experiences
- ✅ Integration with existing course content
- ✅ Responsive design for all devices

### Impact on Education

This integration transforms how students learn by:

1. Providing 24/7 access to AI assistants that can help with coursework
2. Offering personalized explanations tailored to individual learning styles
3. Scaling expert knowledge to more students without additional instructor time
4. Creating more engaging and interactive learning experiences

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file based on `env.sample`
4. Add your Sensay API key to the `.env.local` file
5. Run the development server: `npm run dev`
6. Navigate to the AI page to interact with the Sensay-powered assistants

## Tech Stack

- Next.js
- TypeScript
- Sensay API
- Tailwind CSS
- Context API for state management

## Future Enhancements

- Integration with course-specific content and curriculum
- Analytics on student questions to improve course materials
- Multi-language support for global education
- Voice interaction for accessibility
- Integration with assessment and quiz features

## Demo

[Live app uri](https://nounlogic.top/)