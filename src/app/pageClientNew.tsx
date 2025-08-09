"use client";

import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, UserCog, Building, Star, Zap, Award, ChevronRight, Sparkles, Trophy, Users, Target, Shield, Coins, Crown, Flame, LogIn } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useAppwriteAuth } from "@/lib/appwrite/auth-context-new";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCourses, useInstitutions, useAnalytics } from "@/hooks/useDatabase";

// Advanced animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
      staggerChildren: 0.15
    }
  }
};

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function HomeClient() {
  const { user, loading } = useAppwriteAuth();
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [latestAchievement, setLatestAchievement] = useState("");
  const { scrollY } = useScroll();
  
  // Database hooks
  const { courses } = useCourses();
  const { institutions } = useInstitutions();
  const { trackEvent } = useAnalytics();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 120 };
  const x = useSpring(mousePosition.x, springConfig);
  const y = useSpring(mousePosition.y, springConfig);

  // Featured courses - use real data or fallback to mock data
  const featuredCourses = courses.length > 0 ? courses.slice(0, 3).map((course, index) => ({
    id: course.$id,
    title: course.title,
    description: course.description,
    rating: 4.8, // This could be calculated from submissions/reviews
    students: 1248, // This could be calculated from enrollments
    institution: institutions.find(inst => inst.institution_id === course.institution_id)?.name || "Unknown Institution",
    gradient: ["from-blue-500 to-purple-600", "from-emerald-500 to-teal-600", "from-orange-500 to-pink-600"][index % 3]
  })) : [
    {
      id: "1",
      title: "Introduction to Blockchain",
      description: "Learn the fundamentals of blockchain technology",
      rating: 4.8,
      students: 1248,
      institution: "Blockchain Academy",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "2", 
      title: "Smart Contract Development",
      description: "Build secure and efficient smart contracts",
      rating: 4.7,
      students: 876,
      institution: "Crypto Institute",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "3",
      title: "Web3 Integration",
      description: "Connect your applications to blockchain networks",
      rating: 4.9,
      students: 654,
      institution: "Tech University",
      gradient: "from-orange-500 to-pink-600"
    }
  ];

  // Dynamic achievements based on real data
  const statsAchievements = [
    { icon: BookOpen, count: `${courses.length || 100}+`, label: "Courses", color: "text-blue-500", bgColor: "bg-blue-500/20" },
    { icon: Users, count: "50+", label: "Instructors", color: "text-emerald-500", bgColor: "bg-emerald-500/20" },
    { icon: Trophy, count: "20k+", label: "Students", color: "text-orange-500", bgColor: "bg-orange-500/20" },
    { icon: Building, count: `${institutions.length || 15}+`, label: "Institutions", color: "text-purple-500", bgColor: "bg-purple-500/20" }
  ];

  // Gamification elements
  const userLevelData = {
    currentXP: gameScore,
    nextLevelXP: level * 1000,
    progress: (gameScore % 1000) / 10
  };

  const availableAchievements = [
    { id: "explorer", name: "Explorer", description: "Visited the landing page", icon: Target, unlocked: true },
    { id: "learner", name: "Eager Learner", description: "Clicked on a course", icon: BookOpen, unlocked: achievements.includes("learner") },
    { id: "social", name: "Social Butterfly", description: "Shared content", icon: Users, unlocked: achievements.includes("social") },
    { id: "achiever", name: "Achiever", description: "Unlocked 3 achievements", icon: Crown, unlocked: achievements.length >= 3 }
  ];

  // Gamified interactions
  const handleInteraction = (action: string, points: number = 10) => {
    setGameScore(prev => prev + points);
    const newLevel = Math.floor((gameScore + points) / 1000) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      triggerAchievement(`Level ${newLevel} Reached!`);
    }
    
    // Unlock achievements based on actions
    if (action === "course_click" && !achievements.includes("learner")) {
      setAchievements(prev => [...prev, "learner"]);
      triggerAchievement("Eager Learner Unlocked!");
    }
  };

  const triggerAchievement = (achievement: string) => {
    setLatestAchievement(achievement);
    setShowAchievement(true);
    setTimeout(() => setShowAchievement(false), 3000);
  };

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Award initial points for visiting
    const awardInitialPoints = () => {
      setGameScore(prev => prev + 50);
      setLevel(1);
    };
    
    setTimeout(awardInitialPoints, 1000);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / 50,
        y: (clientY - innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3"
          >
            <Trophy className="h-6 w-6" />
            <span className="font-bold">{latestAchievement}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gamification HUD */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed top-4 left-4 z-40 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-4 space-y-3"
      >
        {/* Level and XP */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold">Level {level}</div>
            <div className="text-xs text-slate-300">{gameScore} XP</div>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="w-48 bg-slate-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${userLevelData.progress}%` }}
            animate={{ width: `${userLevelData.progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Quick Actions */}
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleInteraction("share", 25)}
            className="w-8 h-8 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg flex items-center justify-center transition-colors"
          >
            <Users className="h-4 w-4 text-emerald-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleInteraction("like", 15)}
            className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors"
          >
            <Flame className="h-4 w-4 text-red-400" />
          </motion.button>
        </div>
      </motion.div>

      {/* Login Button - Fixed Position */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed top-4 right-4 z-50"
      >
        <Link
          href="/login"
          className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          onClick={() => {
            handleInteraction("login_click", 30);
            trackEvent('header_login_click', {});
          }}
        >
          <LogIn className="h-5 w-5" />
          <span>Sign In</span>
        </Link>
      </motion.div>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={heroVariants}
        style={{ y: y1, opacity }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div 
            className="text-center lg:text-left z-10"
            style={{ x: x, y: y }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6"
              animate={pulseAnimation}
            >
              <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-300 font-medium">The Future of Learning</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              variants={heroVariants}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Learn
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Web3
              </span>
              <br />
              <span className="text-white">
                Today
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl"
              variants={heroVariants}
            >
              Master blockchain technology, smart contracts, and decentralized applications with 
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> industry experts</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              variants={heroVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/register" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl overflow-hidden shadow-2xl"
                  onClick={() => trackEvent('hero_cta_click', { action: 'start_learning' })}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center justify-center">
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/courses" 
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                  onClick={() => trackEvent('hero_cta_click', { action: 'explore_courses' })}
                >
                  Explore Courses
                </Link>
              </motion.div>
            </motion.div>

            {/* Achievement Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={heroVariants}
            >
              {statsAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="text-center group cursor-pointer"
                  animate={floatingAnimation}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  onClick={() => handleInteraction("stat_click", 20)}
                >
                  <motion.div 
                    className={`w-16 h-16 mx-auto mb-3 rounded-full ${achievement.bgColor} backdrop-blur-sm flex items-center justify-center ${achievement.color} group-hover:shadow-lg transition-all`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <achievement.icon className="w-8 h-8" />
                  </motion.div>
                  <div className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                    {achievement.count}
                  </div>
                  <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {achievement.label}
                  </div>
                  
                  {/* Gamified hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Hero Image */}
          <motion.div 
            className="relative lg:block hidden"
            style={{ y: y2 }}
            animate={floatingAnimation}
          >
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10"></div>
              <Image
                src="/images/hero/hero.jpg"
                alt="NounLogic Web3 Learning Platform 🚀📚"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Floating cards over image */}
              <motion.div
                className="absolute top-20 -right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg z-20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Live Learning</div>
                    <div className="text-xs text-slate-600">2.4k students online</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-20 -left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg z-20"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -2, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Certified</div>
                    <div className="text-xs text-slate-600">Blockchain verified</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile Hero Image */}
          <motion.div 
            className="relative lg:hidden mt-12"
            animate={floatingAnimation}
          >
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10"></div>
              <Image
                src="/images/hero/hero.jpg"
                alt="NounLogic Web3 Learning Platform 🚀📚"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Featured Courses Section */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-800/30 backdrop-blur-sm border-y border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Dive into cutting-edge blockchain and web3 technologies with our expertly crafted courses
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div 
                key={course.id}
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className={`h-48 bg-gradient-to-r ${course.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <BookOpen className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Floating particles in course card */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full"
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${70 + i * 5}%`
                      }}
                    />
                  ))}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400' : 'fill-transparent'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-slate-400">
                      {course.rating} ({course.students} students)
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center">
                      <Building className="h-3 w-3 mr-1" />
                      {course.institution}
                    </span>
                    
                    <Link 
                      href={`/courses/${course.id}`}
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center group"
                      onClick={() => {
                        handleInteraction("course_click", 50);
                        trackEvent('course_click', { courseId: course.id, courseTitle: course.title });
                      }}
                    >
                      Explore
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              href="/courses"
              className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              onClick={() => {
                handleInteraction("view_all_courses", 30);
                trackEvent('view_all_courses_click', {});
              }}
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <motion.section 
        className="py-20 px-4 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Why Choose 
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> NounLogic</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience the future of education with cutting-edge technology and innovative learning methods
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Interactive Learning",
                description: "Immersive experiences with real-time feedback, hands-on labs, and interactive simulations that make learning engaging and effective.",
                color: "from-yellow-400 to-orange-500",
                bgColor: "bg-yellow-500/10",
                gameElement: "⚡ +50 XP per lesson"
              },
              {
                icon: UserCog,
                title: "Expert Instructors",
                description: "Learn from industry veterans and blockchain pioneers who bring real-world experience and cutting-edge knowledge to every lesson.",
                color: "from-blue-400 to-purple-500",
                bgColor: "bg-blue-500/10",
                gameElement: "🎯 Unlock mentor badges"
              },
              {
                icon: Award,
                title: "Blockchain Certificates",
                description: "Earn immutable, verifiable credentials stored on blockchain that prove your expertise and can be shared globally.",
                color: "from-emerald-400 to-teal-500",
                bgColor: "bg-emerald-500/10",
                gameElement: "🏆 NFT Achievements"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => handleInteraction("feature_click", 25)}
              >
                <motion.div 
                  className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 10 }}
                >
                  <feature.icon className={`h-8 w-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-slate-200 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors mb-4">
                  {feature.description}
                </p>

                {/* Gamification element */}
                <div className="text-sm font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity">
                  {feature.gameElement}
                </div>

                {/* Interactive particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full"
                      animate={{
                        x: [0, Math.random() * 200 - 100],
                        y: [0, Math.random() * 200 - 100],
                        opacity: [1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                      style={{
                        left: "50%",
                        top: "50%"
                      }}
                    />
                  ))}
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Achievements Section */}
      <motion.section 
        className="py-16 px-4 bg-gradient-to-r from-slate-900/80 to-purple-900/80 backdrop-blur-sm border-y border-purple-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Achievement Gallery
            </h2>
            <p className="text-slate-300">Unlock badges and rewards as you progress through your learning journey</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {availableAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`text-center p-6 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'border-yellow-400/50 bg-yellow-400/10' 
                    : 'border-slate-600/30 bg-slate-800/30'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: achievement.unlocked ? 1.05 : 1.02 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
                      : 'bg-slate-700 text-slate-400'
                  }`}
                  animate={achievement.unlocked ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <achievement.icon className="h-8 w-8" />
                </motion.div>
                <h3 className={`font-bold mb-2 ${achievement.unlocked ? 'text-yellow-400' : 'text-slate-500'}`}>
                  {achievement.name}
                </h3>
                <p className={`text-sm ${achievement.unlocked ? 'text-slate-300' : 'text-slate-600'}`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-xs text-yellow-400 font-semibold"
                  >
                    ✨ UNLOCKED
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Call to Action */}
      <motion.section 
        className="py-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30"></div>
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to 
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Transform </span>
            Your Future?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join thousands of innovators already building the future. Start your Web3 journey today with our comprehensive learning platform.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/register" 
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl overflow-hidden shadow-2xl"
                onClick={() => {
                  handleInteraction("cta_register", 100);
                  trackEvent('cta_register_click', { location: 'bottom_cta' });
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <span className="relative flex items-center justify-center text-lg">
                  Start Learning Free
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/login" 
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all shadow-lg text-lg"
                onClick={() => {
                  handleInteraction("cta_login", 50);
                  trackEvent('cta_login_click', { location: 'bottom_cta' });
                }}
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-sm border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <motion.h3 
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
                whileHover={{ scale: 1.05 }}
              >
                NounLogic
              </motion.h3>
              <p className="text-slate-300 text-lg mb-4">The Future of Web3 Education</p>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Join the revolution in decentralized learning. Master blockchain technology, 
                earn verifiable credentials, and become part of the Web3 ecosystem.
              </p>
              
              {/* Social Proof */}
              <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-400">2,847 active learners</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { name: "Courses", href: "/courses" },
                  { name: "Institutions", href: "/institutions" },
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "Web3 Tools", href: "/web3" }
                ].map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className="block text-slate-400 hover:text-purple-400 transition-colors text-sm"
                    onClick={() => handleInteraction("footer_link", 10)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                {[
                  { name: "Help Center", href: "/help" },
                  { name: "Contact", href: "/contact" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" }
                ].map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className="block text-slate-400 hover:text-purple-400 transition-colors text-sm"
                    onClick={() => handleInteraction("footer_link", 10)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-slate-500 text-sm">
                  © {new Date().getFullYear()} NounLogic LMS. Powered by blockchain technology.
                </p>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="hidden md:block"
                >
                  <Shield className="h-5 w-5 text-green-400" />
                </motion.div>
              </div>
              
              {/* Gamification Footer Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span className="text-slate-400">Earn XP while learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-orange-400" />
                  <span className="text-slate-400">Collect achievements</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}