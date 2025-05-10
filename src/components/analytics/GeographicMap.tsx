
import React from 'react';
import { Card } from '@/components/ui/card';

export const GeographicMap = () => {
  // In a real application, we would integrate with a mapping library
  // For this demo, we'll use a placeholder
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 grid place-items-center bg-muted/20 rounded-lg">
        <div className="text-center p-8">
          <p className="text-muted-foreground mb-2">Map visualization would be rendered here</p>
          <p className="text-sm text-muted-foreground">
            Using libraries like react-simple-maps or mapbox-gl
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {[
          { country: 'United States', percentage: '42%' },
          { country: 'United Kingdom', percentage: '18%' },
          { country: 'Germany', percentage: '12%' },
          { country: 'Canada', percentage: '8%' },
          { country: 'Australia', percentage: '5%' },
        ].map((item) => (
          <Card key={item.country} className="p-3">
            <div className="text-sm font-medium">{item.country}</div>
            <div className="text-sm text-muted-foreground">{item.percentage}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};
