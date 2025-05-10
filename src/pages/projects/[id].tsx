
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { ProjectTimeline } from '@/components/projects/ProjectTimeline';
import { ProjectTools } from '@/components/projects/ProjectTools';
import { ProjectAnalytics } from '@/components/projects/ProjectAnalytics';
import { ArrowLeft, Calendar, Link2, Share2 } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:user_id (username, display_name, avatar_url)
        `)
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  const { data: media } = useQuery({
    queryKey: ['projectMedia', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_media')
        .select('*')
        .eq('project_id', id)
        .order('display_order', { ascending: true });
        
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const { data: timeline } = useQuery({
    queryKey: ['projectTimeline', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_timeline')
        .select('*')
        .eq('project_id', id)
        .order('milestone_date', { ascending: true });
        
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const { data: tools } = useQuery({
    queryKey: ['projectTools', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_tools')
        .select('*')
        .eq('project_id', id);
        
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const { data: analytics } = useQuery({
    queryKey: ['projectAnalytics', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('project_id', id)
        .order('display_order', { ascending: true });
        
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="container mx-auto py-12">
          <Skeleton className="h-12 w-1/3 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!project) {
    return (
      <PublicLayout>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/explore">Back to Explore</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container mx-auto py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/explore" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{getStatusBadge(project.status)}</Badge>
                {project.client && <span className="text-muted-foreground">for {project.client}</span>}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              {project.external_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.external_url} target="_blank" rel="noopener noreferrer">
                    <Link2 className="h-4 w-4 mr-2" />
                    Visit Project
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Author and Date */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={project.profiles?.avatar_url} />
                <AvatarFallback>{getInitials(project.profiles?.display_name || 'User')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{project.profiles?.display_name || 'Unknown user'}</p>
                <p className="text-sm text-muted-foreground">{project.role || 'Creator'}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDateRange(project.start_date, project.end_date)}
            </div>
          </div>

          {/* Cover Image */}
          {project.cover_image && (
            <div className="rounded-lg overflow-hidden mb-12">
              <img
                src={project.cover_image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Project Description */}
          <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none mb-12">
            <p>{project.description}</p>
          </div>

          {/* Media Gallery */}
          {media && media.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
              <ProjectGallery media={media} />
            </section>
          )}

          {/* Tools & Technologies */}
          {tools && tools.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Tools & Technologies</h2>
              <ProjectTools tools={tools} />
            </section>
          )}

          {/* Timeline */}
          {timeline && timeline.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Development Timeline</h2>
              <ProjectTimeline timeline={timeline} />
            </section>
          )}

          {/* Outcomes & Results */}
          {analytics && analytics.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Outcomes & Results</h2>
              <ProjectAnalytics analytics={analytics} />
            </section>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}

// Helper functions
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

function getStatusBadge(status: string): string {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    case 'concept':
      return 'Concept';
    default:
      return status;
  }
}

function formatDateRange(startDate: string | null, endDate: string | null): string {
  if (!startDate) return 'No date specified';
  
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
  if (!endDate) return `Started ${startStr}`;
  
  const end = new Date(endDate);
  const endStr = end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
  return `${startStr} - ${endStr}`;
}
