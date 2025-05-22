'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Bell, 
  Bookmark, 
  Calendar, 
  CheckCircle, 
  BarChart, 
  ArrowUpRight,
  BarChart2, 
  Target,
  Zap,
  Star
} from 'lucide-react';
import Link from 'next/link';

const DashboardClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for dashboard cards
  const stats = [
    { 
      title: 'Active Courses', 
      value: '12', 
      change: '+2', 
      changeType: 'increase',
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      bgClass: 'bg-primary/10'
    },
    { 
      title: 'Course Completion', 
      value: '68%', 
      change: '+5%', 
      changeType: 'increase',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      bgClass: 'bg-green-500/10'
    },
    { 
      title: 'Certificates', 
      value: '8', 
      change: '+1', 
      changeType: 'increase',
      icon: <Award className="h-5 w-5 text-amber-500" />,
      bgClass: 'bg-amber-500/10'
    },
    { 
      title: 'Hours Studied', 
      value: '48', 
      change: '+3', 
      changeType: 'increase',
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      bgClass: 'bg-blue-500/10'
    },
  ];

  // Mock data for recent courses
  const recentCourses = [
    { 
      id: '1', 
      title: 'Introduction to Web3', 
      progress: 75, 
      instructor: 'Jane Doe',
      coverBg: 'bg-gradient-to-r from-violet-500/20 to-purple-500/20',
      lastAccessed: '2 days ago'
    },
    { 
      id: '2', 
      title: 'Advanced Machine Learning', 
      progress: 45, 
      instructor: 'John Smith',
      coverBg: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20',
      lastAccessed: 'Yesterday'
    },
    { 
      id: '3', 
      title: 'Data Structures & Algorithms', 
      progress: 90, 
      instructor: 'Alice Johnson',
      coverBg: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20',
      lastAccessed: 'Today'
    },
  ];

  // Mock data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: '1',
      title: 'Web3 Final Project',
      course: 'Introduction to Web3',
      dueDate: 'Jun 20, 2025',
      daysLeft: 5
    },
    {
      id: '2',
      title: 'ML Model Submission',
      course: 'Advanced Machine Learning',
      dueDate: 'Jun 25, 2025',
      daysLeft: 10
    }
  ];

  // Mock data for recommended courses
  const recommendedCourses = [
    {
      id: '1',
      title: 'Blockchain Fundamentals',
      description: 'Based on your interest in Web3 technologies',
      instructor: 'Robert Chen',
      level: 'Intermediate',
      duration: '10 hours',
      rating: 4.8,
      icon: <Zap className="h-6 w-6 text-purple-500" />
    },
    {
      id: '2',
      title: 'Data Science Ethics',
      description: 'Complement your machine learning knowledge',
      instructor: 'Maria Garcia',
      level: 'Advanced',
      duration: '8 hours',
      rating: 4.6,
      icon: <Target className="h-6 w-6 text-blue-500" />
    },
    {
      id: '3',
      title: 'Advanced Python Techniques',
      description: 'Take your programming skills to the next level',
      instructor: 'David Kim',
      level: 'Advanced',
      duration: '12 hours',
      rating: 4.9,
      icon: <BarChart2 className="h-6 w-6 text-green-500" />
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6 pb-8">
        {/* Dashboard header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your learning journey.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="border-dashed"
              leftIcon={<Calendar className="h-4 w-4 mr-1" />}
            >
              Learning Plan
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              leftIcon={<BarChart className="h-4 w-4 mr-1" />}
            >
              Progress Report
            </Button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-row justify-between items-start">
                  <div className={`w-10 h-10 rounded-lg ${stat.bgClass} flex items-center justify-center mb-3`}>
                    {stat.icon}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stat.changeType === 'increase' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                  } flex items-center`}>
                    <TrendingUp className={`h-3 w-3 mr-1 ${stat.changeType === 'increase' ? '' : 'rotate-180'}`} />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <h4 className="text-3xl font-bold">{stat.value}</h4>
                  <p className="text-sm font-medium text-muted-foreground mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent courses - 2/3 width */}
          <div className="lg:col-span-2">
            <Card className="border border-muted/30 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">Recent Courses</CardTitle>
                <Link 
                  href="/courses" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  View all courses
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {recentCourses.map((course) => (
                    <div 
                      key={course.id} 
                      className="border border-border/50 rounded-xl overflow-hidden hover:border-border hover:shadow-md transition-all"
                    >
                      <div className={`${course.coverBg} h-3`}></div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-medium text-base hover:text-primary transition-colors">
                              <Link href={`/courses/${course.id}`}>{course.title}</Link>
                            </h5>
                            <span className="text-sm text-muted-foreground block mt-0.5">{course.instructor}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            title="Bookmark this course"
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className={`${course.progress > 66 ? 'bg-success' : course.progress > 33 ? 'bg-primary' : 'bg-amber-500'} h-2 rounded-full transition-all duration-500 progress-gradient`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-muted-foreground">Last accessed {course.lastAccessed}</span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 hover:bg-primary hover:text-white transition-colors"
                            >
                              Continue
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Announcements */}
            <Card className="border border-muted/30 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b border-border pb-4 hover:bg-muted/5 p-2 rounded-lg transition-colors">
                    <h5 className="font-medium text-base">New AI Features Available</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try our new AI-powered study recommendations.
                    </p>
                    <div className="flex justify-between mt-2 items-center">
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                      <Button variant="ghost" size="sm" className="h-7">Read more</Button>
                    </div>
                  </div>
                  <div className="border-b border-border pb-4 hover:bg-muted/5 p-2 rounded-lg transition-colors">
                    <h5 className="font-medium text-base">System Maintenance</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scheduled maintenance on June 15th, 2:00-4:00 AM UTC.
                    </p>
                    <div className="flex justify-between mt-2 items-center">
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                      <Button variant="ghost" size="sm" className="h-7">Read more</Button>
                    </div>
                  </div>
                  <div className="hover:bg-muted/5 p-2 rounded-lg transition-colors">
                    <h5 className="font-medium text-base">Web3 Integration Live</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Connect your wallet to claim blockchain certificates.
                    </p>
                    <div className="flex justify-between mt-2 items-center">
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                      <Button variant="ghost" size="sm" className="h-7">Read more</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming deadlines */}
            <Card className="border border-muted/30 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline) => (
                    <div 
                      key={deadline.id} 
                      className="border border-border/50 rounded-lg p-3 hover:border-border hover:shadow-sm transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{deadline.title}</h5>
                          <p className="text-xs text-muted-foreground">{deadline.course}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          deadline.daysLeft <= 5 ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {deadline.daysLeft} days left
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Due {deadline.dueDate}</span>
                        <Button variant="ghost" size="sm" className="h-7">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full justify-center">
                  View all deadlines
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* AI Recommendations */}
        <Card className="border border-muted/30 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedCourses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-gradient-to-b from-secondary/50 to-background rounded-xl p-5 border border-muted/30 hover:shadow-md transition-all hover:border-primary/20 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/90 dark:bg-slate-800/90 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {course.icon}
                  </div>
                  <h5 className="font-medium text-base group-hover:text-primary transition-colors">
                    {course.title}
                  </h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3.5 w-3.5 ${i < Math.floor(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">{course.rating}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xs text-muted-foreground">
                      <span className="inline-block border border-muted-foreground/30 rounded px-2 py-0.5 mr-2">
                        {course.level}
                      </span>
                      <span>{course.duration}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 group-hover:bg-primary group-hover:text-white transition-colors"
                      rightIcon={<ArrowUpRight className="h-3.5 w-3.5 ml-1" />}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-secondary/5 p-4 border-t border-border/30">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Recommendations based on your learning history and interests
              </p>
              <Button 
                variant="outline"
                className="border-dashed"
              >
                View All Recommendations
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardClient;