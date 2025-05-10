
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  Users, Eye, Clock, ArrowUpRight, 
  Globe, Smartphone, Laptop, Calendar
} from 'lucide-react';
import { AnalyticsDateRange } from '@/components/analytics/AnalyticsDateRange';
import { VisitorsChart } from '@/components/analytics/VisitorsChart';
import { EngagementChart } from '@/components/analytics/EngagementChart';
import { ProjectPerformance } from '@/components/analytics/ProjectPerformance';
import { GeographicMap } from '@/components/analytics/GeographicMap';
import { DeviceBreakdown } from '@/components/analytics/DeviceBreakdown';

export default function Analytics() {
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('month');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor your portfolio performance and visitor engagement</p>
          </div>

          <AnalyticsDateRange value={dateRange} onValueChange={setDateRange} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,521</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 inline-flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +12%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 inline-flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +5.2%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2m 45s</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 inline-flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +18%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Conversions</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 inline-flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +8.3%
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Visitor Traffic</CardTitle>
              <CardDescription>Daily visitor traffic over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <VisitorsChart dateRange={dateRange} />
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Time spent and interaction rates</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <EngagementChart dateRange={dateRange} />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Project Performance</TabsTrigger>
            <TabsTrigger value="geography">Geographic Data</TabsTrigger>
            <TabsTrigger value="devices">Device Breakdown</TabsTrigger>
          </TabsList>
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Project Performance</CardTitle>
                <CardDescription>Compare engagement across your case studies</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ProjectPerformance />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="geography">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <GeographicMap />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Device & Platform Breakdown</CardTitle>
                <CardDescription>Types of devices used to view your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <DeviceBreakdown />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
