import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Custom base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  prepareHeaders: async (headers) => {
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
  ],
  endpoints: () => ({}),
});
