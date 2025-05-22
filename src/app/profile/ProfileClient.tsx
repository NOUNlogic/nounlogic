'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/app/providers';

const ProfileClient = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.profile?.name || '',
    email: user?.email || '',
    bio: user?.profile?.bio || '',
    institution: 'Tech University',
    role: user?.role || 'student',
    walletAddress: user?.walletAddress || '',
  });

  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile logic would go here
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">View and manage your account information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Profile sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center overflow-hidden mb-4">
                    {user?.profile?.avatar ? (
                      <img src={user.profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-medium">
                        {formData.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold">{formData.name}</h2>
                  <p className="text-muted-foreground">{formData.role}</p>
                  
                  <div className="w-full mt-6 space-y-2">
                    <button
                      onClick={() => setActiveTab('general')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeTab === 'general' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-secondary'
                      }`}
                    >
                      General Information
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeTab === 'security' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-secondary'
                      }`}
                    >
                      Security
                    </button>
                    <button
                      onClick={() => setActiveTab('web3')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeTab === 'web3' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-secondary'
                      }`}
                    >
                      Web3 Settings
                    </button>
                    <button
                      onClick={() => setActiveTab('preferences')}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeTab === 'preferences' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-secondary'
                      }`}
                    >
                      Preferences
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            {/* General tab */}
            {activeTab === 'general' && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>General Information</CardTitle>
                    <Button 
                      variant={isEditing ? 'outline' : 'primary'} 
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <Input
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={true} // Email can't be changed
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          rows={4}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Institution"
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <Input
                          label="Role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          disabled={true} // Role can't be changed by user
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="mt-6 flex justify-end">
                        <Button type="submit">
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Security tab */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <Input
                          label="Current Password"
                          type="password"
                          placeholder="Enter your current password"
                        />
                        <Input
                          label="New Password"
                          type="password"
                          placeholder="Enter your new password"
                        />
                        <Input
                          label="Confirm New Password"
                          type="password"
                          placeholder="Confirm your new password"
                        />
                        <div className="flex justify-end">
                          <Button>
                            Update Password
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p>Protect your account with 2FA</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Button variant="outline">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-medium mb-4">Session Management</h3>
                      <div className="space-y-4">
                        <div className="bg-secondary p-4 rounded-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-sm text-muted-foreground">
                                Chrome on Windows • Started 2 hours ago
                              </p>
                            </div>
                            <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success">
                              Active
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" className="text-danger border-danger hover:bg-danger/10">
                          Log Out All Other Devices
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Web3 tab */}
            {activeTab === 'web3' && (
              <Card>
                <CardHeader>
                  <CardTitle>Web3 Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Connected Wallet</h3>
                      {formData.walletAddress ? (
                        <div className="bg-secondary p-4 rounded-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-mono">{formData.walletAddress}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Connected on May 10, 2023
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Disconnect
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-secondary p-6 rounded-md text-center">
                          <div className="text-2xl mb-2">🦊</div>
                          <p className="mb-4">No wallet connected</p>
                          <Button>
                            Connect Wallet
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-medium mb-4">Blockchain Certificates</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p>Manage your on-chain credentials</p>
                          <p className="text-sm text-muted-foreground">
                            View and share your blockchain certificates
                          </p>
                        </div>
                        <Button variant="outline">
                          View Certificates
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-medium mb-4">Default Network</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="ethereum" 
                            name="network" 
                            value="ethereum" 
                            className="h-4 w-4 text-primary focus:ring-primary border-input rounded" 
                            defaultChecked 
                          />
                          <label htmlFor="ethereum" className="ml-2">Ethereum Mainnet</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="polygon" 
                            name="network" 
                            value="polygon" 
                            className="h-4 w-4 text-primary focus:ring-primary border-input rounded" 
                          />
                          <label htmlFor="polygon" className="ml-2">Polygon</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="optimism" 
                            name="network" 
                            value="optimism" 
                            className="h-4 w-4 text-primary focus:ring-primary border-input rounded" 
                          />
                          <label htmlFor="optimism" className="ml-2">Optimism</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences tab */}
            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Appearance</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="theme">Theme</label>
                          <select 
                            id="theme" 
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            <option value="system">System Default</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-medium mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p>Email Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about your courses via email
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p>Push Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Receive push notifications on your device
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p>Course Updates</p>
                            <p className="text-sm text-muted-foreground">
                              Get notified when course content is updated
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-medium mb-4">Language</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="language">Preferred Language</label>
                          <select 
                            id="language" 
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="zh">Chinese</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button>
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileClient;