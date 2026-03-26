// strategyApi.ts
import { baseApi } from "../baseApi";
import {
  Strategy,
  CreateStrategyPayload,
  UpdateStrategyPayload,
} from "../types/strategy";

export const strategyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** ---------------------------
     * GET ALL STRATEGIES
     * --------------------------- */
    getStrategies: builder.query<Strategy[], void>({
      query: () => "/strategy",
      transformResponse: (response: any): Strategy[] => response.data ?? [],
      providesTags: ["Strategy"],
    }),

    /** ---------------------------
     * GET STRATEGY BY ID
     * --------------------------- */
    getStrategyById: builder.query<Strategy, string>({
      query: (id) => `/strategy/${id}`,
      transformResponse: (response: any): Strategy => response.data,
      providesTags: (_r, _e, id) => [{ type: "Strategy", id }],
    }),

    /** ---------------------------
     * CREATE STRATEGY
     * --------------------------- */
    createStrategy: builder.mutation<Strategy, CreateStrategyPayload>({
      query: (body) => ({
        url: "/strategy",
        method: "POST",
        body,
      }),
      transformResponse: (response: any): Strategy => response.data,
      invalidatesTags: ["Strategy"],
    }),

    /** ---------------------------
     * UPDATE STRATEGY
     * --------------------------- */
    updateStrategy: builder.mutation<
      Strategy,
      { id: string; data: UpdateStrategyPayload }
    >({
      query: ({ id, data }) => ({
        url: `/strategy/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any): Strategy => response.data,
      invalidatesTags: (_r, _e, { id }) => [
        { type: "Strategy", id },
        "Strategy",
      ],
    }),

    /** ---------------------------
     * DELETE STRATEGY
     * --------------------------- */
    deleteStrategy: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/strategy/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response,
      invalidatesTags: ["Strategy"],
    }),
  }),
});

export const {
  useGetStrategiesQuery,
  useGetStrategyByIdQuery,
  useCreateStrategyMutation,
  useUpdateStrategyMutation,
  useDeleteStrategyMutation,
} = strategyApi;
