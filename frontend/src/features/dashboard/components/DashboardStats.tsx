"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Activity, MessageSquare, Newspaper } from "lucide-react";

interface DashboardStatsProps {
  summary: {
    totalUsers: number;
    activeRoles: number;
    totalLogs: number;
    totalMessages: number;
    totalNews: number;
  };
}

export function DashboardStats({ summary }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Users",
      value: summary.totalUsers,
      icon: Users,
      description: "Registered platform users",
      color: "text-blue-600",
    },
    {
      title: "Active Roles",
      value: summary.activeRoles,
      icon: Shield,
      description: "Configured access levels",
      color: "text-purple-600",
    },
    {
      title: "Audit Logs",
      value: summary.totalLogs,
      icon: Activity,
      description: "Total recorded system actions",
      color: "text-orange-600",
    },
    {
      title: "Inquiries",
      value: summary.totalMessages,
      icon: MessageSquare,
      description: "Public contact messages",
      color: "text-green-600",
    },
    {
      title: "News Articles",
      value: summary.totalNews,
      icon: Newspaper,
      description: "Published updates",
      color: "text-pink-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-sm border-none bg-background/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
