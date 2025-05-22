// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/app/courses/pageClient.tsx
"use client";

import { useState } from "react";
import { Search, Filter, Grid, List, Tag, ArrowUpDown, Award, Wallet } from "lucide-react";
import Link from "next/link";

export default function CoursesClient() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Simulated course data
  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React and build your first application.",
      instructor: "Jane Smith",
      category: "Web Development",
      level: "Beginner",
      duration: "6 weeks",
      enrolledStudents: 1250,
      rating: 4.8,
      hasNFTCertificate: true,
      image: "https://via.placeholder.com/300x200?text=React"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      description: "Master the core concepts of JavaScript programming.",
      instructor: "Mike Johnson",
      category: "Programming",
      level: "Beginner",
      duration: "4 weeks",
      enrolledStudents: 2340,
      rating: 4.7,
      hasNFTCertificate: true,
      image: "https://via.placeholder.com/300x200?text=JavaScript"
    },
    {
      id: 3,
      title: "Advanced CSS Techniques",
      description: "Learn advanced CSS layouts, animations, and responsive design.",
      instructor: "Sarah Williams",
      category: "Web Design",
      level: "Intermediate",
      duration: "5 weeks",
      enrolledStudents: 980,
      rating: 4.9,
      hasNFTCertificate: false,
      image: "https://via.placeholder.com/300x200?text=CSS"
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      description: "Understanding data structures and algorithms for technical interviews.",
      instructor: "David Chen",
      category: "Computer Science",
      level: "Advanced",
      duration: "8 weeks",
      enrolledStudents: 750,
      rating: 4.6,
      hasNFTCertificate: true,
      image: "https://via.placeholder.com/300x200?text=DSA"
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts and techniques.",
      instructor: "Emily Rodriguez",
      category: "Data Science",
      level: "Intermediate",
      duration: "10 weeks",
      enrolledStudents: 1120,
      rating: 4.8,
      hasNFTCertificate: false,
      image: "https://via.placeholder.com/300x200?text=ML"
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      description: "Learn design thinking and create user-centered interfaces.",
      instructor: "Alex Turner",
      category: "Design",
      level: "Beginner",
      duration: "6 weeks",
      enrolledStudents: 1560,
      rating: 4.9,
      hasNFTCertificate: true,
      image: "https://via.placeholder.com/300x200?text=UI/UX"
    },
  ];

  // Extract unique categories
  const categories = Array.from(new Set(courses.map(course => course.category)));

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 py-6 space-y-6 ml-0 md:ml-64">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Courses</h1>
        
        <div className="mt-4 sm:mt-0">
          <Link 
            href="/courses/create" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create Course
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <select
                className="appearance-none block w-full pl-3 pr-10 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <Tag className="h-4 w-4 text-slate-400" />
              </div>
            </div>
            
            <button 
              onClick={() => setViewMode("grid")} 
              className={`p-2 rounded-md ${
                viewMode === "grid" 
                  ? "bg-slate-200 dark:bg-slate-700" 
                  : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              } border border-slate-300 dark:border-slate-600`}
            >
              <Grid className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </button>
            
            <button 
              onClick={() => setViewMode("list")} 
              className={`p-2 rounded-md ${
                viewMode === "list" 
                  ? "bg-slate-200 dark:bg-slate-700" 
                  : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              } border border-slate-300 dark:border-slate-600`}
            >
              <List className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Link 
              href={`/courses/${course.courseId}`} 
              key={course.courseId}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                {course.hasNFTCertificate && (
                  <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-xs py-1 px-2 rounded-full flex items-center">
                    <Wallet className="h-3 w-3 mr-1" /> NFT Certificate
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium rounded-full px-2.5 py-0.5">
                    {course.category}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-slate-700 dark:text-slate-300 ml-1">{course.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">{course.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    by <span className="text-slate-700 dark:text-slate-300">{course.instructor}</span>
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">{course.level}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Instructor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Certificate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
              {filteredCourses.map(course => (
                <tr 
                  key={course.id} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer"
                  onClick={() => window.location.href = `/courses/${course.courseId}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden mr-4">
                        <img src={course.image} alt={course.title} className="h-10 w-10 object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">{course.title}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 max-w-md">{course.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">{course.instructor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">{course.level}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">{course.duration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-900 dark:text-white">
                      <span className="text-yellow-500 mr-1">★</span> {course.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.hasNFTCertificate ? (
                      <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                        <Wallet className="h-4 w-4 mr-1" /> NFT
                      </div>
                    ) : (
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Award className="h-4 w-4 mr-1" /> Standard
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}