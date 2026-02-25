import { baseApi } from "../baseApi";
import { CreateLeadershipPayload, Leadership, UpdateLeadershipPayload } from "../types/leadership";



export const leadershipApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /** ---------------------------
         * GET ALL LEADERSHIP RECORDS
         * --------------------------- */
        getLeaderships: builder.query<Leadership[], void>({
            query: () => "/leadership",
            transformResponse: (response: any): Leadership[] => response.data ?? [],
            providesTags: ["Leadership"],
        }),

        /** ---------------------------
         * GET LEADERSHIP BY ID
         * --------------------------- */
        getLeadershipById: builder.query<Leadership, string>({
            query: (id) => `/leadership/${id}`,
            transformResponse: (response: any): Leadership => response.data,
            providesTags: (_r, _e, id) => [{ type: "Leadership", id }],
        }),

        /** ---------------------------
         * CREATE LEADERSHIP
         * --------------------------- */
        createLeadership: builder.mutation<Leadership, CreateLeadershipPayload>({
            query: (body) => ({
                url: "/leadership",
                method: "POST",
                body,
            }),
            transformResponse: (response: any): Leadership => response.data,
            invalidatesTags: ["Leadership"],
        }),

        /** ---------------------------
         * UPDATE LEADERSHIP
         * --------------------------- */
        updateLeadership: builder.mutation<
            Leadership,
            { id: string; data: UpdateLeadershipPayload }
        >({
            query: ({ id, data }) => ({
                url: `/leadership/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any): Leadership => response.data,
            invalidatesTags: (_r, _e, { id }) => [{ type: "Leadership", id }, "Leadership"],
        }),

        /** ---------------------------
         * DELETE LEADERSHIP
         * --------------------------- */
        deleteLeadership: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/leadership/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["Leadership"],
        }),
    }),
});

export const {
    useGetLeadershipsQuery,
    useGetLeadershipByIdQuery,
    useCreateLeadershipMutation,
    useUpdateLeadershipMutation,
    useDeleteLeadershipMutation,
} = leadershipApi;