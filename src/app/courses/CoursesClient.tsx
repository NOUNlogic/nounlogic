'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const CoursesClient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock course data
  const courses = [
    {
      id: '1',
      courseId: '1',
      title: 'Introduction to Web3',
      description: 'Learn the fundamentals of blockchain, cryptocurrencies, and decentralized applications.',
      instructor: 'Jane Doe',
      institution: 'Blockchain Academy',
      enrolled: 342,
      rating: 4.8,
      duration: '8 weeks',
      level: 'Beginner',
      category: 'web3',
      image: 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=Web3',
      hasNFT: true,
    },
    {
      id: '2',
      courseId: '2',
      title: 'Machine Learning Fundamentals',
      description: 'Explore the core concepts of machine learning and artificial intelligence.',
      instructor: 'John Smith',
      institution: 'AI Institute',
      enrolled: 521,
      rating: 4.6,
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'ai',
      image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=ML',
      hasNFT: false,
    },
    {
      id: '3',
      courseId: '3',
      title: 'Data Structures & Algorithms',
      description: 'Master the essential data structures and algorithms for efficient programming.',
      instructor: 'Alice Johnson',
      institution: 'Tech University',
      enrolled: 789,
      rating: 4.9,
      duration: '12 weeks',
      level: 'Advanced',
      category: 'programming',
      image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=DSA',
      hasNFT: true,
    },
    {
      id: '4',
      courseId: '4',
      title: 'Full Stack Web Development',
      description: 'Build modern web applications using the latest technologies and frameworks.',
      instructor: 'Bob Wilson',
      institution: 'Code Academy',
      enrolled: 632,
      rating: 4.7,
      duration: '16 weeks',
      level: 'Intermediate',
      category: 'programming',
      image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Web+Dev',
      hasNFT: false,
    },
    {
      id: '5',
      courseId: '5',
      title: 'Cryptocurrency Trading',
      description: 'Learn strategies for trading digital assets and managing crypto portfolios.',
      instructor: 'Sarah Miller',
      institution: 'Crypto Institute',
      enrolled: 287,
      rating: 4.5,
      duration: '6 weeks',
      level: 'Beginner',
      category: 'web3',
      image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Crypto',
      hasNFT: true,
    },
    {
      id: '6',
      courseId: '6',
      title: 'Deep Learning Specialization',
      description: 'Advanced neural networks, computer vision, and natural language processing.',
      instructor: 'Michael Chen',
      institution: 'AI Institute',
      enrolled: 412,
      rating: 4.9,
      duration: '14 weeks',
      level: 'Advanced',
      category: 'ai',
      image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Deep+Learning',
      hasNFT: false,
    },
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'web3', name: 'Web3 & Blockchain' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'programming', name: 'Programming' },
  ];

  // Filter courses based on search term and selected category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Browse and discover learning opportunities</p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search courses, instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.courseId} className="overflow-hidden flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {course.hasNFT && (
                  <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    NFT Certificate
                  </div>
                )}
              </div>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 mt-2">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
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
                    <span className="ml-1 text-sm">{course.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {course.description}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <span className="mr-1">👨‍🏫</span> {course.instructor}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">🏢</span> {course.institution}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">⏱️</span> {course.duration}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">📊</span> {course.level}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{course.enrolled} enrolled</span>
                  <Button>View Course</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CoursesClient;