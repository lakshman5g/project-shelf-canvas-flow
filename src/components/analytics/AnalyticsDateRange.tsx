
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface AnalyticsDateRangeProps {
  value: string;
  onValueChange: (value: 'day' | 'week' | 'month' | 'year') => void;
}

export const AnalyticsDateRange = ({ value, onValueChange }: AnalyticsDateRangeProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Select value={value} onValueChange={(val) => onValueChange(val as 'day' | 'week' | 'month' | 'year')}>
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select range" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Last 24 hours</SelectItem>
          <SelectItem value="week">Last 7 days</SelectItem>
          <SelectItem value="month">Last 30 days</SelectItem>
          <SelectItem value="year">Last 12 months</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
