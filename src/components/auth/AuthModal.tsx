"use client";

import { useState } from 'react';
import { X, Mail, Github, Chrome, Wallet, KeyRound } from 'lucide-react';
import { useAuth } from '@/app/providers';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold">Welcome</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {error && (
            <div className="p-2 rounded bg-red-50 text-red-600 border border-red-200 text-sm">{error}</div>
          )}
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
              className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none"
            />
          </div>
          <button
            disabled={loading || !email}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
            onClick={async () => {
              setLoading(true);
              setError(null);
              try {
                // One-tap path for MVP: create or log in with temp password
                await register(email.split('@')[0] || 'User', email, 'temp-password');
                onClose();
              } catch (e: any) {
                setError(e?.message || 'Failed to start');
              } finally {
                setLoading(false);
              }
            }}
          >
            <Mail size={16} /> Continue with Email
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <Chrome size={16} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <Github size={16} /> GitHub
            </button>
            <button className="col-span-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <Wallet size={16} /> Wallet
            </button>
            <button className="col-span-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <KeyRound size={16} /> Passkey
            </button>
          </div>
          <p className="text-xs text-slate-500">By continuing, you agree to our Terms and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
}
