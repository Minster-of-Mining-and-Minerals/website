import { baseApi } from "../baseApi";
import {
    PetroleumObjective,
    CreatePetroleumObjectivePayload,
    UpdatePetroleumObjectivePayload,
} from "../types/petroleumObjective";

export const petroleumObjectiveApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL OBJECTIVES
         * --------------------------- */
        getPetroleumObjectives: builder.query<
            PetroleumObjective[],
            { search?: string } | void
        >({
            query: (params) =>
                params
                    ? { url: "/petroleum-objectives", params }
                    : { url: "/petroleum-objectives" },

            transformResponse: (response: any): PetroleumObjective[] =>
                response.data ?? [],

            providesTags: ["PetroleumObjective"],
        }),

        /** ---------------------------
         * GET OBJECTIVE BY ID
         * --------------------------- */
        getPetroleumObjectiveById: builder.query<
            PetroleumObjective,
            string
        >({
            query: (id) => `/petroleum-objectives/${id}`,

            transformResponse: (response: any): PetroleumObjective =>
                response.data,

            providesTags: (_r, _e, id) => [
                { type: "PetroleumObjective", id },
            ],
        }),

        /** ---------------------------
         * CREATE OBJECTIVE
         * --------------------------- */
        createPetroleumObjective: builder.mutation<
            PetroleumObjective,
            CreatePetroleumObjectivePayload
        >({
            query: (body) => ({
                url: "/petroleum-objectives",
                method: "POST",
                body,
            }),

            transformResponse: (response: any): PetroleumObjective =>
                response.data,

            invalidatesTags: ["PetroleumObjective"],
        }),

        /** ---------------------------
         * UPDATE OBJECTIVE
         * --------------------------- */
        updatePetroleumObjective: builder.mutation<
            PetroleumObjective,
            { id: string; data: UpdatePetroleumObjectivePayload }
        >({
            query: ({ id, data }) => ({
                url: `/petroleum-objectives/${id}`,
                method: "PUT",
                body: data,
            }),

            transformResponse: (response: any): PetroleumObjective =>
                response.data,

            invalidatesTags: (_r, _e, { id }) => [
                { type: "PetroleumObjective", id },
                "PetroleumObjective",
            ],
        }),

        /** ---------------------------
         * DELETE OBJECTIVE
         * --------------------------- */
        deletePetroleumObjective: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/petroleum-objectives/${id}`,
                method: "DELETE",
            }),

            transformResponse: (response: any) => response,

            invalidatesTags: ["PetroleumObjective"],
        }),
    }),
});

export const {
    useGetPetroleumObjectivesQuery,
    useGetPetroleumObjectiveByIdQuery,
    useCreatePetroleumObjectiveMutation,
    useUpdatePetroleumObjectiveMutation,
    useDeletePetroleumObjectiveMutation,
} = petroleumObjectiveApi;