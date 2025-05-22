// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/app/pageClient.tsx
"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeClient() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome to NounLogic LMS
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
          A global learning management system designed for modern education and training.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link 
            href="/dashboard" 
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="/courses" 
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
          >
            Browse Courses
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">For Students</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Access courses, track progress, and earn certificates.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">For Instructors</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Create and manage courses, assessments, and student progress.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">For Institutions</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Manage multiple courses, instructors, and student enrollments.</p>
          </div>
        </div>
      </div>
    </div>
  );
}