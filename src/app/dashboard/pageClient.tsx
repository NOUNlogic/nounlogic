// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/app/dashboard/pageClient.tsx
"use client";

import { useState } from "react";
import { 
  BarChart2, BookOpen, Users, Clock, TrendingUp, 
  Calendar, BellRing, Award, CheckCircle
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

  return (
    <div className="px-4 py-6 space-y-8 ml-0 md:ml-64">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Welcome back, {userData.name} | {userData.role}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Enrolled Courses</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{userData.enrolledCourses}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Completed</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{userData.completedCourses}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Overall Progress</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{userData.progress}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
              <Award className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Certificates</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{userData.certificates}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses In Progress */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Courses In Progress</h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {courses.map(course => (
              <Link 
                key={course.id} 
                href={`/courses/${course.id}`}
                className="block p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-md font-medium text-slate-800 dark:text-white">{course.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Instructor: {course.instructor}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full sm:w-48 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          course.progress === 100 
                            ? "bg-green-500" 
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {course.progress}%
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            <div className="p-4 text-center">
              <Link 
                href="/courses" 
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View All Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Activity & Announcements */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Activity</h2>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {recentActivity.map(activity => (
                <div key={activity.id} className="p-4 flex">
                  <div className="mr-4">
                    {activity.type === "course_progress" && (
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                        <Clock className="h-4 w-4" />
                      </div>
                    )}
                    {activity.type === "assessment_completed" && (
                      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                    {activity.type === "certificate_earned" && (
                      <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
                        <Award className="h-4 w-4" />
                      </div>
                    )}
                    {activity.type === "course_enrolled" && (
                      <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                        <BookOpen className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {activity.type === "course_progress" && "Continued learning"}
                      {activity.type === "assessment_completed" && "Completed assessment"}
                      {activity.type === "certificate_earned" && "Earned certificate"}
                      {activity.type === "course_enrolled" && "Enrolled in course"}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{activity.course}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Announcements</h2>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {announcements.map(announcement => (
                <div key={announcement.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-800 dark:text-white">{announcement.title}</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{announcement.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}