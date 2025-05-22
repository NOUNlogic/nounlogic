# NounLogic LMS

A robust, scalable Learning Management System built with Next.js and Appwrite.

## Features

- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Authentication**: Secure user authentication with email/password and social logins
- **Course Management**: Create, manage, and enroll in courses
- **User Dashboard**: Track progress and manage learning
- **Institution Support**: Multi-tenancy support for different educational institutions
- **AI Integration**: AI-powered content recommendations 
- **Web3 Features**: Blockchain-verified certificates and credentials (optional)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend/BaaS**: Appwrite
- **Authentication**: Appwrite Auth
- **Database**: Appwrite Databases
- **Storage**: Appwrite Storage
- **Web3** (optional): Ethereum/Polygon integration

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Appwrite instance (cloud or self-hosted)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nounlogic.git
   cd nounlogic
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Copy the environment variables file:
   ```bash
   cp env.sample .env.local
   ```

4. Update the `.env.local` file with your Appwrite credentials and other configuration.

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Appwrite Setup

### 1. Create a Project

1. Sign up or log in to [Appwrite Console](https://cloud.appwrite.io/)
2. Create a new project
3. Copy the Project ID to your `.env.local` file

### 2. Create Databases and Collections

Follow the database schema in the [database.md](/docx/database.md) file to set up all required databases and collections in Appwrite.

### 3. Configure Authentication

1. In the Appwrite Console, go to Auth > Settings
2. Enable Email/Password authentication method
3. Optionally, set up OAuth providers (Google, GitHub, etc.)

### 4. Set up Storage

1. Create the required storage buckets:
   - `avatars`: For user profile images
   - `course_media`: For course-related media files
   - `certificates`: For certificate templates and files

## Web3 Integration (Optional)

To enable Web3 features like blockchain certificates:

1. Set `NEXT_PUBLIC_ENABLE_WEB3=true` in your `.env.local` file
2. Configure the blockchain network and RPC URL
3. Deploy the certificate smart contracts (provided in `/contracts` directory)

## AI Features (Optional)

To enable AI-powered content recommendations:

1. Set `NEXT_PUBLIC_ENABLE_AI_FEATURES=true` in your `.env.local` file
2. Configure the AI service endpoints if needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
