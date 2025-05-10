
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProjectAnalyticsProps {
  analytics: any[];
}

export function ProjectAnalytics({ analytics }: ProjectAnalyticsProps) {
  const metrics = analytics.filter(item => !item.testimonial_content);
  const testimonials = analytics.filter(item => item.testimonial_content);

  // Sample colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

  return (
    <div className="space-y-12">
      {/* Metrics and KPIs */}
      {metrics.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-6">Key Metrics & Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map(metric => (
              <Card key={metric.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-1">{metric.metric_name}</div>
                  
                  {metric.display_type === 'chart' && metric.chart_data ? (
                    <div className="h-[150px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        {metric.chart_data.type === 'pie' ? (
                          <PieChart>
                            <Pie
                              data={JSON.parse(metric.chart_data.data)}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {JSON.parse(metric.chart_data.data).map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        ) : (
                          <BarChart data={JSON.parse(metric.chart_data.data)}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                          </BarChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex flex-col mt-2">
                      <div className="text-3xl font-bold">
                        {metric.display_type === 'percentage' ? `${metric.metric_value}%` : metric.metric_value}
                      </div>
                      {metric.description && (
                        <p className="text-sm text-muted-foreground mt-2">{metric.description}</p>
                      )}
                      {metric.external_link && (
                        <a 
                          href={metric.external_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary mt-4 hover:underline"
                        >
                          {metric.external_link_text || "Learn more"}
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-6">Testimonials & Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="italic text-lg">&ldquo;{item.testimonial_content}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {item.testimonial_author?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{item.testimonial_author}</p>
                      {item.testimonial_role && (
                        <p className="text-sm text-muted-foreground">{item.testimonial_role}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
