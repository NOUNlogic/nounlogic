import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export const metadata = {
  title: 'Messages | NounLogic',
  description: 'Direct messages with peers and groups',
};

export default function MessagesPage() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="md:col-span-1 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <input className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none" placeholder="Search"/>
          <div className="mt-4 space-y-2">
            {[1,2,3,4].map(i => (
              <button key={i} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <div className="text-sm font-medium">Chat {i}</div>
                <div className="text-xs text-slate-500">Last message preview...</div>
              </button>
            ))}
          </div>
        </aside>
        <section className="md:col-span-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[60vh] flex flex-col">
          <div className="flex-1" />
          <div className="mt-3 flex items-center gap-2">
            <input className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none" placeholder="Type a message"/>
            <button className="px-4 py-2 rounded-lg bg-primary text-white">Send</button>
            <a href="/ai" className="px-3 py-2 rounded-lg bg-primary/10 text-primary">Ask AI</a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
