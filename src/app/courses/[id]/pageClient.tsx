// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/app/courses/[id]/pageClient.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeft, Book, Clock, Users, Award, PlayCircle, 
  CheckCircle, Download, Share2, Heart, Wallet, FileText
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface CourseDetailClientProps {
  id: string;
}

export default function CourseDetailClient({ id }: CourseDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Simulated course data - in a real app, this would come from a data fetch
  const course = {
    id: parseInt(id),
    title: "Introduction to React",
    description: "Learn the basics of React and build your first application.",
    longDescription: `
      This comprehensive course will teach you everything you need to know about React, 
      from basic concepts to advanced techniques. You'll learn about components, state, 
      props, hooks, context API, and much more. By the end of this course, you'll be 
      able to build complex and interactive React applications.
      
      What you'll learn:
      - Understanding React components and JSX
      - Managing state and props
      - Working with hooks (useState, useEffect, useContext, etc.)
      - Routing with React Router
      - State management with Context API and Redux
      - Optimizing performance
      - Testing React applications
      - Deploying React applications
    `,
    instructor: {
      name: "Jane Smith",
      bio: "Senior Frontend Developer with 8+ years of experience",
      avatar: "https://via.placeholder.com/50x50?text=JS"
    },
    category: "Web Development",
    level: "Beginner",
    duration: "6 weeks",
    enrolledStudents: 1250,
    rating: 4.8,
    reviews: 120,
    lastUpdated: "October 2023",
    hasNFTCertificate: true,
    image: "https://via.placeholder.com/1200x600?text=React",
    price: "Free",
    modules: [
      {
        id: 1,
        title: "Getting Started with React",
        lessons: [
          { id: 1, title: "Introduction to React", duration: "10:20", completed: true },
          { id: 2, title: "Setting Up Your Environment", duration: "15:45", completed: true },
          { id: 3, title: "Your First React Component", duration: "12:30", completed: false }
        ]
      },
      {
        id: 2,
        title: "React Fundamentals",
        lessons: [
          { id: 4, title: "Understanding JSX", duration: "14:15", completed: false },
          { id: 5, title: "Props and State", duration: "18:30", completed: false },
          { id: 6, title: "Handling Events", duration: "11:45", completed: false }
        ]
      },
      {
        id: 3,
        title: "React Hooks",
        lessons: [
          { id: 7, title: "Introduction to Hooks", duration: "16:20", completed: false },
          { id: 8, title: "useState and useEffect", duration: "20:10", completed: false },
          { id: 9, title: "Creating Custom Hooks", duration: "15:35", completed: false }
        ]
      },
      {
        id: 4,
        title: "Building a Complete Application",
        lessons: [
          { id: 10, title: "Project Setup", duration: "12:40", completed: false },
          { id: 11, title: "Implementing Features", duration: "22:15", completed: false },
          { id: 12, title: "Deployment", duration: "10:30", completed: false }
        ]
      }
    ]
  };

  // Calculate progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0);
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="px-4 py-6 space-y-6 ml-0 md:ml-64">
      {/* Back navigation */}
      <div>
        <Link href="/courses" className="inline-flex items-center text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Courses
        </Link>
      </div>

      {/* Course Header */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="p-6 text-white">
            <div className="flex space-x-2 mb-2">
              <span className="bg-blue-500/80 text-white text-xs font-medium rounded-full px-2.5 py-0.5">
                {course.category}
              </span>
              <span className="bg-purple-500/80 text-white text-xs font-medium rounded-full px-2.5 py-0.5">
                {course.level}
              </span>
              {course.hasNFTCertificate && (
                <span className="bg-emerald-500/80 text-white text-xs font-medium rounded-full px-2.5 py-0.5 flex items-center">
                  <Wallet className="h-3 w-3 mr-1" /> NFT Certificate
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-white/80 mb-4">{course.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {course.enrolledStudents.toLocaleString()} students
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                {course.rating} ({course.reviews} reviews)
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Last updated: {course.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 inline-flex items-center border-b-2 text-sm font-medium ${
                  activeTab === "overview"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("curriculum")}
                className={`py-4 px-1 inline-flex items-center border-b-2 text-sm font-medium ${
                  activeTab === "curriculum"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300"
                }`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setActiveTab("instructor")}
                className={`py-4 px-1 inline-flex items-center border-b-2 text-sm font-medium ${
                  activeTab === "instructor"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300"
                }`}
              >
                Instructor
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "overview" && (
              <div className="prose dark:prose-invert max-w-none">
                <h2>About This Course</h2>
                <p className="whitespace-pre-line">{course.longDescription}</p>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">Course Curriculum</h2>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {completedLessons} of {totalLessons} lessons completed
                  </div>
                </div>

                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div 
                      key={module.id} 
                      className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
                    >
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 font-medium text-slate-800 dark:text-white">
                        {module.title}
                      </div>
                      <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        {module.lessons.map((lesson) => (
                          <div 
                            key={lesson.id} 
                            className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          >
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 flex items-center justify-center mr-3">
                                  <CheckCircle className="h-4 w-4" />
                                </div>
                              ) : (
                                <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center mr-3">
                                  <PlayCircle className="h-4 w-4" />
                                </div>
                              )}
                              <span className="text-slate-800 dark:text-white">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "instructor" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">About the Instructor</h2>
                
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-1">
                      {course.instructor.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {course.instructor.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrollment Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                {isEnrolled ? "Continue Learning" : "Enroll in this course"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEnrolled ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-800 dark:text-white">Your progress</span>
                      <span className="text-slate-800 dark:text-white">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    className="w-full" 
                    leftIcon={<PlayCircle className="h-4 w-4" />}
                  >
                    Continue Learning
                  </Button>
                  
                  {course.hasNFTCertificate && progress === 100 && (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      leftIcon={<Wallet className="h-4 w-4" />}
                    >
                      Claim NFT Certificate
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-2">
                    <span className="text-2xl font-bold text-slate-800 dark:text-white">{course.price}</span>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    className="w-full" 
                    onClick={() => setIsEnrolled(true)}
                  >
                    Enroll Now
                  </Button>
                </div>
              )}
              
              <div className="flex justify-between mt-4">
                <button className="flex items-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </button>
                <button className="flex items-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                  <Heart className="h-4 w-4 mr-1" />
                  Wishlist
                </button>
              </div>
            </CardContent>
          </Card>
          
          {/* Course Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Level</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">{course.level}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Duration</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">{course.duration}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Enrolled</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">{course.enrolledStudents.toLocaleString()} students</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Last Update</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">{course.lastUpdated}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Certificate</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">
                    {course.hasNFTCertificate ? (
                      <span className="flex items-center">
                        <Wallet className="h-4 w-4 mr-1 text-emerald-500" /> 
                        NFT Certificate
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Award className="h-4 w-4 mr-1" /> 
                        Standard
                      </span>
                    )}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Download Resources Card */}
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a 
                  href="#" 
                  className="flex items-center text-sm text-primary hover:text-primary/80"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Course Syllabus
                </a>
                <a 
                  href="#" 
                  className="flex items-center text-sm text-primary hover:text-primary/80"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Starter Files
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}