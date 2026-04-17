import { baseApi } from "../baseApi";
import {
    CreateMiningRegulationProcessPayload,
    MiningRegulationProcess,
    UpdateMiningRegulationProcessPayload,
    TogglePublishPayload,
} from "../types/miningRegulationProcess";

export const miningRegulationProcessApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL
         * --------------------------- */
        getMiningRegulationProcesses: builder.query<
            MiningRegulationProcess[],
            { published?: boolean; search?: string } | void
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params) {
                    if (params.published !== undefined) {
                        queryParams.append('published', String(params.published));
                    }
                    if (params.search) {
                        queryParams.append('search', params.search);
                    }
                }
                const queryString = queryParams.toString();
                return `/mining-regulation-processes${queryString ? `?${queryString}` : ''}`;
            },
            transformResponse: (response: any): MiningRegulationProcess[] =>
                response.data ?? [],
            providesTags: ["MiningRegulationProcess"],
        }),

        /** ---------------------------
         * GET BY ID
         * --------------------------- */
        getMiningRegulationProcessById: builder.query<
            MiningRegulationProcess,
            string
        >({
            query: (id) => `/mining-regulation-processes/${id}`,
            transformResponse: (response: any): MiningRegulationProcess =>
                response.data,
            providesTags: (_r, _e, id) => [
                { type: "MiningRegulationProcess", id },
            ],
        }),

        /** ---------------------------
         * CREATE
         * --------------------------- */
        createMiningRegulationProcess: builder.mutation<
            MiningRegulationProcess,
            CreateMiningRegulationProcessPayload
        >({
            query: (body) => ({
                url: "/mining-regulation-processes",
                method: "POST",
                body,
            }),
            transformResponse: (response: any): MiningRegulationProcess =>
                response.data,
            invalidatesTags: ["MiningRegulationProcess"],
        }),

        /** ---------------------------
         * UPDATE
         * --------------------------- */
        updateMiningRegulationProcess: builder.mutation<
            MiningRegulationProcess,
            { id: string; data: UpdateMiningRegulationProcessPayload }
        >({
            query: ({ id, data }) => ({
                url: `/mining-regulation-processes/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any): MiningRegulationProcess =>
                response.data,
            invalidatesTags: (_r, _e, { id }) => [
                { type: "MiningRegulationProcess", id },
                "MiningRegulationProcess",
            ],
        }),

        /** ---------------------------
         * DELETE
         * --------------------------- */
        deleteMiningRegulationProcess: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/mining-regulation-processes/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["MiningRegulationProcess"],
        }),

        /** ---------------------------
         * TOGGLE PUBLISH STATUS
         * --------------------------- */
        togglePublishStatus: builder.mutation<
            { success: boolean; message: string; data: { publish: boolean } },
            { id: string; data: TogglePublishPayload }
        >({
            query: ({ id, data }) => ({
                url: `/mining-regulation-processes/${id}/publish`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_r, _e, { id }) => [
                { type: "MiningRegulationProcess", id },
                "MiningRegulationProcess",
            ],
        }),
    }),
});

/* ================= HOOKS ================= */

export const {
    useGetMiningRegulationProcessesQuery,
    useGetMiningRegulationProcessByIdQuery,
    useCreateMiningRegulationProcessMutation,
    useUpdateMiningRegulationProcessMutation,
    useDeleteMiningRegulationProcessMutation,
    useTogglePublishStatusMutation,
} = miningRegulationProcessApi;