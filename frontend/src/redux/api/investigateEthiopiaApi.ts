import { baseApi } from "../baseApi";
import {
    InvestigateEthiopia,
    CreateInvestigateEthiopiaPayload,
    UpdateInvestigateEthiopiaPayload,
} from "../types/investigateEthiopia";

export const investigateEthiopiaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL
         * --------------------------- */
        getInvestigateEthiopias: builder.query<InvestigateEthiopia[], void>({
            query: () => "/investigate-ethiopia",
            transformResponse: (response: any): InvestigateEthiopia[] =>
                response.data ?? [],
            providesTags: ["InvestigateEthiopia"],
        }),

        /** ---------------------------
         * GET BY ID
         * --------------------------- */
        getInvestigateEthiopiaById: builder.query<InvestigateEthiopia, string>({
            query: (id) => `/investigate-ethiopia/${id}`,
            transformResponse: (response: any): InvestigateEthiopia =>
                response.data,
            providesTags: (_r, _e, id) => [
                { type: "InvestigateEthiopia", id },
            ],
        }),

        /** ---------------------------
         * CREATE
         * --------------------------- */
        createInvestigateEthiopia: builder.mutation<
            InvestigateEthiopia,
            CreateInvestigateEthiopiaPayload
        >({
            query: (body) => ({
                url: "/investigate-ethiopia",
                method: "POST",
                body,
            }),
            transformResponse: (response: any): InvestigateEthiopia =>
                response.data,
            invalidatesTags: ["InvestigateEthiopia"],
        }),

        /** ---------------------------
         * UPDATE
         * --------------------------- */
        updateInvestigateEthiopia: builder.mutation<
            InvestigateEthiopia,
            { id: string; data: UpdateInvestigateEthiopiaPayload }
        >({
            query: ({ id, data }) => ({
                url: `/investigate-ethiopia/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any): InvestigateEthiopia =>
                response.data,
            invalidatesTags: (_r, _e, { id }) => [
                { type: "InvestigateEthiopia", id },
                "InvestigateEthiopia",
            ],
        }),

        /** ---------------------------
         * DELETE
         * --------------------------- */
        deleteInvestigateEthiopia: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/investigate-ethiopia/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["InvestigateEthiopia"],
        }),
    }),
});

/* ================= HOOKS ================= */

export const {
    useGetInvestigateEthiopiasQuery,
    useGetInvestigateEthiopiaByIdQuery,
    useCreateInvestigateEthiopiaMutation,
    useUpdateInvestigateEthiopiaMutation,
    useDeleteInvestigateEthiopiaMutation,
} = investigateEthiopiaApi;