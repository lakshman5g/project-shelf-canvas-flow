
import React from 'react';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  onChange: (colors: any) => void;
}

export const ColorPicker = ({ colors, onChange }: ColorPickerProps) => {
  const handleColorChange = (key: string, value: string) => {
    onChange({
      ...colors,
      [key]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="primary-color">Primary Color</Label>
          <span className="text-xs text-muted-foreground">{colors.primary}</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full border" 
            style={{ backgroundColor: colors.primary }}
          />
          <input
            id="primary-color"
            type="color"
            value={colors.primary}
            onChange={(e) => handleColorChange('primary', e.target.value)}
            className="w-full h-8"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="secondary-color">Secondary Color</Label>
          <span className="text-xs text-muted-foreground">{colors.secondary}</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full border" 
            style={{ backgroundColor: colors.secondary }}
          />
          <input
            id="secondary-color"
            type="color"
            value={colors.secondary}
            onChange={(e) => handleColorChange('secondary', e.target.value)}
            className="w-full h-8"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="accent-color">Accent Color</Label>
          <span className="text-xs text-muted-foreground">{colors.accent}</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full border" 
            style={{ backgroundColor: colors.accent }}
          />
          <input
            id="accent-color"
            type="color"
            value={colors.accent}
            onChange={(e) => handleColorChange('accent', e.target.value)}
            className="w-full h-8"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="background-color">Background Color</Label>
          <span className="text-xs text-muted-foreground">{colors.background}</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full border" 
            style={{ backgroundColor: colors.background }}
          />
          <input
            id="background-color"
            type="color"
            value={colors.background}
            onChange={(e) => handleColorChange('background', e.target.value)}
            className="w-full h-8"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="foreground-color">Foreground Color</Label>
          <span className="text-xs text-muted-foreground">{colors.foreground}</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full border" 
            style={{ backgroundColor: colors.foreground }}
          />
          <input
            id="foreground-color"
            type="color"
            value={colors.foreground}
            onChange={(e) => handleColorChange('foreground', e.target.value)}
            className="w-full h-8"
          />
        </div>
      </div>
    </div>
  );
};
