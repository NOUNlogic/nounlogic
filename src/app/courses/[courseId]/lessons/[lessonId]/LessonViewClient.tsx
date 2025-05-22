'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';

interface LessonViewClientProps {
  courseId: string;
  lessonId: string;
}

const LessonViewClient: React.FC<LessonViewClientProps> = ({ courseId, lessonId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock course data
  const course = {
    id: courseId,
    title: 'Introduction to Web3',
    modules: [
      {
        id: 'module1',
        title: 'Introduction to Blockchain',
        lessons: [
          { id: 'lesson1_1', title: 'What is Blockchain?', duration: '45 min', completed: true },
          { id: 'lesson1_2', title: 'Distributed Ledger Technology', duration: '50 min', completed: true },
          { id: 'lesson1_3', title: 'Consensus Mechanisms', duration: '60 min', completed: false },
          { id: 'lesson1_4', title: 'Blockchain Networks Overview', duration: '55 min', completed: false },
        ]
      },
      {
        id: 'module2',
        title: 'Cryptocurrencies and Wallets',
        lessons: [
          { id: 'lesson2_1', title: 'Introduction to Cryptocurrencies', duration: '40 min', completed: false },
          { id: 'lesson2_2', title: 'Setting Up a Wallet', duration: '35 min', completed: false },
          { id: 'lesson2_3', title: 'Transactions and Gas Fees', duration: '50 min', completed: false },
          { id: 'lesson2_4', title: 'Security Best Practices', duration: '45 min', completed: false },
        ]
      },
      {
        id: 'module3',
        title: 'Smart Contracts',
        lessons: [
          { id: 'lesson3_1', title: 'What are Smart Contracts?', duration: '40 min', completed: false },
          { id: 'lesson3_2', title: 'Solidity Basics', duration: '65 min', completed: false },
          { id: 'lesson3_3', title: 'Writing Your First Smart Contract', duration: '70 min', completed: false },
          { id: 'lesson3_4', title: 'Testing and Deployment', duration: '55 min', completed: false },
        ]
      },
    ]
  };
  
  // Find current lesson
  let currentLesson: any = null;
  let nextLesson: any = null;
  let prevLesson: any = null;
  let currentModuleIndex = 0;
  let currentLessonIndex = 0;
  
  // Find current lesson, next lesson, and previous lesson
  course.modules.forEach((module, moduleIndex) => {
    module.lessons.forEach((lesson, lessonIndex) => {
      if (lesson.id === lessonId) {
        currentLesson = lesson;
        currentModuleIndex = moduleIndex;
        currentLessonIndex = lessonIndex;
        
        // Find previous lesson
        if (lessonIndex > 0) {
          prevLesson = module.lessons[lessonIndex - 1];
        } else if (moduleIndex > 0) {
          const prevModule = course.modules[moduleIndex - 1];
          prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
        }
        
        // Find next lesson
        if (lessonIndex < module.lessons.length - 1) {
          nextLesson = module.lessons[lessonIndex + 1];
        } else if (moduleIndex < course.modules.length - 1) {
          nextLesson = course.modules[moduleIndex + 1].lessons[0];
        }
      }
    });
  });
  
  // Mock lesson content based on lessonId
  const lessonContent = {
    title: currentLesson?.title || 'Lesson not found',
    content: `
      <h1>What is Blockchain?</h1>
      <p>A blockchain is a distributed database or ledger that is shared among the nodes of a computer network. As a database, a blockchain stores information electronically in digital format. Blockchains are best known for their crucial role in cryptocurrency systems, such as Bitcoin, for maintaining a secure and decentralized record of transactions. The innovation with a blockchain is that it guarantees the fidelity and security of a record of data and generates trust without the need for a trusted third party.</p>
      
      <h2>Key Characteristics of Blockchain</h2>
      <ul>
        <li><strong>Decentralization:</strong> No single entity has control over the network.</li>
        <li><strong>Transparency:</strong> All transactions are visible to anyone with access to the network.</li>
        <li><strong>Immutability:</strong> Once data is recorded, it cannot be altered or deleted.</li>
        <li><strong>Security:</strong> Cryptographic principles ensure data integrity and security.</li>
      </ul>
      
      <h2>How Blockchain Works</h2>
      <p>At its core, blockchain is a chain of blocks that contains information. Each block contains data, the hash of the block, and the hash of the previous block. The data stored inside a block depends on the type of blockchain. For example, Bitcoin blockchain stores transaction details such as the sender, receiver, and number of coins.</p>
      
      <p>A hash is like a fingerprint (a long string of characters). Each block has its own unique hash, and if something changes inside the block, the hash changes as well. The hash of the previous block creates the chain of blocks and is the key reason why blockchains are so secure.</p>
      
      <h2>Types of Blockchain Networks</h2>
      <ol>
        <li><strong>Public Blockchain:</strong> Anyone can join and participate in the network. Examples include Bitcoin and Ethereum.</li>
        <li><strong>Private Blockchain:</strong> Participants need permission to join. These are typically used within organizations.</li>
        <li><strong>Consortium Blockchain:</strong> Partially decentralized, where multiple organizations manage the network.</li>
        <li><strong>Hybrid Blockchain:</strong> Combines elements of both public and private blockchains.</li>
      </ol>
      
      <h2>Applications Beyond Cryptocurrency</h2>
      <p>While blockchain is most famous for powering cryptocurrencies, its potential applications extend far beyond:</p>
      <ul>
        <li>Supply chain management</li>
        <li>Digital identity verification</li>
        <li>Smart contracts</li>
        <li>Voting systems</li>
        <li>Healthcare data management</li>
        <li>Intellectual property protection</li>
      </ul>
    `,
    resources: [
      { name: 'Blockchain Basics PDF', type: 'pdf', url: '#' },
      { name: 'Understanding Blockchain Video', type: 'video', url: '#' },
      { name: 'Blockchain Terminology Glossary', type: 'doc', url: '#' },
    ],
    quiz: {
      questions: [
        {
          id: 'q1',
          text: 'What is the primary innovation of blockchain technology?',
          options: [
            'Fast transaction processing',
            'Secure and decentralized record-keeping without a trusted third party',
            'Free cryptocurrency distribution',
            'Centralized database management'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          text: 'Which of the following is NOT a characteristic of blockchain?',
          options: [
            'Decentralization',
            'Transparency',
            'Mutability',
            'Security through cryptography'
          ],
          correctAnswer: 2
        },
        {
          id: 'q3',
          text: 'What creates the "chain" in blockchain?',
          options: [
            'Physical connections between computers',
            'Sequential transaction IDs',
            'Each block containing the hash of the previous block',
            'Central server connections'
          ],
          correctAnswer: 2
        }
      ]
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Course sidebar/navigation */}
        <div className={`bg-card border-r border-border overflow-y-auto transition-all ${
          sidebarOpen ? 'w-80' : 'w-0'
        }`}>
          <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
            <h2 className="font-semibold truncate">{course.title}</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-secondary"
            >
              ←
            </button>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-xs text-muted-foreground">25%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div className="space-y-4">
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="space-y-2">
                  <div className="font-medium">
                    Module {moduleIndex + 1}: {module.title}
                  </div>
                  <ul className="space-y-1">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <Link
                          href={`/courses/${courseId}/lessons/${lesson.id}`}
                          className={`flex items-center px-3 py-2 rounded-md text-sm ${
                            lesson.id === lessonId
                              ? 'bg-primary text-primary-foreground'
                              : lesson.completed
                              ? 'text-muted-foreground hover:bg-secondary'
                              : 'hover:bg-secondary'
                          }`}
                        >
                          <span className="mr-2">
                            {lesson.completed ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                              </svg>
                            )}
                          </span>
                          <span className="truncate">{lesson.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lesson content */}
        <div className="flex-1 overflow-y-auto">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed top-24 left-6 p-2 rounded-md bg-card border border-border shadow-sm hover:bg-secondary z-10"
            >
              →
            </button>
          )}
          
          <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <Link
                    href={`/courses/${courseId}`}
                    className="text-sm text-primary hover:underline mb-2 inline-block"
                  >
                    ← Back to Course
                  </Link>
                  <h1 className="text-2xl font-bold">{lessonContent.title}</h1>
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentModuleIndex + 1}.{currentLessonIndex + 1} {' • '} {currentLesson?.duration}
                </div>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary">
                  <div dangerouslySetInnerHTML={{ __html: lessonContent.content }} />
                </div>
              </CardContent>
            </Card>
            
            {/* Resources */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lessonContent.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        {resource.type === 'pdf' && (
                          <span className="text-danger">📄</span>
                        )}
                        {resource.type === 'video' && (
                          <span className="text-primary">🎬</span>
                        )}
                        {resource.type === 'doc' && (
                          <span className="text-info">📑</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{resource.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {resource.type} Document
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quiz */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Knowledge Check</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {lessonContent.quiz.questions.map((question, qIndex) => (
                      <div key={question.id} className="space-y-3">
                        <h3 className="font-medium">
                          Question {qIndex + 1}: {question.text}
                        </h3>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-start">
                              <input
                                type="radio"
                                id={`q${question.id}_o${oIndex}`}
                                name={`question_${question.id}`}
                                className="mt-1 mr-2"
                              />
                              <label htmlFor={`q${question.id}_o${oIndex}`}>
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button className="mt-4">
                      Check Answers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Navigation */}
            <div className="mt-8 border-t border-border pt-6 flex justify-between">
              {prevLesson ? (
                <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`}>
                  <Button variant="outline">
                    ← Previous: {prevLesson.title}
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextLesson ? (
                <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                  <Button>
                    Next: {nextLesson.title} →
                  </Button>
                </Link>
              ) : (
                <Link href={`/courses/${courseId}`}>
                  <Button>
                    Complete Course
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LessonViewClient;