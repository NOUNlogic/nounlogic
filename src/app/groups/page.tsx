import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export const metadata = {
  title: 'Groups | NounLogic',
  description: 'Join and create communities',
};

export default function GroupsPage() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Communities</h1>
          <button className="px-4 py-2 rounded-lg bg-primary text-white">New Group</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="h-24 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
              <div className="mt-3 font-semibold">Group {i}</div>
              <div className="text-sm text-slate-500">124 members</div>
              <button className="mt-3 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800">View</button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
