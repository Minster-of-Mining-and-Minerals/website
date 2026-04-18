import { baseApi } from "../baseApi";

export interface DashboardSummary {
  totalUsers: number;
  activeRoles: number;
  totalLogs: number;
  totalMessages: number;
  totalNews: number;
}

export interface TimeSeriesData {
  date: string;
  actions?: number;
  messages?: number;
}

export interface DistributionData {
  action?: string;
  role?: string;
  count: number;
}

export interface NewsInteractionData {
  title: string;
  views: number;
  reactions: number;
}

export interface DashboardAnalyticsResponse {
  success: boolean;
  data: {
    summary: DashboardSummary;
    logsOverTime: TimeSeriesData[];
    contactsOverTime: TimeSeriesData[];
    actionsBreakdown: DistributionData[];
    rolesDistribution: DistributionData[];
    newsInteractions: NewsInteractionData[];
  };
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAnalytics: builder.query<DashboardAnalyticsResponse, void>({
      query: () => "/dashboard-analytics",
      providesTags: ["AuditLogs", "User", "Message", "News"],
    }),
  }),
});

export const { useGetDashboardAnalyticsQuery } = dashboardApi;
