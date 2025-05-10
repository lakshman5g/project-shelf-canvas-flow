
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface TypographySettingsProps {
  values: {
    headingFont: string;
    bodyFont: string;
    baseSize: string;
    scale: string;
  };
  onChange: (values: any) => void;
}

export const TypographySettings = ({ values, onChange }: TypographySettingsProps) => {
  const handleChange = (key: string, value: string) => {
    onChange({
      ...values,
      [key]: value
    });
  };

  const fontOptions = [
    { value: 'Inter', label: 'Inter (Sans-serif)' },
    { value: 'Playfair Display', label: 'Playfair Display (Serif)' },
    { value: 'Roboto', label: 'Roboto (Sans-serif)' },
    { value: 'Roboto Mono', label: 'Roboto Mono (Monospace)' },
    { value: 'Open Sans', label: 'Open Sans (Sans-serif)' },
  ];

  const fontSizeValue = parseInt(values.baseSize);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="heading-font">Heading Font</Label>
          <Select
            value={values.headingFont}
            onValueChange={(value) => handleChange('headingFont', value)}
          >
            <SelectTrigger id="heading-font">
              <SelectValue placeholder="Select heading font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="body-font">Body Font</Label>
          <Select
            value={values.bodyFont}
            onValueChange={(value) => handleChange('bodyFont', value)}
          >
            <SelectTrigger id="body-font">
              <SelectValue placeholder="Select body font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label htmlFor="base-size">Base Font Size: {values.baseSize}</Label>
          </div>
          <Slider 
            id="base-size"
            min={12}
            max={20}
            step={1}
            value={[fontSizeValue]}
            onValueChange={(value) => handleChange('baseSize', `${value[0]}px`)}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>12px</span>
            <span>16px</span>
            <span>20px</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type-scale">Type Scale</Label>
          <Select
            value={values.scale}
            onValueChange={(value) => handleChange('scale', value)}
          >
            <SelectTrigger id="type-scale">
              <SelectValue placeholder="Select type scale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Minor Third (1.2)">Minor Third (1.2)</SelectItem>
              <SelectItem value="Major Third (1.25)">Major Third (1.25)</SelectItem>
              <SelectItem value="Perfect Fourth (1.33)">Perfect Fourth (1.33)</SelectItem>
              <SelectItem value="Golden Ratio (1.618)">Golden Ratio (1.618)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="pt-6 border-t">
        <h3 className="font-medium mb-2">Typography Preview</h3>
        <div className="space-y-4">
          <div>
            <p className="text-4xl mb-1" style={{ fontFamily: values.headingFont }}>
              Heading 1
            </p>
            <p className="text-3xl mb-1" style={{ fontFamily: values.headingFont }}>
              Heading 2
            </p>
            <p className="text-2xl mb-1" style={{ fontFamily: values.headingFont }}>
              Heading 3
            </p>
            <p className="text-xl mb-1" style={{ fontFamily: values.headingFont }}>
              Heading 4
            </p>
          </div>
          <div style={{ fontFamily: values.bodyFont, fontSize: values.baseSize }}>
            <p className="mb-2">This is body text that shows how paragraphs will appear in your portfolio.</p>
            <p>Secondary paragraph with <a href="#" className="text-primary underline">links</a> and <strong>bold text</strong> for emphasis.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
