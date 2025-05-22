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
│   │   └── MainLayout.tsx # Main app layout with sidebar
│   │
│   └── ui/                # UI components
│       ├── Button.tsx     # Button component
│       ├── CardComponents.tsx # Card components
│       ├── Icons.tsx      # Icon components
│       └── Input.tsx      # Input component
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## UI Components

The UI is built with a component-based architecture:

- **Layouts**: Page layouts with navigation
- **UI Components**: Reusable UI elements
- **Client Components**: Interactive components with client-side logic
- **Page Components**: Server components that render pages

## Authentication

The app supports multiple authentication methods:

- Email/password authentication
- Web3 wallet authentication (MetaMask, etc.)

## Web3 Integration

- **Blockchain Certificates**: Issue and verify certificates on-chain
- **Wallet Connection**: Connect to Web3 wallets
- **Transaction History**: View blockchain transactions

## License

MIT
