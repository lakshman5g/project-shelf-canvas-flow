
import React from 'react';
import { 
  Table, 
  TableBody,
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const projects = [
  { 
    id: 1, 
    name: 'Brand Redesign', 
    views: 1200, 
    viewsChange: 12, 
    avgTime: '3:45', 
    timeChange: 8.2, 
    conversionRate: 4.2, 
    conversionChange: -1.5 
  },
  { 
    id: 2, 
    name: 'Mobile App UI', 
    views: 950, 
    viewsChange: 8.5, 
    avgTime: '4:12', 
    timeChange: 15.3, 
    conversionRate: 6.8, 
    conversionChange: 2.3 
  },
  { 
    id: 3, 
    name: 'E-commerce Website', 
    views: 850, 
    viewsChange: 5.2, 
    avgTime: '2:30', 
    timeChange: -3.8, 
    conversionRate: 3.5, 
    conversionChange: 1.2 
  },
  { 
    id: 4, 
    name: 'Landing Page Design', 
    views: 720, 
    viewsChange: -2.3, 
    avgTime: '1:45', 
    timeChange: -5.6, 
    conversionRate: 2.1, 
    conversionChange: -2.8 
  },
  { 
    id: 5, 
    name: 'Product Dashboard', 
    views: 680, 
    viewsChange: 18.5, 
    avgTime: '5:20', 
    timeChange: 22.4, 
    conversionRate: 8.5, 
    conversionChange: 5.7 
  }
];

export const ProjectPerformance = () => {
  return (
    <Table>
      <TableCaption>Project performance metrics for the last 30 days</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project Name</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Avg. Time Spent</TableHead>
          <TableHead>Conversion Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{project.views}</span>
                <Badge variant={project.viewsChange >= 0 ? "outline" : "destructive"} className="ml-2 font-normal">
                  {project.viewsChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(project.viewsChange)}%
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{project.avgTime}</span>
                <Badge variant={project.timeChange >= 0 ? "outline" : "destructive"} className="ml-2 font-normal">
                  {project.timeChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(project.timeChange)}%
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{project.conversionRate}%</span>
                <Badge variant={project.conversionChange >= 0 ? "outline" : "destructive"} className="ml-2 font-normal">
                  {project.conversionChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(project.conversionChange)}%
                </Badge>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
