
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';

// Mock data for different time ranges
const mockData = {
  day: [
    { time: '12am', visitors: 13, uniqueVisitors: 10 },
    { time: '3am', visitors: 5, uniqueVisitors: 4 },
    { time: '6am', visitors: 8, uniqueVisitors: 7 },
    { time: '9am', visitors: 45, uniqueVisitors: 30 },
    { time: '12pm', visitors: 75, uniqueVisitors: 55 },
    { time: '3pm', visitors: 100, uniqueVisitors: 70 },
    { time: '6pm', visitors: 85, uniqueVisitors: 60 },
    { time: '9pm', visitors: 45, uniqueVisitors: 30 },
  ],
  week: [
    { time: 'Mon', visitors: 120, uniqueVisitors: 85 },
    { time: 'Tue', visitors: 145, uniqueVisitors: 100 },
    { time: 'Wed', visitors: 160, uniqueVisitors: 110 },
    { time: 'Thu', visitors: 170, uniqueVisitors: 120 },
    { time: 'Fri', visitors: 180, uniqueVisitors: 130 },
    { time: 'Sat', visitors: 150, uniqueVisitors: 110 },
    { time: 'Sun', visitors: 110, uniqueVisitors: 75 },
  ],
  month: [
    { time: 'Week 1', visitors: 520, uniqueVisitors: 345 },
    { time: 'Week 2', visitors: 620, uniqueVisitors: 420 },
    { time: 'Week 3', visitors: 750, uniqueVisitors: 510 },
    { time: 'Week 4', visitors: 890, uniqueVisitors: 610 },
  ],
  year: [
    { time: 'Jan', visitors: 3200, uniqueVisitors: 2100 },
    { time: 'Feb', visitors: 3500, uniqueVisitors: 2300 },
    { time: 'Mar', visitors: 3800, uniqueVisitors: 2500 },
    { time: 'Apr', visitors: 4100, uniqueVisitors: 2700 },
    { time: 'May', visitors: 4300, uniqueVisitors: 2900 },
    { time: 'Jun', visitors: 4500, uniqueVisitors: 3100 },
    { time: 'Jul', visitors: 4700, uniqueVisitors: 3300 },
    { time: 'Aug', visitors: 4900, uniqueVisitors: 3500 },
    { time: 'Sep', visitors: 5100, uniqueVisitors: 3700 },
    { time: 'Oct', visitors: 5300, uniqueVisitors: 3900 },
    { time: 'Nov', visitors: 5500, uniqueVisitors: 4100 },
    { time: 'Dec', visitors: 5700, uniqueVisitors: 4300 },
  ],
};

interface VisitorsChartProps {
  dateRange: 'day' | 'week' | 'month' | 'year';
}

export const VisitorsChart = ({ dateRange }: VisitorsChartProps) => {
  const data = mockData[dateRange];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="time" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '8px',
            border: '1px solid hsl(var(--border))',
            backgroundColor: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="visitors" 
          name="Total Views" 
          stroke="hsl(var(--primary))" 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="uniqueVisitors" 
          name="Unique Visitors" 
          stroke="hsl(var(--secondary))" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
