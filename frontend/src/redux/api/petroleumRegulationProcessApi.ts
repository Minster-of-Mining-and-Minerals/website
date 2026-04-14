import { baseApi } from "../baseApi";
import {
    PetroleumRegulationProcess,
    CreatePetroleumRegulationProcessPayload,
    UpdatePetroleumRegulationProcessPayload,
} from "../types/petroleumRegulationProcess";

export const petroleumRegulationProcessApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL PROCESSES
         * --------------------------- */
        getPetroleumRegulationProcesses: builder.query<
            PetroleumRegulationProcess[],
            { published?: boolean } | void
        >({
            query: (params) =>
                params
                    ? { url: "/petroleum-regulation-processes", params }
                    : { url: "/petroleum-regulation-processes" },

            transformResponse: (response: any): PetroleumRegulationProcess[] =>
                response.data ?? [],

            providesTags: ["PetroleumRegulationProcess"],
        }),

        /** ---------------------------
         * GET PROCESS BY ID
         * --------------------------- */
        getPetroleumRegulationProcessById: builder.query<
            PetroleumRegulationProcess,
            string
        >({
            query: (id) => `/petroleum-regulation-processes/${id}`,

            transformResponse: (response: any): PetroleumRegulationProcess =>
                response.data,

            providesTags: (_r, _e, id) => [
                { type: "PetroleumRegulationProcess", id },
            ],
        }),

        /** ---------------------------
         * CREATE PROCESS
         * --------------------------- */
        createPetroleumRegulationProcess: builder.mutation<
            PetroleumRegulationProcess,
            CreatePetroleumRegulationProcessPayload
        >({
            query: (body) => ({
                url: "/petroleum-regulation-processes",
                method: "POST",
                body,
            }),

            transformResponse: (response: any): PetroleumRegulationProcess =>
                response.data,

            invalidatesTags: ["PetroleumRegulationProcess"],
        }),

        /** ---------------------------
         * UPDATE PROCESS
         * --------------------------- */
        updatePetroleumRegulationProcess: builder.mutation<
            PetroleumRegulationProcess,
            { id: string; data: UpdatePetroleumRegulationProcessPayload }
        >({
            query: ({ id, data }) => ({
                url: `/petroleum-regulation-processes/${id}`,
                method: "PUT",
                body: data,
            }),

            transformResponse: (response: any): PetroleumRegulationProcess =>
                response.data,

            invalidatesTags: (_r, _e, { id }) => [
                { type: "PetroleumRegulationProcess", id },
                "PetroleumRegulationProcess",
            ],
        }),

        /** ---------------------------
         * DELETE PROCESS
         * --------------------------- */
        deletePetroleumRegulationProcess: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/petroleum-regulation-processes/${id}`,
                method: "DELETE",
            }),

            transformResponse: (response: any) => response,

            invalidatesTags: ["PetroleumRegulationProcess"],
        }),

        /** ---------------------------
         * TOGGLE PUBLISH PROCESS
         * --------------------------- */
        togglePublishPetroleumRegulationProcess: builder.mutation<
            { message: string; data: PetroleumRegulationProcess },
            string
        >({
            query: (id) => ({
                url: `/petroleum-regulation-processes/${id}/publish`,
                method: "PUT",
            }),

            transformResponse: (response: any) => response,

            invalidatesTags: ["PetroleumRegulationProcess"],
        }),
    }),
});

export const {
    useGetPetroleumRegulationProcessesQuery,
    useGetPetroleumRegulationProcessByIdQuery,
    useCreatePetroleumRegulationProcessMutation,
    useUpdatePetroleumRegulationProcessMutation,
    useDeletePetroleumRegulationProcessMutation,
    useTogglePublishPetroleumRegulationProcessMutation,
} = petroleumRegulationProcessApi;