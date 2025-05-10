
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LabelList 
} from 'recharts';

// Mock data for different time ranges
const mockData = {
  day: [
    { name: 'Morning', timeSpent: 120, interactionRate: 65 },
    { name: 'Afternoon', timeSpent: 180, interactionRate: 75 },
    { name: 'Evening', timeSpent: 150, interactionRate: 80 },
    { name: 'Night', timeSpent: 90, interactionRate: 55 },
  ],
  week: [
    { name: 'Mon', timeSpent: 110, interactionRate: 60 },
    { name: 'Tue', timeSpent: 135, interactionRate: 65 },
    { name: 'Wed', timeSpent: 145, interactionRate: 70 },
    { name: 'Thu', timeSpent: 140, interactionRate: 68 },
    { name: 'Fri', timeSpent: 150, interactionRate: 75 },
    { name: 'Sat', timeSpent: 170, interactionRate: 85 },
    { name: 'Sun', timeSpent: 160, interactionRate: 80 },
  ],
  month: [
    { name: 'Week 1', timeSpent: 130, interactionRate: 65 },
    { name: 'Week 2', timeSpent: 145, interactionRate: 70 },
    { name: 'Week 3', timeSpent: 155, interactionRate: 72 },
    { name: 'Week 4', timeSpent: 165, interactionRate: 75 },
  ],
  year: [
    { name: 'Q1', timeSpent: 145, interactionRate: 68 },
    { name: 'Q2', timeSpent: 155, interactionRate: 72 },
    { name: 'Q3', timeSpent: 165, interactionRate: 76 },
    { name: 'Q4', timeSpent: 175, interactionRate: 80 },
  ],
};

interface EngagementChartProps {
  dateRange: 'day' | 'week' | 'month' | 'year';
}

export const EngagementChart = ({ dateRange }: EngagementChartProps) => {
  const data = mockData[dateRange];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs" />
        <YAxis yAxisId="left" orientation="left" className="text-xs" />
        <YAxis yAxisId="right" orientation="right" className="text-xs" />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '8px',
            border: '1px solid hsl(var(--border))',
            backgroundColor: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))'
          }}
          formatter={(value, name) => {
            if (name === "Avg. Time (sec)") return [`${value}s`, name];
            return [`${value}%`, name];
          }}
        />
        <Legend />
        <Bar 
          yAxisId="left" 
          dataKey="timeSpent" 
          name="Avg. Time (sec)" 
          fill="hsl(var(--primary))" 
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          yAxisId="right" 
          dataKey="interactionRate" 
          name="Interaction Rate (%)" 
          fill="hsl(var(--secondary))" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
