
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Plus, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    title: 'Brand Redesign',
    description: 'A complete brand refresh for a tech startup',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    slug: 'brand-redesign',
    visibility: 'public',
    views: 324,
    lastUpdated: '2023-05-10T10:30:00Z',
  },
  {
    id: '2',
    title: 'Mobile App UI',
    description: 'User interface design for a fitness mobile application',
    thumbnail: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    slug: 'mobile-app-ui',
    visibility: 'public',
    views: 210,
    lastUpdated: '2023-05-05T14:20:00Z',
  },
  {
    id: '3',
    title: 'Website Development',
    description: 'Full-stack development for an e-commerce platform',
    thumbnail: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    slug: 'website-development',
    visibility: 'private',
    views: 190,
    lastUpdated: '2023-04-28T09:15:00Z',
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (projectId: string) => {
    // In a real app, this would make an API call to delete the project
    setProjects(projects.filter(p => p.id !== projectId));
    toast.success('Project deleted successfully');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
          </div>
          <Button asChild>
            <Link to="/dashboard/projects/new">
              <Plus className="mr-2 h-4 w-4" /> New project
            </Link>
          </Button>
        </div>

        <div className="w-full max-w-sm">
          <Label htmlFor="search" className="sr-only">Search projects</Label>
          <Input
            id="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Folder className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No projects found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery ? 'Try a different search term' : 'Create your first project to get started'}
            </p>
            {!searchQuery && (
              <Button asChild className="mt-4">
                <Link to="/dashboard/projects/new">
                  <Plus className="mr-2 h-4 w-4" /> Create project
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{project.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {project.views}
                        </div>
                        <div>
                          Updated {formatDate(project.lastUpdated)}
                        </div>
                        <div className={`px-1.5 py-0.5 rounded-full text-xs ${
                          project.visibility === 'public' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {project.visibility}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/dashboard/projects/${project.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/dashboard/projects/${project.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Projects;
