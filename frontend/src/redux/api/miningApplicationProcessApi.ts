import { baseApi } from "../baseApi";
import {
    CreateMiningApplicationProcessPayload,
    MiningApplicationProcess,
    UpdateMiningApplicationProcessPayload,
    TogglePublishPayload,
} from "../types/miningApplicationProcess";

export const miningApplicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL
         * --------------------------- */
        getMiningApplicationProcesses: builder.query<
            MiningApplicationProcess[],
            { published?: boolean } | void
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params && params.published !== undefined) {
                    queryParams.append('published', String(params.published));
                }
                const queryString = queryParams.toString();
                return `/mining-application-processes${queryString ? `?${queryString}` : ''}`;
            },
            transformResponse: (response: any): MiningApplicationProcess[] =>
                response.data ?? [],
            providesTags: ["MiningApplicationProcess"],
        }),

        /** ---------------------------
         * GET BY ID
         * --------------------------- */
        getMiningApplicationProcessById: builder.query<
            MiningApplicationProcess,
            string
        >({
            query: (id) => `/mining-application-processes/${id}`,
            transformResponse: (response: any): MiningApplicationProcess =>
                response.data,
            providesTags: (_r, _e, id) => [
                { type: "MiningApplicationProcess", id },
            ],
        }),

        /** ---------------------------
         * CREATE
         * --------------------------- */
        createMiningApplicationProcess: builder.mutation<
            MiningApplicationProcess,
            CreateMiningApplicationProcessPayload
        >({
            query: (body) => ({
                url: "/mining-application-processes",
                method: "POST",
                body,
            }),
            transformResponse: (response: any): MiningApplicationProcess =>
                response.data,
            invalidatesTags: ["MiningApplicationProcess"],
        }),

        /** ---------------------------
         * UPDATE
         * --------------------------- */
        updateMiningApplicationProcess: builder.mutation<
            MiningApplicationProcess,
            { id: string; data: UpdateMiningApplicationProcessPayload }
        >({
            query: ({ id, data }) => ({
                url: `/mining-application-processes/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any): MiningApplicationProcess =>
                response.data,
            invalidatesTags: (_r, _e, { id }) => [
                { type: "MiningApplicationProcess", id },
                "MiningApplicationProcess",
            ],
        }),

        /** ---------------------------
         * DELETE
         * --------------------------- */
        deleteMiningApplicationProcess: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/mining-application-processes/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["MiningApplicationProcess"],
        }),

        /** ---------------------------
         * TOGGLE PUBLISH STATUS
         * --------------------------- */
        togglePublishStatus: builder.mutation<
            { success: boolean; message: string; data: { publish: boolean } },
            { id: string; data: TogglePublishPayload }
        >({
            query: ({ id, data }) => ({
                url: `/mining-application-processes/${id}/publish`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_r, _e, { id }) => [
                { type: "MiningApplicationProcess", id },
                "MiningApplicationProcess",
            ],
        }),
    }),
});

/* ================= HOOKS ================= */

export const {
    useGetMiningApplicationProcessesQuery,
    useGetMiningApplicationProcessByIdQuery,
    useCreateMiningApplicationProcessMutation,
    useUpdateMiningApplicationProcessMutation,
    useDeleteMiningApplicationProcessMutation,
    useTogglePublishStatusMutation,
} = miningApplicationApi;