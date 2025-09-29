import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export const metadata = {
  title: 'Feed | NounLogic',
  description: 'Your social feed of updates from peers and groups',
};

export default function FeedPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <input
            placeholder="Share an update with your peers..."
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
          />
          <div className="mt-3 flex justify-end">
            <button className="px-4 py-2 rounded-lg bg-primary text-white">Post</button>
          </div>
        </div>

        <div className="space-y-4">
          {[1,2,3].map((i) => (
            <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div>
                  <div className="text-sm font-medium">Student {i}</div>
                  <div className="text-xs text-slate-500">2h ago</div>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">Just completed Lesson {i}! Who wants to review together?</p>
              <div className="mt-3 flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <button>Like</button>
                <button>Comment</button>
                <button>Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
