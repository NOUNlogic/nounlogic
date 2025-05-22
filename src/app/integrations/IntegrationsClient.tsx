'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Bot, Zap, Search, PlusCircle, Users } from 'lucide-react';

const defaultIntegrations = [
  {
    name: 'NounLogic AI Tutor',
    description: 'An inbuilt AI agent that helps answer questions, explain concepts, and guide your learning journey.',
    type: 'inbuilt',
    icon: <Bot size={28} className="text-primary" />,
    featured: true,
  },
  {
    name: 'Quiz Generator Extension',
    description: 'Community extension to generate quizzes from any lesson or module.',
    type: 'community',
    icon: <Zap size={28} className="text-accent" />,
    featured: false,
  },
  {
    name: 'Study Group Agent',
    description: 'AI agent that helps you form and manage study groups with other learners.',
    type: 'community',
    icon: <Users size={28} className="text-secondary" />,
    featured: false,
  },
];

const IntegrationsClient = () => {
  const [search, setSearch] = useState('');
  const [integrations] = useState(defaultIntegrations);

  const filtered = integrations.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-10 px-4 md:px-0">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent mb-2">
            Integrations & Agents
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Discover and add AI agents, extensions, and integrations to enhance your NounLogic experience. Browse inbuilt and community-powered tools below.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <Input
            leftIcon={<Search size={18} className="text-muted-foreground" />}
            placeholder="Search integrations, agents, extensions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-80"
          />
          <Button
            variant="outline"
            className="flex items-center gap-2 mt-2 md:mt-0"
            onClick={() => alert('Submit your integration coming soon!')}
          >
            <PlusCircle size={18} />
            Submit Integration
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center text-muted-foreground py-12">
              No integrations found for your search.
            </div>
          ) : (
            filtered.map((integration, idx) => (
              <Card key={integration.name} className={`transition-transform hover:scale-[1.02] ${integration.featured ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    {integration.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {integration.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {integration.featured && <span className="text-primary font-bold mr-2">Inbuilt</span>}
                      {integration.type === 'community' && <span className="text-accent font-bold mr-2">Community</span>}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/90 mb-2">
                    {integration.description}
                  </p>
                  <Button
                    variant="primary"
                    className="w-full mt-2"
                    onClick={() => alert('Integration details coming soon!')}
                  >
                    View Integration
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default IntegrationsClient;