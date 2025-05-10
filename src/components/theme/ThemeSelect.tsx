
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ThemeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const themes = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, simple design with plenty of whitespace',
    colors: ['#ffffff', '#f8f9fa', '#6366f1', '#a855f7']
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Striking colors and strong typography',
    colors: ['#18181b', '#27272a', '#818cf8', '#fb7185']
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless design with serif typography',
    colors: ['#f8f5f0', '#f0ebe1', '#394e6a', '#7f5539']
  }
];

export const ThemeSelect = ({ value, onChange }: ThemeSelectProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Choose a theme</h3>
          <RadioGroup value={value} onValueChange={onChange} className="gap-4">
            {themes.map((theme) => (
              <div key={theme.id} className="flex items-center space-x-2">
                <RadioGroupItem value={theme.id} id={theme.id} className="peer sr-only" />
                <Label
                  htmlFor={theme.id}
                  className="flex-1 cursor-pointer rounded-md border-2 border-muted p-4 peer-data-[state=checked]:border-primary"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{theme.name}</span>
                    <div className="flex space-x-1">
                      {theme.colors.map((color, i) => (
                        <span
                          key={i}
                          className="h-4 w-4 rounded-full border"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{theme.description}</p>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};
