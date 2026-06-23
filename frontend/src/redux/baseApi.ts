import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import { signOut } from "next-auth/react";
import { AUTH_LOGIN } from "@/constants/authRoutes";

// Custom base query with authentication
const rawBaseQuery = fetchBaseQuery({
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

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.warn("Auth error detected, logging out...", result.error.status);

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }

    // Sign out from NextAuth
    await signOut({ callbackUrl: AUTH_LOGIN });
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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
    "Event",
    "EventCategory",
    "Route",
  ],
  endpoints: () => ({}),
});
