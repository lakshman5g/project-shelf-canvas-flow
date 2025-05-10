
import React from 'react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

interface ProjectTimelineProps {
  timeline: any[];
}

export function ProjectTimeline({ timeline }: ProjectTimelineProps) {
  const sortedTimeline = [...timeline].sort((a, b) => {
    return new Date(a.milestone_date).getTime() - new Date(b.milestone_date).getTime();
  });

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-muted -translate-x-1/2 hidden md:block" />
      
      <div className="space-y-8 relative">
        {sortedTimeline.map((item, index) => (
          <div key={item.id} className="relative flex flex-col md:flex-row md:items-center">
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 top-4 md:top-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 md:-translate-y-1/2 z-10 hidden md:block" />
            
            {/* Date - left side for even, right side for odd */}
            <div className={`md:w-1/2 md:pr-8 ${index % 2 === 0 ? 'md:text-right' : 'md:order-last md:pl-8 md:pr-0'}`}>
              <span className="inline-block px-3 py-1 bg-muted rounded-md text-sm mb-2">
                {format(new Date(item.milestone_date), 'MMM d, yyyy')}
              </span>
            </div>
            
            {/* Content - right side for even, left side for odd */}
            <Card className={`p-6 md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:order-first'}`}>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
              {item.media_id && (
                <div className="mt-4 rounded-md overflow-hidden">
                  <img 
                    src={`https://placeholder.com/400x200?text=Media+${index+1}`} 
                    alt={`Media for ${item.title}`}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
