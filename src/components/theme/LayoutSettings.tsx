
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface LayoutSettingsProps {
  values: {
    contentWidth: string;
    spacing: string;
    borderRadius: string;
    headerStyle: string;
  };
  onChange: (values: any) => void;
}

export const LayoutSettings = ({ values, onChange }: LayoutSettingsProps) => {
  const handleChange = (key: string, value: string) => {
    onChange({
      ...values,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Content Width</Label>
          <RadioGroup 
            value={values.contentWidth}
            onValueChange={(value) => handleChange('contentWidth', value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="narrow" id="narrow" />
              <Label htmlFor="narrow">Narrow</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="default-width" />
              <Label htmlFor="default-width">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wide" id="wide" />
              <Label htmlFor="wide">Wide</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full">Full Width</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spacing">Element Spacing</Label>
          <Select
            value={values.spacing}
            onValueChange={(value) => handleChange('spacing', value)}
          >
            <SelectTrigger id="spacing">
              <SelectValue placeholder="Select spacing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="comfortable">Comfortable</SelectItem>
              <SelectItem value="spacious">Spacious</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="border-radius">Border Radius</Label>
          <Select
            value={values.borderRadius}
            onValueChange={(value) => handleChange('borderRadius', value)}
          >
            <SelectTrigger id="border-radius">
              <SelectValue placeholder="Select border radius" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (0px)</SelectItem>
              <SelectItem value="small">Small (4px)</SelectItem>
              <SelectItem value="default">Default (8px)</SelectItem>
              <SelectItem value="large">Large (12px)</SelectItem>
              <SelectItem value="full">Full (9999px)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="header-style">Header Style</Label>
          <Select
            value={values.headerStyle}
            onValueChange={(value) => handleChange('headerStyle', value)}
          >
            <SelectTrigger id="header-style">
              <SelectValue placeholder="Select header style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="centered">Centered</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="overlay">Overlay</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="pt-6 border-t">
        <h3 className="font-medium mb-3">Layout Preview</h3>
        <div className="bg-muted/30 rounded-lg p-4">
          {/* Simple layout preview */}
          <div className={`bg-card p-2 mb-3 rounded-lg border ${
            values.borderRadius === 'none' ? 'rounded-none' : 
            values.borderRadius === 'small' ? 'rounded-sm' : 
            values.borderRadius === 'large' ? 'rounded-lg' : 
            values.borderRadius === 'full' ? 'rounded-full' : 
            'rounded-md'
          }`}>
            <div className={`h-2 bg-primary rounded-sm mb-2 ${
              values.contentWidth === 'narrow' ? 'w-1/4' : 
              values.contentWidth === 'default' ? 'w-1/2' : 
              values.contentWidth === 'wide' ? 'w-3/4' : 
              'w-full'
            }`}></div>
            <div className="h-2 bg-muted rounded-sm w-full"></div>
          </div>

          <div className={`space-y-${
            values.spacing === 'compact' ? '1' : 
            values.spacing === 'spacious' ? '4' : 
            '2'
          }`}>
            <div className="h-2 bg-muted rounded-sm w-full"></div>
            <div className="h-2 bg-muted rounded-sm w-5/6"></div>
            <div className="h-2 bg-muted rounded-sm w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
