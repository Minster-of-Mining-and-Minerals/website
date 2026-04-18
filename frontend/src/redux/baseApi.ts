import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

// Custom base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  prepareHeaders: async (headers) => {
    const session: any = await getSession();
    if (session?.accessToken) {
      headers.set("authorization", `Bearer ${session.accessToken}`);
    }
    headers.set("content-type", "application/json");
    headers.set("accept", "application/json");
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "User",
    "Roles",
    "Permissions",
    "News",
    "Tag",
    "Attachment",
    "Service",
    "Background",
    "Leadership",
    "Strategy",
    "Region",
    "FederalOffice",
    "RegionalOffice",
    "Message",
    "SocialMedia",
    "Footer",
    "Card",
    "Slider",
    "Partner",
    "Gamestone",
    "Resource",
    "Snapshot",
    "ASM",
    "InvestigateEthiopia",
    "PetroleumObjective",
    "PetroleumProcess",
    "PetroleumRegulationProcess",
    "MiningApplicationProcess",
    "MiningRegulationProcess",
    "AuditLogs",
  ],
  endpoints: () => ({}),
});
