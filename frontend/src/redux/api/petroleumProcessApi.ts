import { baseApi } from "../baseApi";
import {
    PetroleumProcess,
    CreatePetroleumProcessPayload,
    UpdatePetroleumProcessPayload,
} from "../types/petroleumProcess";

export const petroleumProcessApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL PROCESSES
         * --------------------------- */
        getPetroleumProcesses: builder.query<
            PetroleumProcess[],
            { search?: string } | void
        >({
            query: (params) =>
                params
                    ? { url: "/petroleum-processes", params }
                    : { url: "/petroleum-processes" },

            transformResponse: (response: any): PetroleumProcess[] =>
                response.data ?? [],

            providesTags: ["PetroleumProcess"],
        }),

        /** ---------------------------
         * GET PROCESS BY ID
         * --------------------------- */
        getPetroleumProcessById: builder.query<
            PetroleumProcess,
            string
        >({
            query: (id) => `/petroleum-processes/${id}`,

            transformResponse: (response: any): PetroleumProcess =>
                response.data,

            providesTags: (_r, _e, id) => [
                { type: "PetroleumProcess", id },
            ],
        }),

        /** ---------------------------
         * CREATE PROCESS
         * --------------------------- */
        createPetroleumProcess: builder.mutation<
            PetroleumProcess,
            CreatePetroleumProcessPayload
        >({
            query: (body) => ({
                url: "/petroleum-processes",
                method: "POST",
                body,
            }),

            transformResponse: (response: any): PetroleumProcess =>
                response.data,

            invalidatesTags: ["PetroleumProcess"],
        }),

        /** ---------------------------
         * UPDATE PROCESS
         * --------------------------- */
        updatePetroleumProcess: builder.mutation<
            PetroleumProcess,
            { id: string; data: UpdatePetroleumProcessPayload }
        >({
            query: ({ id, data }) => ({
                url: `/petroleum-processes/${id}`,
                method: "PUT",
                body: data,
            }),

            transformResponse: (response: any): PetroleumProcess =>
                response.data,

            invalidatesTags: (_r, _e, { id }) => [
                { type: "PetroleumProcess", id },
                "PetroleumProcess",
            ],
        }),

        /** ---------------------------
         * DELETE PROCESS
         * --------------------------- */
        deletePetroleumProcess: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/petroleum-processes/${id}`,
                method: "DELETE",
            }),

            transformResponse: (response: any) => response,

            invalidatesTags: ["PetroleumProcess"],
        }),

        /** ---------------------------
         * TOGGLE PUBLISH PROCESS
         * --------------------------- */
        togglePublishPetroleumProcess: builder.mutation<
            { message: string; data: PetroleumProcess },
            string
        >({
            query: (id) => ({
                url: `/petroleum-processes/${id}/publish`,
                method: "PUT",
            }),

            transformResponse: (response: any) => response,

            invalidatesTags: ["PetroleumProcess"],
        }),
    }),
});

export const {
    useGetPetroleumProcessesQuery,
    useGetPetroleumProcessByIdQuery,
    useCreatePetroleumProcessMutation,
    useUpdatePetroleumProcessMutation,
    useDeletePetroleumProcessMutation,
    useTogglePublishPetroleumProcessMutation,
} = petroleumProcessApi;