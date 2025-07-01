// app/admin/dashboard/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from '@/config/site';

// Added static metadata export
export const metadata: Metadata = {
  title: `Admin Dashboard | ${siteConfig.name}`,
  description: `Admin dashboard for managing ${siteConfig.name}.`,
  robots: { index: false, follow: false }, // Discourage indexing and following links
};

export default function AdminDashboardPage() {
  // Component logic remains the same
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {/* Example Content Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            {/* Add icon here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Feedback
            </CardTitle>
             {/* Add icon here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5</div>
            <p className="text-xs text-muted-foreground">
              In the last 24 hours
            </p>
          </CardContent>
        </Card>
        {/* Add more cards or dashboard elements */}
      </div>

      <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Overview of recent site events.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Placeholder for recent activity feed...</p>
                {/* Add table or list here */}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}