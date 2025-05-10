
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ProjectTool } from '@/types/project';

interface ProjectToolsProps {
  tools: ProjectTool[];
}

export function ProjectTools({ tools }: ProjectToolsProps) {
  // Group tools by category
  const categories = tools.reduce((acc, tool) => {
    const category = tool.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, ProjectTool[]>);

  return (
    <div className="space-y-8">
      {Object.entries(categories).map(([category, categoryTools]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="flex flex-wrap gap-3">
            {categoryTools.map(tool => (
              <div 
                key={tool.id} 
                className="flex items-center gap-2 border rounded-lg p-3 bg-background"
              >
                {tool.logo_url ? (
                  <img 
                    src={tool.logo_url} 
                    alt={tool.name} 
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <div className="h-6 w-6 bg-muted rounded flex items-center justify-center text-xs font-medium">
                    {tool.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-medium">{tool.name}</span>
                {tool.skill_level && (
                  <div className="flex gap-0.5 ml-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full ${i < tool.skill_level ? 'bg-primary' : 'bg-muted'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
