
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorPicker } from '@/components/theme/ColorPicker';
import { TypographySettings } from '@/components/theme/TypographySettings';
import { LayoutSettings } from '@/components/theme/LayoutSettings';
import { ThemePreview } from '@/components/theme/ThemePreview';
import { ThemeSelect } from '@/components/theme/ThemeSelect';
import { useToast } from "@/hooks/use-toast";
import { Paintbrush, Save, RotateCcw, Check } from 'lucide-react';

export default function ThemeCustomizer() {
  const { toast } = useToast();
  const [activeTheme, setActiveTheme] = useState('minimal');
  const [customColors, setCustomColors] = useState({
    primary: 'hsl(244, 76%, 67%)',
    secondary: 'hsl(270, 91%, 65%)',
    accent: 'hsl(217, 91%, 53%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222.2, 84%, 4.9%)'
  });

  const [typography, setTypography] = useState({
    headingFont: 'Inter',
    bodyFont: 'Inter',
    baseSize: '16px',
    scale: 'Minor Third (1.2)'
  });

  const [layout, setLayout] = useState({
    contentWidth: 'default',
    spacing: 'comfortable',
    borderRadius: 'default',
    headerStyle: 'default'
  });
  
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyTheme = () => {
    setIsApplying(true);
    // Simulating an API call
    setTimeout(() => {
      setIsApplying(false);
      toast({
        title: "Theme applied",
        description: "Your theme changes have been applied to your portfolio.",
        // Removing the icon property as it's not supported in the Toast type
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Paintbrush className="mr-2 h-6 w-6" /> Theme Customizer
            </h1>
            <p className="text-muted-foreground mt-1">
              Personalize your portfolio appearance and brand identity
            </p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" /> Reset
            </Button>
            <Button onClick={handleApplyTheme} disabled={isApplying}>
              {isApplying ? "Applying..." : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Apply Theme
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ThemeSelect 
              value={activeTheme} 
              onChange={setActiveTheme} 
            />
            
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>
              <TabsContent value="colors" className="space-y-4 pt-4">
                <ColorPicker 
                  colors={customColors} 
                  onChange={setCustomColors} 
                />
              </TabsContent>
              <TabsContent value="typography" className="pt-4">
                <TypographySettings 
                  values={typography} 
                  onChange={setTypography} 
                />
              </TabsContent>
              <TabsContent value="layout" className="pt-4">
                <LayoutSettings 
                  values={layout} 
                  onChange={setLayout} 
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="border-2 border-dashed">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Theme Preview</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant={device === 'desktop' ? 'secondary' : 'outline'} 
                      size="sm" 
                      onClick={() => setDevice('desktop')}
                    >
                      Desktop
                    </Button>
                    <Button 
                      variant={device === 'tablet' ? 'secondary' : 'outline'} 
                      size="sm" 
                      onClick={() => setDevice('tablet')}
                    >
                      Tablet
                    </Button>
                    <Button 
                      variant={device === 'mobile' ? 'secondary' : 'outline'} 
                      size="sm" 
                      onClick={() => setDevice('mobile')}
                    >
                      Mobile
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  See how your theme will look on your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className={`p-0 flex justify-center overflow-hidden ${
                device === 'tablet' ? 'max-w-[768px] mx-auto' : 
                device === 'mobile' ? 'max-w-[375px] mx-auto' : 
                'w-full'
              }`}>
                <ThemePreview 
                  theme={{
                    name: activeTheme,
                    colors: customColors,
                    typography,
                    layout
                  }} 
                  device={device} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

