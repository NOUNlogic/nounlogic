# NounLogic Learning Management System

A modern, feature-rich Learning Management System with Web3 integration.

## Features

- **Modular UI Components**: Clean separation between client and page components
- **Responsive Design**: Works seamlessly across all device sizes
- **Web3 Integration**: Blockchain certificates and wallet connectivity
- **Course Management**: Create, manage, and enroll in courses
- **Institutions**: Connect with educational institutions
- **Rich Content**: Support for various content types in lessons

## Tech Stack

- **Next.js**: React framework with server components
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Web3 Integration**: Ethereum wallet connectivity

## Project Structure

```
src/
├── app/                   # Next.js app router pages
│   ├── courses/           # Course-related pages
│   ├── dashboard/         # Dashboard page
│   ├── institutions/      # Institutions pages
│   ├── login/             # Authentication pages
│   ├── profile/           # User profile pages
│   ├── web3/              # Web3 integration pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Root page
│   └── providers.tsx      # Context providers
│
├── components/            # Reusable UI components
│   ├── layout/            # Layout components
│   │   ├── Layout.tsx     # Base layout
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
