
import React, { useState } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid3X3, Rows } from 'lucide-react';
import { Project } from '@/types/project';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['exploreProjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:user_id (username, display_name, avatar_url)
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    }
  });

  // Filter projects based on search and category
  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Creative Work</h1>
          <p className="text-lg text-muted-foreground">
            Discover projects and case studies from talented creators around the world.
            Get inspired and see what others are building.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="w-full md:w-auto flex-1 max-w-md">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web">Web Design</SelectItem>
                <SelectItem value="mobile">Mobile App</SelectItem>
                <SelectItem value="branding">Branding</SelectItem>
                <SelectItem value="ux">UX/UI</SelectItem>
                <SelectItem value="product">Product Design</SelectItem>
              </SelectContent>
            </Select>

            <div className="border rounded-md p-1 flex">
              <Button
                variant={view === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <Rows className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="featured" className="mb-8">
          <TabsList>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[300px] w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProjectGrid projects={filteredProjects || []} view={view} />
        )}
      </div>
    </PublicLayout>
  );
}
