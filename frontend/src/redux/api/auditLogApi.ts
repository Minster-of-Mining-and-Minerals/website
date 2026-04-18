import { baseApi } from "../baseApi";

export const auditLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query({
      query: (params) => ({
        url: "/audit-logs",
        method: "GET",
        params,
      }),
      providesTags: ["AuditLogs"],
    }),
    deleteAuditLog: builder.mutation({
      query: (id) => ({
        url: `/audit-logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AuditLogs"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAuditLogsQuery, useDeleteAuditLogMutation } = auditLogApi;
