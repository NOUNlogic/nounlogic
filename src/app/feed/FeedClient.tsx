"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function FeedClient() {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        <input
          placeholder="Share an update with your peers..."
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
        />
        <div className="mt-3 flex justify-end">
          <div className="flex gap-2">
            <Link href="/ai" className="px-3 py-2 rounded-lg bg-primary/10 text-primary">Ask AI</Link>
            <button className="px-4 py-2 rounded-lg bg-primary text-white">Post</button>
          </div>
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
            {i === 1 && (
              <button
                className="mt-2 text-xs text-primary hover:underline"
                onClick={() => setSuggestion('Maybe suggest forming a study group for blockchain basics?')}
              >
                Ask AI for a reply suggestion
              </button>
            )}
            {suggestion && (
              <div className="mt-2 p-2 text-xs bg-primary/5 border border-primary/10 rounded">
                AI: {suggestion}
              </div>
            )}
            <div className="mt-3 flex gap-3 text-sm text-slate-600 dark:text-slate-400">
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
