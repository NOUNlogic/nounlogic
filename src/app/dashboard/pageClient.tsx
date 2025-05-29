// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/app/dashboard/pageClient.tsx
"use client";

import { useState } from "react";
import { 
  BarChart2, BookOpen, Users, Clock, TrendingUp, 
  Calendar, BellRing, Award, CheckCircle, Star, Zap,
  Play, ArrowRight, Activity, Brain
} from "lucide-react";
import Link from "next/link";

export default function DashboardClient() {
  // Simulated user data - in a real app, this would come from a data fetch
  const userData = {
    name: "John Doe",
    role: "Student",
    enrolledCourses: 4,
    completedCourses: 2,
    progress: 65,
    certificates: 2,
  };

  // Simulated activity data
  const recentActivity = [
    { id: 1, type: "course_progress", course: "Introduction to React", time: "2 hours ago" },
    { id: 2, type: "assessment_completed", course: "JavaScript Fundamentals", time: "Yesterday" },
    { id: 3, type: "certificate_earned", course: "Web Development Basics", time: "3 days ago" },
    { id: 4, type: "course_enrolled", course: "Advanced CSS Techniques", time: "1 week ago" },
  ];

  // Simulated course data
  const courses = [
    { id: 1, title: "Introduction to React", progress: 80, instructor: "Jane Smith" },
    { id: 2, title: "JavaScript Fundamentals", progress: 100, instructor: "Mike Johnson" },
    { id: 3, title: "Web Development Basics", progress: 100, instructor: "Sarah Williams" },
    { id: 4, title: "Advanced CSS Techniques", progress: 20, instructor: "David Brown" },
  ];

  // Simulated announcements
  const announcements = [
    { id: 1, title: "Platform Maintenance", content: "Scheduled maintenance on Saturday.", date: "Today" },
    { id: 2, title: "New Course Available", content: "Check out our new Python course!", date: "Yesterday" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course_progress": return <Activity className="h-5 w-5 text-blue-500" />;
      case "assessment_completed": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "certificate_earned": return <Award className="h-5 w-5 text-yellow-500" />;
      case "course_enrolled": return <BookOpen className="h-5 w-5 text-purple-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 sm:px-6 lg:px-8 py-6 space-y-8 ml-0 md:ml-64 transition-all duration-300">
      {/* Animated floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-red-500/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-xl animate-float-slow"></div>
      </div>

      {/* Header with enhanced design */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300 flex items-center space-x-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Welcome back, <span className="font-semibold text-primary">{userData.name}</span> | {userData.role}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <BellRing className="h-6 w-6 text-slate-500 dark:text-slate-400 hover:text-primary cursor-pointer transition-colors" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <Calendar className="h-6 w-6 text-slate-500 dark:text-slate-400 hover:text-primary cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Stats Grid with 3D effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-500/10 p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{userData.enrolledCourses}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Enrolled Courses</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+2 this month</span>
          </div>
        </div>
        
        <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-green-500/10 p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{userData.completedCourses}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Award className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-yellow-500 font-medium">{userData.certificates} certificates</span>
          </div>
        </div>
        
        <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{userData.progress}%</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Average Progress</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${userData.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-yellow-500/10 p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-yellow-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/50 dark:to-yellow-800/50 text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform duration-300">
              <Award className="h-6 w-6" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{userData.certificates}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">NFT Certificates</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Zap className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-blue-500 font-medium">Blockchain verified</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid with enhanced animations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses In Progress - Enhanced */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-500/10 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-500" />
                Courses in Progress
              </h2>
              <Link 
                href="/courses" 
                className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group"
              >
                View All 
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
            {courses.map((course, index) => (
              <div key={course.id} className="p-6 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-all duration-200 group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Instructor: {course.instructor}
                    </p>
                    <div className="mt-3 flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-600 dark:text-slate-300">Progress</span>
                          <span className="font-medium text-slate-900 dark:text-white">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-200">
                        <Play className="h-4 w-4 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Activity & Announcements with enhanced styling */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-500/10 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200/50 dark:border-slate-700/50">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <Activity className="h-6 w-6 mr-2 text-green-500" />
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-all duration-200 group">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:scale-110 transition-transform duration-200">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {activity.course}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-500/10 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200/50 dark:border-slate-700/50">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <BellRing className="h-6 w-6 mr-2 text-yellow-500" />
                Announcements
              </h2>
            </div>
            <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-all duration-200 group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {announcement.content}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-4 flex-shrink-0">
                      {announcement.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions floating panel */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-4">
          <div className="flex space-x-3">
            <Link href="/ai" className="group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-200">
                <Brain className="h-6 w-6" />
              </div>
            </Link>
            <Link href="/courses" className="group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-200">
                <BookOpen className="h-6 w-6" />
              </div>
            </Link>
            <Link href="/web3" className="group">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-200">
                <Award className="h-6 w-6" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}