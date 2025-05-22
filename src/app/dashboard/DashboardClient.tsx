'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';

const DashboardClient = () => {
  // Mock data for dashboard cards
  const stats = [
    { title: 'Active Courses', value: '12', change: '+2', changeType: 'increase' },
    { title: 'Course Completion', value: '68%', change: '+5%', changeType: 'increase' },
    { title: 'Certificates', value: '8', change: '+1', changeType: 'increase' },
    { title: 'Hours Studied', value: '48', change: '+3', changeType: 'increase' },
  ];

  // Mock data for recent courses
  const recentCourses = [
    { id: '1', title: 'Introduction to Web3', progress: 75, instructor: 'Jane Doe' },
    { id: '2', title: 'Advanced Machine Learning', progress: 45, instructor: 'John Smith' },
    { id: '3', title: 'Data Structures & Algorithms', progress: 90, instructor: 'Alice Johnson' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your learning journey.</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h4 className="text-3xl font-bold">{stat.value}</h4>
                  </div>
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.changeType === 'increase' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent courses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{course.title}</h5>
                        <span className="text-sm text-muted-foreground">{course.instructor}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{course.progress}% complete</span>
                        <Button variant="link" size="sm" className="px-0">Continue</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Announcements */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <h5 className="font-medium">New AI Features Available</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try our new AI-powered study recommendations.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <h5 className="font-medium">System Maintenance</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Scheduled maintenance on June 15th, 2:00-4:00 AM UTC.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">5 days ago</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Web3 Integration Live</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Connect your wallet to claim blockchain certificates.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary rounded-lg p-4">
                <h5 className="font-medium">Blockchain Fundamentals</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your interest in Web3 technologies.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  View Course
                </Button>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <h5 className="font-medium">Data Science Ethics</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  Complement your machine learning knowledge.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  View Course
                </Button>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <h5 className="font-medium">Advanced Python Techniques</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  Take your programming skills to the next level.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  View Course
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardClient;