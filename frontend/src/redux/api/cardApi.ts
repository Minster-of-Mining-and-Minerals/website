import { baseApi } from "../baseApi";
import {
    Card,
    CreateCardPayload,
    UpdateCardPayload,
} from "../types/card";

export const cardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL CARDS
         * --------------------------- */
        getCards: builder.query<Card[], void>({
            query: () => ({ url: "/cards" }),
            transformResponse: (response: any): Card[] => response.data ?? [],
            providesTags: ["Card"],
        }),

        /** ---------------------------
         * GET CARD BY ID
         * --------------------------- */
        getCardById: builder.query<Card, string>({
            query: (id) => `/cards/${id}`,
            transformResponse: (response: any): Card => response.data,
            providesTags: (_r, _e, id) => [{ type: "Card", id }],
        }),

        /** ---------------------------
         * CREATE CARD
         * --------------------------- */
        createCard: builder.mutation<Card, CreateCardPayload>({
            query: (body) => ({
                url: "/cards",
                method: "POST",
                body,
            }),
            transformResponse: (response: any): Card => response.data,
            invalidatesTags: ["Card"],
        }),

        /** ---------------------------
         * UPDATE CARD
         * --------------------------- */
        updateCard: builder.mutation<
            Card,
            { id: string; data: UpdateCardPayload }
        >({
            query: ({ id, data }) => ({
                url: `/cards/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any): Card => response.data,
            invalidatesTags: (_r, _e, { id }) => [
                { type: "Card", id },
                "Card",
            ],
        }),

        /** ---------------------------
         * DELETE CARD (SOFT DELETE)
         * --------------------------- */
        deleteCard: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/cards/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["Card"],
        }),

    }),
});

export const {
    useGetCardsQuery,
    useGetCardByIdQuery,
    useCreateCardMutation,
    useUpdateCardMutation,
    useDeleteCardMutation,
} = cardApi;