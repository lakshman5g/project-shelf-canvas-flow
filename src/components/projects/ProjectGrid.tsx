
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProjectGridProps {
  projects: any[];
  view: 'grid' | 'list';
}

export function ProjectGrid({ projects, view }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-background">
        <h3 className="text-xl font-medium mb-2">No projects found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="space-y-4">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-72 h-48">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    {project.cover_image ? (
                      <img
                        src={project.cover_image}
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                        No image
                      </div>
                    )}
                  </AspectRatio>
                </div>
                <div className="flex flex-col p-4">
                  <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {project.description || "No description available"}
                  </p>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={project.profiles?.avatar_url} />
                        <AvatarFallback>{getInitials(project.profiles?.display_name || 'User')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{project.profiles?.display_name || 'Unknown user'}</span>
                    </div>
                    
                    <Badge variant="outline">{getStatusBadge(project.status)}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
            <div className="relative">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                {project.cover_image ? (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                    No image
                  </div>
                )}
              </AspectRatio>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                  {getStatusBadge(project.status)}
                </Badge>
              </div>
            </div>
            
            <CardContent className="flex-grow pt-4">
              <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {project.description || "No description available"}
              </p>
            </CardContent>
            
            <CardFooter className="pt-0 pb-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={project.profiles?.avatar_url} />
                  <AvatarFallback>{getInitials(project.profiles?.display_name || 'User')}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{project.profiles?.display_name || 'Unknown user'}</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
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
