import { baseApi } from "../baseApi";
import {
  EventCategory,
  CreateEventCategoryPayload,
  UpdateEventCategoryPayload,
} from "../types/eventCategory";

export const eventCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===========================
    // GET ALL (standalone tags)
    // ===========================
    getEventCategories: builder.query<EventCategory[], void>({
      query: () => "/event-categories",
      transformResponse: (res: any): EventCategory[] => res.data ?? [],
      providesTags: ["EventCategory"],
    }),

    // ===========================
    // CREATE (standalone tag)
    // ===========================
    createEventCategory: builder.mutation<EventCategory, CreateEventCategoryPayload>({
      query: (body) => ({
        url: "/event-categories",
        method: "POST",
        body,
      }),
      transformResponse: (res: any): EventCategory => res.data,
      invalidatesTags: ["EventCategory"],
    }),

    // ===========================
    // UPDATE name
    // ===========================
    updateEventCategory: builder.mutation<
      EventCategory,
      { id: string; data: UpdateEventCategoryPayload }
    >({
      query: ({ id, data }) => ({
        url: `/event-categories/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (res: any): EventCategory => res.data,
      invalidatesTags: ["EventCategory"],
    }),

    // ===========================
    // DELETE
    // ===========================
    deleteEventCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/event-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventCategory"],
    }),
  }),
});

export const {
  useGetEventCategoriesQuery,
  useCreateEventCategoryMutation,
  useUpdateEventCategoryMutation,
  useDeleteEventCategoryMutation,
} = eventCategoryApi;
