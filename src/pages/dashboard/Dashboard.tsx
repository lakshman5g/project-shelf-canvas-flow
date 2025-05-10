
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BarChart2, Folder, Plus, Users, Eye } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName}</h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your portfolio activity</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/dashboard/projects/new">
              <Plus className="mr-2 h-4 w-4" /> New project
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,324</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">View Time</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2m 14s</div>
              <p className="text-xs text-muted-foreground">Average time spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connections</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">13</div>
              <p className="text-xs text-muted-foreground">+2 new this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest portfolio additions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, title: 'Brand Redesign', views: 324, lastUpdated: '2 days ago' },
                  { id: 2, title: 'Mobile App UI', views: 210, lastUpdated: '1 week ago' },
                  { id: 3, title: 'Website Development', views: 190, lastUpdated: '2 weeks ago' },
                ].map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex flex-col">
                      <span className="font-medium">{project.title}</span>
                      <span className="text-xs text-muted-foreground">Updated {project.lastUpdated}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      {project.views}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/projects">View all projects</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>Recent portfolio activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: Eye, text: 'New view on Brand Redesign', time: '2 hours ago' },
                  { icon: Users, text: 'New connection request', time: '1 day ago' },
                  { icon: Eye, text: 'New view on Mobile App UI', time: '3 days ago' },
                  { icon: Eye, text: 'New view on Website Development', time: '1 week ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start">
                    <div className="mr-3 mt-0.5 bg-secondary w-8 h-8 rounded-full flex items-center justify-center">
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">{activity.text}</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
