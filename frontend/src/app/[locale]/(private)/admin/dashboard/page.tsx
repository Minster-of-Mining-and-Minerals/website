"use client";

import { useGetDashboardAnalyticsQuery } from "@/redux/api/dashboardApi";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { DashboardAreaChart } from "@/features/dashboard/components/DashboardAreaChart";
import { DashboardBarChart } from "@/features/dashboard/components/DashboardBarChart";
import { DashboardPieChart } from "@/features/dashboard/components/DashboardPieChart";
import { NewsInteractionsTable } from "@/features/dashboard/components/NewsInteractionsTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data, isLoading, isError } = useGetDashboardAnalyticsQuery();

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton className="h-[350px] w-full" />
          <Skeleton className="h-[350px] w-full" />
        </div>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive font-medium">Failed to load dashboard analytics. Please try again later.</p>
      </div>
    );
  }

  const { summary, logsOverTime, contactsOverTime, actionsBreakdown, rolesDistribution, newsInteractions } = data.data;

  return (
    <main className="flex-1 space-y-6 pb-12">
      {/* Summary Stats */}
      <DashboardStats summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audit Logs Area Chart */}
        <DashboardAreaChart 
          data={logsOverTime} 
          title="System Activity" 
          description="Total audit logs recorded over the last 30 days"
        />

        {/* Action Breakdown Pie Chart */}
        <DashboardPieChart 
          data={actionsBreakdown.map(a => ({ label: a.action || 'Unknown', value: a.count }))}
          title="Action Distribution"
          description="Breakdown of system operations by type"
        />

        {/* Public Inquiries Bar Chart */}
        <DashboardBarChart 
          data={contactsOverTime}
          title="Public Engagement"
          description="Inbound contact messages from the portal"
        />

         {/* Roles Distribution Pie Chart */}
         <DashboardPieChart 
          data={rolesDistribution.map(r => ({ label: r.role || 'Unassigned', value: r.count }))}
          title="User Role Distribution"
          description="Composition of system users by assigned role"
        />
      </div>

      {/* News Performance Table (Replaced Chart) */}
      <NewsInteractionsTable data={newsInteractions} />
    </main>
  );
}
