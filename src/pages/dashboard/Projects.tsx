import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Plus, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import { Folder } from '@/components/Folder';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock projects data
const mockProjects = [
  { id: '1', name: 'Website Redesign', description: 'Redesign the company website for better UX.', status: 'In Progress' },
  { id: '2', name: 'Mobile App Development', description: 'Develop a mobile app for iOS and Android.', status: 'Completed' },
  { id: '3', name: 'Marketing Campaign', description: 'Launch a new marketing campaign to increase brand awareness.', status: 'Planned' },
];

// Component to display project items in a grid
const ProjectGridItem = ({ project, onDelete, onEdit, onView }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(project.id)}>
              <Eye className="mr-2 h-4 w-4" />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(project.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:bg-destructive/20" onClick={() => onDelete(project.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
      <div className="text-xs text-muted-foreground">Status: {project.status}</div>
    </CardContent>
  </Card>
);

// Component to display projects in a grid or a "no projects" state
const ProjectGrid = ({ projects, onDelete, onEdit, onView }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-4">
          <Folder />
        </div>
        <h3 className="text-xl font-medium mb-2">No projects yet</h3>
        <p className="text-muted-foreground mb-6">Create your first project to get started</p>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Project
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map(project => (
        <ProjectGridItem
          key={project.id}
          project={project}
          onDelete={onDelete}
          onEdit={onEdit}
          onView={onView}
        />
      ))}
    </div>
  );
};

// Main Projects component
const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');

  // Handlers for CRUD operations (mock for now)
  const handleCreate = () => {
    alert('Create project');
  };

  const handleView = (id: string) => {
    alert(`View project ${id}`);
  };

  const handleEdit = (id: string) => {
    alert(`Edit project ${id}`);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  // Filter projects based on search query
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <div className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Button asChild>
              <Link to="/dashboard/projects/new">
                <Plus className="mr-2 h-4 w-4" /> Create Project
              </Link>
            </Button>
          </div>
        </div>
        <ProjectGrid
          projects={filteredProjects}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      </div>
    </DashboardLayout>
  );
};

export default Projects;
