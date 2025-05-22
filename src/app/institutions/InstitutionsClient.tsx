'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const InstitutionsClient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Mock institutions data
  const institutions = [
    {
      id: '1',
      name: 'Blockchain Academy',
      type: 'academy',
      location: 'San Francisco, CA',
      courses: 15,
      students: 1245,
      logo: 'https://via.placeholder.com/150/4f46e5/ffffff?text=BA',
      featured: true,
    },
    {
      id: '2',
      name: 'Tech University',
      type: 'university',
      location: 'Boston, MA',
      courses: 48,
      students: 5820,
      logo: 'https://via.placeholder.com/150/10b981/ffffff?text=TU',
      featured: true,
    },
    {
      id: '3',
      name: 'AI Institute',
      type: 'institute',
      location: 'Austin, TX',
      courses: 24,
      students: 2100,
      logo: 'https://via.placeholder.com/150/8b5cf6/ffffff?text=AI',
      featured: true,
    },
    {
      id: '4',
      name: 'Code Academy',
      type: 'academy',
      location: 'New York, NY',
      courses: 32,
      students: 3500,
      logo: 'https://via.placeholder.com/150/ef4444/ffffff?text=CA',
      featured: false,
    },
    {
      id: '5',
      name: 'Crypto Institute',
      type: 'institute',
      location: 'Miami, FL',
      courses: 12,
      students: 950,
      logo: 'https://via.placeholder.com/150/3b82f6/ffffff?text=CI',
      featured: false,
    },
    {
      id: '6',
      name: 'Global Tech College',
      type: 'college',
      location: 'Seattle, WA',
      courses: 28,
      students: 2400,
      logo: 'https://via.placeholder.com/150/f59e0b/ffffff?text=GTC',
      featured: false,
    },
  ];

  // Institution types for filtering
  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'university', name: 'Universities' },
    { id: 'college', name: 'Colleges' },
    { id: 'academy', name: 'Academies' },
    { id: 'institute', name: 'Institutes' },
  ];

  // Filter institutions based on search term and selected type
  const filteredInstitutions = institutions.filter(institution => {
    const matchesSearch = institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          institution.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || institution.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Institutions</h1>
          <p className="text-muted-foreground">Browse and manage learning institutions</p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search institutions, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {types.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  selectedType === type.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured institutions */}
        {selectedType === 'all' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Featured Institutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {institutions
                .filter(institution => institution.featured)
                .map(institution => (
                  <Card key={institution.id} className="overflow-hidden">
                    <div className="bg-secondary p-6 flex justify-center">
                      <img
                        src={institution.logo}
                        alt={institution.name}
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold text-lg">{institution.name}</h3>
                      <p className="text-muted-foreground capitalize">{institution.type}</p>
                      <p className="text-sm text-muted-foreground mt-1">{institution.location}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-secondary p-3 rounded-md">
                          <p className="text-lg font-semibold">{institution.courses}</p>
                          <p className="text-xs text-muted-foreground">Courses</p>
                        </div>
                        <div className="bg-secondary p-3 rounded-md">
                          <p className="text-lg font-semibold">{institution.students}</p>
                          <p className="text-xs text-muted-foreground">Students</p>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All institutions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedType === 'all' ? 'All Institutions' : types.find(t => t.id === selectedType)?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map(institution => (
              <Card key={institution.id} className="overflow-hidden">
                <div className="flex items-center p-4 gap-4">
                  <img
                    src={institution.logo}
                    alt={institution.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{institution.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{institution.type}</p>
                    <p className="text-xs text-muted-foreground">{institution.location}</p>
                  </div>
                </div>
                <CardContent className="pt-0 px-4 pb-4">
                  <div className="flex justify-between text-sm border-t border-border pt-4">
                    <div>
                      <span className="font-medium">{institution.courses}</span> Courses
                    </div>
                    <div>
                      <span className="font-medium">{institution.students}</span> Students
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-secondary px-4 py-3 flex justify-between">
                  <Button variant="ghost" size="sm">
                    Courses
                  </Button>
                  <Button size="sm">
                    View
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredInstitutions.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No institutions found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default InstitutionsClient;