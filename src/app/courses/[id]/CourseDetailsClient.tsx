'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';

interface CourseDetailsClientProps {
  id: string;
}

const CourseDetailsClient: React.FC<CourseDetailsClientProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeModuleId, setActiveModuleId] = useState('module1');

  // Mock course data
  const course = {
    id,
    title: 'Introduction to Web3',
    description: 'Learn the fundamentals of blockchain, cryptocurrencies, and decentralized applications.',
    longDescription: `
      This comprehensive course covers the foundations of Web3 technologies, including blockchain fundamentals, 
      smart contracts, decentralized finance (DeFi), NFTs, and the broader ecosystem of decentralized applications.
      
      You'll gain practical experience by interacting with blockchain networks, creating smart contracts, 
      and building your own decentralized applications. By the end of this course, you'll have a solid understanding 
      of how Web3 is reshaping the internet and creating new opportunities for innovation.
    `,
    instructor: 'Jane Doe',
    instructorBio: 'Blockchain specialist with 8+ years of experience in Web3 technologies. Former developer at Ethereum Foundation.',
    institution: 'Blockchain Academy',
    enrolled: 342,
    rating: 4.8,
    reviews: 87,
    duration: '8 weeks',
    level: 'Beginner',
    category: 'web3',
    image: 'https://via.placeholder.com/800x400/4f46e5/ffffff?text=Web3+Course',
    hasNFT: true,
    nftContractAddress: '0x1234...5678',
    prerequisites: ['Basic programming knowledge', 'Understanding of web technologies', 'Curiosity about blockchain'],
    whatYouWillLearn: [
      'Understand blockchain technology and its applications',
      'Create and deploy smart contracts',
      'Interact with decentralized applications',
      'Set up and manage cryptocurrency wallets',
      'Understand tokenomics and crypto economics',
      'Navigate the Web3 ecosystem safely and effectively'
    ],
    modules: [
      {
        id: 'module1',
        title: 'Introduction to Blockchain',
        description: 'Understand the fundamentals of blockchain technology.',
        lessons: [
          { id: 'lesson1_1', title: 'What is Blockchain?', duration: '45 min' },
          { id: 'lesson1_2', title: 'Distributed Ledger Technology', duration: '50 min' },
          { id: 'lesson1_3', title: 'Consensus Mechanisms', duration: '60 min' },
          { id: 'lesson1_4', title: 'Blockchain Networks Overview', duration: '55 min' },
        ]
      },
      {
        id: 'module2',
        title: 'Cryptocurrencies and Wallets',
        description: 'Explore different cryptocurrencies and how to manage them.',
        lessons: [
          { id: 'lesson2_1', title: 'Introduction to Cryptocurrencies', duration: '40 min' },
          { id: 'lesson2_2', title: 'Setting Up a Wallet', duration: '35 min' },
          { id: 'lesson2_3', title: 'Transactions and Gas Fees', duration: '50 min' },
          { id: 'lesson2_4', title: 'Security Best Practices', duration: '45 min' },
        ]
      },
      {
        id: 'module3',
        title: 'Smart Contracts',
        description: 'Learn to create and deploy smart contracts on blockchain networks.',
        lessons: [
          { id: 'lesson3_1', title: 'What are Smart Contracts?', duration: '40 min' },
          { id: 'lesson3_2', title: 'Solidity Basics', duration: '65 min' },
          { id: 'lesson3_3', title: 'Writing Your First Smart Contract', duration: '70 min' },
          { id: 'lesson3_4', title: 'Testing and Deployment', duration: '55 min' },
        ]
      },
      {
        id: 'module4',
        title: 'Decentralized Applications (dApps)',
        description: 'Build applications that interact with blockchain networks.',
        lessons: [
          { id: 'lesson4_1', title: 'dApp Architecture', duration: '50 min' },
          { id: 'lesson4_2', title: 'Frontend Integration', duration: '60 min' },
          { id: 'lesson4_3', title: 'User Authentication with Web3', duration: '45 min' },
          { id: 'lesson4_4', title: 'Building a Simple dApp', duration: '90 min' },
        ]
      },
      {
        id: 'module5',
        title: 'NFTs and Digital Assets',
        description: 'Understand non-fungible tokens and their applications.',
        lessons: [
          { id: 'lesson5_1', title: 'Introduction to NFTs', duration: '40 min' },
          { id: 'lesson5_2', title: 'Creating an NFT', duration: '55 min' },
          { id: 'lesson5_3', title: 'NFT Marketplaces', duration: '45 min' },
          { id: 'lesson5_4', title: 'NFT Use Cases Beyond Art', duration: '50 min' },
        ]
      },
      {
        id: 'module6',
        title: 'Web3 Ecosystem and Future Trends',
        description: 'Explore the broader Web3 ecosystem and emerging trends.',
        lessons: [
          { id: 'lesson6_1', title: 'DeFi Overview', duration: '55 min' },
          { id: 'lesson6_2', title: 'DAOs and Governance', duration: '50 min' },
          { id: 'lesson6_3', title: 'Layer 2 Solutions', duration: '45 min' },
          { id: 'lesson6_4', title: 'The Future of Web3', duration: '60 min' },
        ]
      },
    ],
    assessments: [
      { id: 'quiz1', title: 'Blockchain Fundamentals Quiz', type: 'quiz', questions: 15 },
      { id: 'assignment1', title: 'Smart Contract Development', type: 'assignment' },
      { id: 'project1', title: 'Build a dApp', type: 'project' },
      { id: 'finalExam', title: 'Final Examination', type: 'exam', questions: 50 },
    ]
  };

  const activeModule = course.modules.find(module => module.id === activeModuleId);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Course header */}
        <div className="relative h-64 rounded-xl overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 flex flex-col justify-end p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                {course.category.toUpperCase()}
              </span>
              <span className="bg-secondary px-2 py-1 rounded text-xs font-medium">
                {course.level}
              </span>
              {course.hasNFT && (
                <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-medium">
                  NFT Certificate
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-warning"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span className="ml-1 text-sm">{course.rating} ({course.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">👨‍🏫</span>
                <span className="text-sm">{course.instructor}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">👥</span>
                <span className="text-sm">{course.enrolled} enrolled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 pt-2 px-1 font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`pb-2 pt-2 px-1 font-medium ${
                activeTab === 'curriculum'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setActiveTab('instructor')}
              className={`pb-2 pt-2 px-1 font-medium ${
                activeTab === 'instructor'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Instructor
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`pb-2 pt-2 px-1 font-medium ${
                activeTab === 'certificate'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Certificate
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">About This Course</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{course.longDescription}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-success mr-2 mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-info mr-2 mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <Card key={module.id}>
                      <div className="p-4 cursor-pointer" onClick={() => setActiveModuleId(module.id)}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <svg
                            className={`h-5 w-5 transition-transform ${
                              activeModuleId === module.id ? 'transform rotate-180' : ''
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                      </div>
                      {activeModuleId === module.id && (
                        <CardContent className="pt-0 border-t border-border">
                          <ul className="divide-y divide-border">
                            {module.lessons.map((lesson) => (
                              <li key={lesson.id} className="py-3 flex justify-between items-center">
                                <div className="flex items-center">
                                  <svg
                                    className="h-5 w-5 text-muted-foreground mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Assessments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.assessments.map((assessment) => (
                      <Card key={assessment.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                              {assessment.type === 'quiz' && (
                                <span>📝</span>
                              )}
                              {assessment.type === 'assignment' && (
                                <span>📄</span>
                              )}
                              {assessment.type === 'project' && (
                                <span>🏗️</span>
                              )}
                              {assessment.type === 'exam' && (
                                <span>📚</span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{assessment.title}</h4>
                              <p className="text-sm text-muted-foreground capitalize">
                                {assessment.type}
                                {assessment.questions && ` • ${assessment.questions} questions`}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Meet Your Instructor</h2>
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                    {/* Instructor avatar would go here */}
                    <span className="text-2xl">👩‍🏫</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{course.instructor}</h3>
                    <p className="text-muted-foreground mt-1">{course.instructorBio}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'certificate' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Course Certificate</h2>
                
                {course.hasNFT ? (
                  <div>
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <svg
                          className="h-6 w-6 text-accent mr-3 mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <h4 className="font-medium">Blockchain Verified Certificate</h4>
                          <p className="text-sm mt-1">
                            Upon completion, you will receive an NFT certificate stored on the blockchain, 
                            providing tamper-proof verification of your achievement.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Certificate Details</h4>
                        <div className="bg-card rounded-lg border border-border p-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Contract Address</p>
                              <p className="font-mono">{course.nftContractAddress}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Blockchain</p>
                              <p>Ethereum</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Certificate Standard</p>
                              <p>ERC-721</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Metadata</p>
                              <p>IPFS Stored</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Certificate Preview</h4>
                        <div className="border border-border rounded-lg overflow-hidden">
                          <img 
                            src="https://via.placeholder.com/800x500/4f46e5/ffffff?text=Certificate+Preview" 
                            alt="Certificate Preview" 
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="bg-secondary rounded-lg p-4">
                      <div className="flex items-start">
                        <svg
                          className="h-6 w-6 text-muted-foreground mr-3 mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <h4 className="font-medium">Standard Certificate</h4>
                          <p className="text-sm mt-1">
                            Upon completion, you will receive a digital certificate that can be 
                            shared on your profile and social media.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold">Free</h3>
                      <p className="text-muted-foreground mt-1">Full access to course content</p>
                    </div>
                    
                    <Button className="w-full">Enroll Now</Button>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-success mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{course.duration} of content</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-success mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{course.modules.length} modules</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-success mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          {course.modules.reduce((total, module) => total + module.lessons.length, 0)} lessons
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-success mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{course.assessments.length} assessments</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-success mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          {course.hasNFT ? 'Blockchain Certificate' : 'Digital Certificate'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium mb-2">Share This Course</h4>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-secondary rounded-md">
                          {/* Twitter/X icon */}
                          <span>🐦</span>
                        </button>
                        <button className="p-2 bg-secondary rounded-md">
                          {/* LinkedIn icon */}
                          <span>📱</span>
                        </button>
                        <button className="p-2 bg-secondary rounded-md">
                          {/* Facebook icon */}
                          <span>👍</span>
                        </button>
                        <button className="p-2 bg-secondary rounded-md">
                          {/* Email icon */}
                          <span>✉️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetailsClient;