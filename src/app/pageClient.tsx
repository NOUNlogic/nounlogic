// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/app/pageClient.tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, UserCog, Building, Star, Zap, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock data for featured courses
const featuredCourses = [
  {
    id: "1",
    title: "Introduction to Blockchain",
    description: "Learn the fundamentals of blockchain technology",
    rating: 4.8,
    students: 1248,
    institution: "Blockchain Academy"
  },
  {
    id: "2",
    title: "Smart Contract Development",
    description: "Build secure and efficient smart contracts",
    rating: 4.7,
    students: 876,
    institution: "Crypto Institute"
  },
  {
    id: "3",
    title: "Web3 Integration",
    description: "Connect your applications to blockchain networks",
    rating: 4.9,
    students: 654,
    institution: "Tech University"
  }
];

// Simplified motion variants if framer-motion is not available
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Fallback component if framer-motion is not installed
const MotionDiv = motion.div || 'div';
const MotionSection = motion.section || 'section';

export default function HomeClient() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-background/90">
      {/* Hero Section */}
      <MotionSection 
        className="relative py-20 md:py-32 px-4 overflow-hidden"
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        variants={staggerContainer}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <MotionDiv variants={fadeIn}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent leading-tight">
              Welcome to NounLogic LMS
            </h1>
          </MotionDiv>
          
          <MotionDiv variants={fadeIn} className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              A global learning management system designed for modern education and training in blockchain and web3 technologies.
            </p>
          </MotionDiv>
          
          <MotionDiv variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/dashboard" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] group"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/courses" 
              className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:translate-y-[-2px]"
            >
              Browse Courses
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </MotionDiv>
          
          {/* Stats Section */}
          <MotionDiv variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">100+</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Courses</p>
            </div>
            <div className="bg-white dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all">
              <p className="text-3xl md:text-4xl font-bold text-accent mb-1">50+</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Instructors</p>
            </div>
            <div className="bg-white dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all">
              <p className="text-3xl md:text-4xl font-bold text-secondary mb-1">20k+</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Students</p>
            </div>
            <div className="bg-white dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all">
              <p className="text-3xl md:text-4xl font-bold text-purple-500 mb-1">15+</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Institutions</p>
            </div>
          </MotionDiv>
        </div>
      </MotionSection>
      
      {/* Featured Courses Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-50/50 to-white/90 dark:from-slate-900/50 dark:to-slate-800/90">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore our most popular courses in blockchain and web3 technologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div 
                key={course.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200/50 dark:border-slate-700/50 group"
              >
                <div className="h-40 bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-10 w-10 text-primary" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'fill-yellow-500' : 'fill-transparent'}`} />
                    ))}
                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">
                      {course.rating} ({course.students} students)
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                      <Building className="h-3 w-3 mr-1" />
                      {course.institution}
                    </span>
                    
                    <Link 
                      href={`/courses/${course.id}`}
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
                    >
                      View Course
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/courses"
              className="inline-flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NounLogic LMS</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our platform provides everything you need for modern blockchain education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200/50 dark:border-slate-700/50">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Engage with interactive content, quizzes, and hands-on exercises for a better learning experience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200/50 dark:border-slate-700/50">
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-5">
                <UserCog className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Learn from industry experts with real-world experience in blockchain and web3 technologies.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200/50 dark:border-slate-700/50">
              <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mb-5">
                <Award className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Blockchain Certificates</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Earn verifiable certificates stored on blockchain for your completed courses and achievements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-accent/10 border-t border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform. Create an account today and start your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] group"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/login" 
              className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:translate-y-[-2px]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-white dark:bg-slate-800/50 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            © {new Date().getFullYear()} NounLogic LMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}