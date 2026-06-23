import { baseApi } from "../baseApi";
import {
  Tender,
  CreateTenderPayload,
  UpdateTenderPayload,
} from "../types/tender";

export const tenderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTenders: builder.query<
      Tender[],
      { search?: string; status?: string; isAdmin?: boolean } | void
    >({
      query: (params) =>
        params ? { url: "/tenders", params } : { url: "/tenders" },
      transformResponse: (res: any): Tender[] => res.data ?? [],
      providesTags: ["Tender"],
    }),

    getTenderById: builder.query<Tender, { id: string; isAdmin?: boolean }>({
      query: ({ id, isAdmin }) =>
        isAdmin
          ? { url: `/tenders/${id}`, params: { isAdmin: "true" } }
          : `/tenders/${id}`,
      transformResponse: (res: any): Tender => res.data,
      providesTags: (_r, _e, { id }) => [{ type: "Tender", id }],
    }),

    createTender: builder.mutation<Tender, CreateTenderPayload>({
      query: (body) => ({ url: "/tenders", method: "POST", body }),
      transformResponse: (res: any): Tender => res.data,
      invalidatesTags: ["Tender"],
    }),

    updateTender: builder.mutation<
      Tender,
      { id: string; data: UpdateTenderPayload }
    >({
      query: ({ id, data }) => ({
        url: `/tenders/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (res: any): Tender => res.data,
      invalidatesTags: (_r, _e, { id }) => [{ type: "Tender", id }, "Tender"],
    }),

    deleteTender: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/tenders/${id}`, method: "DELETE" }),
      invalidatesTags: ["Tender"],
    }),

    publishTender: builder.mutation<Tender, string>({
      query: (id) => ({ url: `/tenders/${id}/publish`, method: "PATCH" }),
      transformResponse: (res: any): Tender => res.data,
      invalidatesTags: ["Tender"],
    }),

    unpublishTender: builder.mutation<Tender, string>({
      query: (id) => ({ url: `/tenders/${id}/unpublish`, method: "PATCH" }),
      transformResponse: (res: any): Tender => res.data,
      invalidatesTags: ["Tender"],
    }),

    closeTender: builder.mutation<Tender, string>({
      query: (id) => ({ url: `/tenders/${id}/close`, method: "PATCH" }),
      transformResponse: (res: any): Tender => res.data,
      invalidatesTags: ["Tender"],
    }),
  }),
});

export const {
  useGetTendersQuery,
  useGetTenderByIdQuery,
  useCreateTenderMutation,
  useUpdateTenderMutation,
  useDeleteTenderMutation,
  usePublishTenderMutation,
  useUnpublishTenderMutation,
  useCloseTenderMutation,
} = tenderApi;
