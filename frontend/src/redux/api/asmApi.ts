import { baseApi } from "../baseApi";
import { ASM, CreateASMPayload, UpdateASMPayload } from "../types/asm";

export const asmApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL ASM
         * --------------------------- */
        getASMs: builder.query<ASM[], void>({
            query: () => "/asm",
            transformResponse: (response: any): ASM[] =>
                response.data ?? [],
            providesTags: ["ASM"],
        }),

        /** ---------------------------
         * GET ASM BY ID
         * --------------------------- */
        getASMById: builder.query<ASM, string>({
            query: (id) => `/asm/${id}`,
            transformResponse: (response: any): ASM =>
                response.data,
            providesTags: (_r, _e, id) => [{ type: "ASM", id }],
        }),

        /** ---------------------------
         * CREATE ASM
         * --------------------------- */
        createASM: builder.mutation<ASM, CreateASMPayload>({
            query: (body) => ({
                url: "/asm",
                method: "POST",
                body,
            }),
            transformResponse: (response: any): ASM =>
                response.data,
            invalidatesTags: ["ASM"],
        }),

        /** ---------------------------
         * UPDATE ASM
         * --------------------------- */
        updateASM: builder.mutation<
            ASM,
            { id: string; data: UpdateASMPayload }
        >({
            query: ({ id, data }) => ({
                url: `/asm/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any): ASM =>
                response.data,
            invalidatesTags: (_r, _e, { id }) => [
                { type: "ASM", id },
                "ASM",
            ],
        }),

        /** ---------------------------
         * DELETE ASM
         * --------------------------- */
        deleteASM: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/asm/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["ASM"],
        }),
    }),
});

/* ================= HOOKS ================= */

export const {
    useGetASMsQuery,
    useGetASMByIdQuery,
    useCreateASMMutation,
    useUpdateASMMutation,
    useDeleteASMMutation,
} = asmApi;