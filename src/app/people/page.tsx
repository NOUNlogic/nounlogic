import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export const metadata = {
  title: 'People | NounLogic',
  description: 'Discover classmates and mentors',
};

export default function PeoplePage() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">People</h1>
          <input className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none" placeholder="Search people"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700"/>
                <div>
                  <div className="font-medium">Student {i}</div>
                  <div className="text-xs text-slate-500">University of Somewhere</div>
                </div>
              </div>
              <button className="mt-3 px-3 py-1.5 rounded-md bg-primary/10 text-primary">Connect</button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
