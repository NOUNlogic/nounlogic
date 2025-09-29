"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, MessageSquare, Globe2, PlusCircle } from "lucide-react";
import { useAppwriteAuth } from "@/lib/appwrite/auth-context-new";
import { useRouter } from "next/navigation";

export default function SocialHomeClient() {
  const { user, loading } = useAppwriteAuth();
  const router = useRouter();

  if (!loading && user) {
    router.push("/feed");
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Connect with students worldwide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Build your learning network. Join groups, share progress, message peers, and collaborate across campuses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/register" className="px-8 py-4 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl">
              Get started free
            </Link>
            <Link href="/feed" className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm font-semibold">
              Explore the feed
            </Link>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            icon: Users, title: "Find your people", desc: "Follow classmates, meet mentors, and grow your circle."
          },{
            icon: MessageSquare, title: "Chat instantly", desc: "DM peers or start group conversations."
          },{
            icon: Globe2, title: "Join communities", desc: "Discover interest groups and campus hubs."
          }].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <Icon className="h-7 w-7 text-indigo-300" />
              <div className="mt-3 text-xl font-semibold">{title}</div>
              <div className="mt-1 text-slate-300 text-sm">{desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PlusCircle className="h-6 w-6 text-indigo-300" />
            <div>
              <div className="font-semibold">Post your first update</div>
              <div className="text-sm text-slate-300">Share what you’re learning and tag classmates</div>
            </div>
          </div>
          <Link href="/register" className="px-4 py-2 rounded-lg bg-primary text-white font-medium">Join now</Link>
        </div>
      </div>
    </div>
  );
}
