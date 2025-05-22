'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Star, 
  User, 
  Clock, 
  Award, 
  BookOpen, 
  Building, 
  Filter, 
  ChevronDown,
  Tag,
  TrendingUp,
  Users,
  Bookmark,
  Check,
  ChevronRight
} from 'lucide-react';

const CoursesClient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<string[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    // Simulate loading bookmarked courses from local storage or user data
    setBookmarkedCourses(['1', '5']);
  }, []);

  const toggleBookmark = (courseId: string) => {
    if (bookmarkedCourses.includes(courseId)) {
      setBookmarkedCourses(prev => prev.filter(id => id !== courseId));
    } else {
      setBookmarkedCourses(prev => [...prev, courseId]);
    }
  };

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
      popular: 98,
      tags: ['Blockchain', 'Crypto', 'DeFi']
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
      popular: 85,
      tags: ['AI', 'Data Science', 'Python']
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
      popular: 92,
      tags: ['Algorithms', 'Data Structures', 'Coding']
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
      popular: 78,
      tags: ['JavaScript', 'React', 'Node.js']
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
      popular: 89,
      tags: ['Trading', 'Crypto', 'Investing']
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
      popular: 95,
      tags: ['Neural Networks', 'Computer Vision', 'NLP']
    },
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Courses', icon: <BookOpen size={16} /> },
    { id: 'web3', name: 'Web3 & Blockchain', icon: <TrendingUp size={16} /> },
    { id: 'ai', name: 'AI & Machine Learning', icon: <Star size={16} /> },
    { id: 'programming', name: 'Programming', icon: <Code size={16} /> },
  ];

  // Levels for filtering
  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'Beginner', name: 'Beginner' },
    { id: 'Intermediate', name: 'Intermediate' },
    { id: 'Advanced', name: 'Advanced' },
  ];

  // Sort options
  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'enrolled', name: 'Most Enrolled' },
    { id: 'newest', name: 'Newest First' },
  ];

  // Filter courses based on search term, selected category, and level
  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.popular - a.popular;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'enrolled') return b.enrolled - a.enrolled;
      // For 'newest', we'd typically use a date field, but we'll just use ID for this example
      return parseInt(b.id) - parseInt(a.id);
    });

  // Animation variants for staggered list
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // For simplicity, using a div with Code icon
  function Code({ size }: { size: number }) {
    return (
      <div style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Courses Catalog
            </h1>
            <p className="text-muted-foreground">
              Discover learning opportunities in blockchain, AI, and programming
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<Bookmark size={16} className="mr-1" />}
            >
              Saved Courses
            </Button>
            <Button 
              size="sm" 
              leftIcon={<Filter size={16} className="mr-1" />}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              Filters
            </Button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="space-y-4 bg-muted/20 rounded-lg p-4 border border-muted/30">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search courses, instructors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="text-muted-foreground" size={18} />}
              className="bg-white dark:bg-slate-800"
            />
          </div>
          
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-white dark:bg-slate-800 text-foreground hover:bg-secondary/80 border border-muted/30'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Advanced filters - conditionally rendered */}
          {isFiltersOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-muted/30">
              {/* Level filter */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <Award size={16} />
                  Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {levels.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap transition-colors ${
                        selectedLevel === level.id
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-white dark:bg-slate-800 text-muted-foreground border border-muted/30'
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort options */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <ChevronDown size={16} />
                  Sort By
                </label>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap transition-colors ${
                        sortBy === option.id
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-white dark:bg-slate-800 text-muted-foreground border border-muted/30'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results summary */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredCourses.length}</span> courses
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSortBy('popular');
            }}
          >
            Clear Filters
          </Button>
        </div>

        {/* Courses grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
        >
          {filteredCourses.map(course => (
            <motion.div key={course.courseId} variants={item}>
              <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border border-muted/30">
                <div className="relative h-48 w-full overflow-hidden group">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex gap-1 mb-2">
                        {course.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-0.5 bg-white/20 text-white text-xs rounded backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        leftIcon={<BookOpen size={16} />}
                      >
                        Preview Course
                      </Button>
                    </div>
                  </div>
                  {course.hasNFT && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-primary to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-md">
                      <Award size={12} className="mr-1" />
                      NFT Certificate
                    </div>
                  )}
                  <button 
                    className={`absolute top-2 right-2 p-2 rounded-full ${
                      bookmarkedCourses.includes(course.id) 
                        ? 'bg-primary text-white' 
                        : 'bg-white/80 text-gray-700 hover:bg-white/90'
                    } transition-colors duration-200`}
                    onClick={() => toggleBookmark(course.id)}
                  >
                    <Bookmark 
                      size={16} 
                      className={bookmarkedCourses.includes(course.id) ? 'fill-white' : ''} 
                    />
                  </button>
                </div>
                <CardContent className="flex-1 flex flex-col p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                      <Link href={`/courses/${course.courseId}`}>{course.title}</Link>
                    </h3>
                    <div className="flex items-center bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded-md">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-0.5" />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-xs">
                    <div className="flex items-center text-muted-foreground">
                      <User size={14} className="mr-1.5" /> 
                      <span className="truncate">{course.instructor}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Building size={14} className="mr-1.5" /> 
                      <span className="truncate">{course.institution}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock size={14} className="mr-1.5" /> 
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Award size={14} className="mr-1.5" /> 
                      <span>{course.level}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-muted/30">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users size={14} className="mr-1.5" />
                      <span>{course.enrolled.toLocaleString()} enrolled</span>
                    </div>
                    <Link href={`/courses/${course.courseId}`}>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="hover:bg-primary hover:text-white transition-colors"
                        rightIcon={<ChevronRight size={16} />}
                      >
                        Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-muted/10 rounded-lg border border-muted/30">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No courses found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CoursesClient;