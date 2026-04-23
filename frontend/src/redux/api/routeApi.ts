import { baseApi } from "../baseApi";
import {
    Route,
    UpdateRouteLabelsPayload,
    ToggleRouteStatusPayload,
} from "../types/route";

export const routeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /** ---------------------------
         * GET ALL ROUTES
         * --------------------------- */
        getRoutes: builder.query<Route[], { lang?: string } | void>({
            query: (params) =>
                params ? { url: "/routes", params } : { url: "/routes" },

            transformResponse: (response: any): Route[] => response.data ?? [],

            providesTags: ["Route"],
        }),

        /** ---------------------------
         * UPDATE ROUTE LABELS
         * --------------------------- */
        updateRouteLabels: builder.mutation<
            { message: string },
            { id: string; data: UpdateRouteLabelsPayload }
        >({
            query: ({ id, data }) => ({
                url: `/routes/${id}/labels`,
                method: "PUT",
                body: data,
            }),

            transformResponse: (response: any) => response,

            invalidatesTags: (_r, _e, { id }) => [
                { type: "Route", id },
                "Route",
            ],
        }),

        /** ---------------------------
         * TOGGLE ROUTE ACTIVE STATUS
         * --------------------------- */
        toggleRouteStatus: builder.mutation<
            { route_id: string; is_active: boolean },
            { id: string; data: ToggleRouteStatusPayload }
        >({
            query: ({ id, data }) => ({
                url: `/routes/${id}/toggle-status`,
                method: "PATCH",
                body: data,
            }),

            transformResponse: (response: any) => response.data,

            invalidatesTags: (_r, _e, { id }) => [
                { type: "Route", id },
                "Route",
            ],
        }),
    }),
});

export const {
    useGetRoutesQuery,
    useUpdateRouteLabelsMutation,
    useToggleRouteStatusMutation,
} = routeApi;