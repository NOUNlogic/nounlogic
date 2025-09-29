'use client';

import React, { useState, useEffect } from 'react';
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
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Handle scroll effect for header
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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
  
  // Calculate progress percentage
  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  const completedLessons = course.modules.reduce((total, module) => {
    return total + module.lessons.filter(lesson => lesson.completed).length;
  }, 0);
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  
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

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  // Check quiz answers
  const checkAnswers = () => {
    setShowResults(true);
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Mobile sidebar toggle */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed bottom-6 left-6 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all z-50 md:top-24 md:bottom-auto md:left-6 md:p-3 md:rounded-lg"
            aria-label="Open course navigation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        )}
        
        {/* Course sidebar/navigation - now with animation and mobile optimization */}
        <div 
          className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-300 md:hidden ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        <div 
          className={`fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-card shadow-xl border-r border-border overflow-y-auto transition-transform duration-300 transform md:relative md:shadow-none md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card/90 backdrop-blur-md z-10">
            <h2 className="font-bold text-lg gradient-text">{course.title}</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-secondary/80 transition-colors md:hidden"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-secondary/50 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="progress-gradient h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-5">
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="space-y-2">
                  <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground px-3 py-1">
                    Module {moduleIndex + 1}: {module.title}
                  </div>
                  <ul className="space-y-1 pl-2">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <Link
                          href={`/courses/${courseId}/lessons/${lesson.id}`}
                          className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-all group relative ${
                            lesson.id === lessonId
                              ? 'bg-primary text-primary-foreground font-medium shadow-md'
                              : lesson.completed
                              ? 'text-muted-foreground hover:bg-secondary/70'
                              : 'hover:bg-secondary/70'
                          }`}
                        >
                          <span className={`mr-3 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${
                            lesson.id === lessonId
                              ? 'bg-primary-foreground text-primary'
                              : lesson.completed
                              ? 'bg-success/20 text-success'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {lesson.completed ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-current"></span>
                            )}
                          </span>
                          <div className="flex-1 flex flex-col">
                            <span className="truncate">{lesson.title}</span>
                            <span className="text-xs opacity-70">{lesson.duration}</span>
                          </div>
                          {lesson.id === lessonId && (
                            <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse"></span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lesson content + Social sidebar */}
        <div className="flex-1 overflow-y-auto pb-20 md:pr-4">
          <div className={`sticky top-0 z-20 border-b bg-background/80 backdrop-blur-md transition-all duration-300 ${
            isScrolled ? 'shadow-sm' : ''
          }`}>
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link
                href={`/courses/${courseId}`}
                className="text-sm text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Course
              </Link>
              <div className="text-sm font-medium px-2 py-1 bg-secondary/80 rounded-full">
                {currentModuleIndex + 1}.{currentLessonIndex + 1} {' • '} {currentLesson?.duration}
              </div>
            </div>
          </div>
          
          <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">{lessonContent.title}</h1>
                <a href="/ai" className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm">Ask AI</a>
              </div>
              <div className="h-1 w-20 bg-primary rounded-full mb-6 opacity-80"></div>
            </div>
            
            <Card className="card-hover overflow-hidden border-0 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="prose max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-img:rounded-xl prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border">
                  <div dangerouslySetInnerHTML={{ __html: lessonContent.content }} />
                </div>
              </CardContent>
            </Card>
            
            {/* Resources */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Learning Resources
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessonContent.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block p-5 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 card-hover overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
                        {resource.type === 'pdf' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                        {resource.type === 'video' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                        )}
                        {resource.type === 'doc' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-info" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">{resource.name}</div>
                        <div className="text-xs text-muted-foreground capitalize flex items-center gap-1 mt-1">
                          {resource.type} Document
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quiz */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Knowledge Check
              </h2>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    {lessonContent.quiz.questions.map((question, qIndex) => (
                      <div 
                        key={question.id} 
                        className={`p-6 sm:p-8 space-y-4 transition-all duration-500 ${
                          activeQuestionIndex === qIndex ? 'opacity-100' : 'opacity-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-lg">
                            Question {qIndex + 1} of {lessonContent.quiz.questions.length}
                          </h3>
                          <div className="flex gap-1">
                            {lessonContent.quiz.questions.map((_, i) => (
                              <div 
                                key={i} 
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                  i === activeQuestionIndex 
                                    ? 'bg-primary' 
                                    : i < activeQuestionIndex 
                                    ? 'bg-success' 
                                    : 'bg-muted'
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-lg font-medium text-foreground">{question.text}</div>
                        
                        <div className="space-y-3 mt-4">
                          {question.options.map((option, oIndex) => {
                            const isSelected = selectedAnswers[question.id] === oIndex;
                            const isCorrect = showResults && question.correctAnswer === oIndex;
                            const isWrong = showResults && isSelected && !isCorrect;
                            
                            return (
                              <div 
                                key={oIndex} 
                                className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-border bg-card hover:border-muted-foreground'
                                } ${
                                  isCorrect ? 'border-success bg-success/5' : ''
                                } ${
                                  isWrong ? 'border-destructive bg-destructive/5' : ''
                                }`}
                                onClick={() => !showResults && handleAnswerSelect(question.id, oIndex)}
                              >
                                <div className={`w-5 h-5 flex-shrink-0 rounded-full mr-3 flex items-center justify-center border ${
                                  isSelected 
                                    ? 'border-primary bg-primary text-primary-foreground' 
                                    : 'border-muted-foreground'
                                } ${
                                  isCorrect ? 'border-success bg-success text-white' : ''
                                } ${
                                  isWrong ? 'border-destructive bg-destructive text-white' : ''
                                }`}>
                                  {isSelected && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                      <circle cx="10" cy="10" r="6" />
                                    </svg>
                                  )}
                                  {isCorrect && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                  {isWrong && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm sm:text-base">{option}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-6 bg-muted/20 border-t border-border flex items-center justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                        disabled={activeQuestionIndex === 0}
                        className="px-4"
                      >
                        Previous
                      </Button>
                      
                      {activeQuestionIndex < lessonContent.quiz.questions.length - 1 ? (
                        <Button 
                          onClick={() => setActiveQuestionIndex(prev => Math.min(lessonContent.quiz.questions.length - 1, prev + 1))}
                          className="px-4"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button 
                          onClick={checkAnswers}
                          disabled={showResults}
                          className="bg-primary hover:bg-primary/90 text-white px-4"
                        >
                          {showResults ? 'Completed' : 'Check Answers'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Navigation */}
            <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row gap-4 justify-between">
              {prevLesson ? (
                <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`} className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto group transition-all hover:border-primary/70 hover:bg-primary/5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">Previous: {prevLesson.title}</span>
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextLesson ? (
                <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`} className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto group transition-all btn-ripple">
                    <span className="truncate">Next: {nextLesson.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </Link>
              ) : (
                <Link href={`/courses/${courseId}`} className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-success hover:bg-success/90 text-white pulse-glow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Complete Course
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Social Sidebar */}
        <aside className="hidden md:block w-full md:w-80 lg:w-96 border-l border-border p-4 bg-background/40">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground">Classmates online</h3>
            <div className="mt-3 space-y-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20" />
                  <div className="text-sm">Student {i}</div>
                  <span className="ml-auto w-2 h-2 rounded-full bg-green-500" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-muted-foreground">Discussion</h3>
            <div className="mt-3 space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="p-3 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground mb-1">Student {i}</div>
                  <div className="text-sm">Question about this section — can someone explain consensus?</div>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <input className="flex-1 px-3 py-2 rounded-lg bg-secondary/60 outline-none" placeholder="Write a comment"/>
                <button className="px-3 py-2 rounded-lg bg-primary text-white">Post</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </MainLayout>
  );
};

export default LessonViewClient;