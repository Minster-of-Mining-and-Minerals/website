import { baseApi } from "../baseApi";
import {
    Gamestone,
    CreateGamestonePayload,
    UpdateGamestonePayload,
} from "../types/gamestone";

export const gamestoneApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL GAMESTONES
         * --------------------------- */
        getGamestones: builder.query<
            Gamestone[],
            { search?: string; parent_id?: string } | void
        >({
            query: (params) =>
                params
                    ? { url: "/gamestones", params }
                    : { url: "/gamestones" },

            transformResponse: (response: any): Gamestone[] =>
                response.data ?? [],

            providesTags: ["Gamestone"],
        }),

        /** ---------------------------
         * GET GAMESTONE BY ID
         * --------------------------- */
        getGamestoneById: builder.query<Gamestone, string>({
            query: (id) => `/gamestones/${id}`,

            transformResponse: (response: any): Gamestone =>
                response.data,

            providesTags: (_r, _e, id) => [{ type: "Gamestone", id }],
        }),

        /** ---------------------------
         * CREATE GAMESTONE
         * --------------------------- */
        createGamestone: builder.mutation<
            Gamestone,
            CreateGamestonePayload
        >({
            query: (body) => ({
                url: "/gamestones",
                method: "POST",
                body,
            }),

            transformResponse: (response: any): Gamestone =>
                response.data,

            invalidatesTags: ["Gamestone"],
        }),

        /** ---------------------------
         * UPDATE GAMESTONE
         * --------------------------- */
        updateGamestone: builder.mutation<
            Gamestone,
            { id: string; data: UpdateGamestonePayload }
        >({
            query: ({ id, data }) => ({
                url: `/gamestones/${id}`,
                method: "PUT",
                body: data,
            }),

            transformResponse: (response: any): Gamestone =>
                response.data,

            invalidatesTags: (_r, _e, { id }) => [
                { type: "Gamestone", id },
                "Gamestone",
            ],
        }),

        /** ---------------------------
         * DELETE GAMESTONE (soft delete)
         * --------------------------- */
        deleteGamestone: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/gamestones/${id}`,
                method: "DELETE",
            }),

            transformResponse: (response: any) => response,

            invalidatesTags: ["Gamestone"],
        }),
    }),
});

export const {
    useGetGamestonesQuery,
    useGetGamestoneByIdQuery,
    useCreateGamestoneMutation,
    useUpdateGamestoneMutation,
    useDeleteGamestoneMutation,
} = gamestoneApi;