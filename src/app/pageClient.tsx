// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/app/pageClient.tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, UserCog, Building, Star, Zap, Award, ChevronRight, Sparkles, Trophy, Users, Layers, Globe } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useAppwriteAuth } from "@/lib/appwrite/auth-context";
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
  const { scrollY } = useScroll();
  
  // Database hooks
  const { courses, loading: coursesLoading } = useCourses();
  const { institutions, loading: institutionsLoading } = useInstitutions();
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
  const featuredCourses = courses.length > 0 ? courses.slice(0, 3).map(course => ({
    id: course.$id,
    title: course.title,
    description: course.description,
    rating: 4.8, // This could be calculated from submissions/reviews
    students: 1248, // This could be calculated from enrollments
    institution: institutions.find(inst => inst.institution_id === course.institution_id)?.name || "Unknown Institution",
    gradient: ["from-blue-500 to-purple-600", "from-emerald-500 to-teal-600", "from-orange-500 to-pink-600"][Math.floor(Math.random() * 3)]
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
  const achievements = [
    { icon: BookOpen, count: `${courses.length || 100}+`, label: "Courses", color: "text-blue-500" },
    { icon: Users, count: "50+", label: "Instructors", color: "text-emerald-500" },
    { icon: Trophy, count: "20k+", label: "Students", color: "text-orange-500" },
    { icon: Building, count: `${institutions.length || 15}+`, label: "Institutions", color: "text-purple-500" }
  ];

  // Featured courses - use real data or fallback to mock data
  const featuredCourses = courses.length > 0 ? courses.slice(0, 3).map(course => ({
    id: course.$id,
    title: course.title,
    description: course.description,
    rating: 4.8, // This could be calculated from submissions/reviews
    students: 1248, // This could be calculated from enrollments
    institution: institutions.find(inst => inst.institution_id === course.institution_id)?.name || "Unknown Institution",
    gradient: ["from-blue-500 to-purple-600", "from-emerald-500 to-teal-600", "from-orange-500 to-pink-600"][Math.floor(Math.random() * 3)]
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
  const achievements = [
    { icon: BookOpen, count: `${courses.length || 100}+`, label: "Courses", color: "text-blue-500" },
    { icon: Users, count: "50+", label: "Instructors", color: "text-emerald-500" },
    { icon: Trophy, count: "20k+", label: "Students", color: "text-orange-500" },
    { icon: Building, count: `${institutions.length || 15}+`, label: "Institutions", color: "text-purple-500" }
  ];

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  useEffect(() => {
    setIsLoaded(true);
    
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
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="text-center"
                  animate={floatingAnimation}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ${achievement.color}`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-white">{achievement.count}</div>
                  <div className="text-sm text-slate-400">{achievement.label}</div>
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
                src="/images/hero/Image.webp"
                alt="Web3 Learning Platform"
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
                src="/images/hero/Image.webp"
                alt="Web3 Learning Platform"
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
                bgColor: "bg-yellow-500/10"
              },
              {
                icon: UserCog,
                title: "Expert Instructors",
                description: "Learn from industry veterans and blockchain pioneers who bring real-world experience and cutting-edge knowledge to every lesson.",
                color: "from-blue-400 to-purple-500",
                bgColor: "bg-blue-500/10"
              },
              {
                icon: Award,
                title: "Blockchain Certificates",
                description: "Earn immutable, verifiable credentials stored on blockchain that prove your expertise and can be shared globally.",
                color: "from-emerald-400 to-teal-500",
                bgColor: "bg-emerald-500/10"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
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
                
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NounLogic
              </h3>
              <p className="text-slate-400 text-sm mt-1">The Future of Web3 Education</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 mt-8 pt-8 text-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} NounLogic. Powered by blockchain technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}