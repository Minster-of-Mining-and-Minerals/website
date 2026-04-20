import { baseApi } from "../baseApi";
import {
  EventCategory,
  CreateEventCategoryPayload,
  ReplaceEventCategoryPayload,
  UpdateEventCategoryPayload,
} from "../types/eventCategory";

export const eventCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===========================
    // GET ALL
    // ===========================
    getEventCategories: builder.query<EventCategory[], void>({
      query: () => "/event-categories",
      transformResponse: (res: any): EventCategory[] => res.data ?? [],
      providesTags: ["EventCategory"],
    }),

    // ===========================
    // GET BY EVENT
    // ===========================
    getCategoriesByEvent: builder.query<EventCategory[], string>({
      query: (event_id) => `/event-categories/${event_id}`,
      transformResponse: (res: any): EventCategory[] => res.data ?? [],
      providesTags: ["EventCategory"],
    }),

    // ===========================
    // CREATE
    // ===========================
    createEventCategory: builder.mutation<
      EventCategory[],
      CreateEventCategoryPayload
    >({
      query: (body) => ({
        url: "/event-categories",
        method: "POST",
        body,
      }),
      transformResponse: (res: any): EventCategory[] => res.data,
      invalidatesTags: ["EventCategory", "Event"],
    }),

    // ===========================
    // UPDATE
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
      invalidatesTags: ["EventCategory", "Event"],
    }),

    // ===========================
    // DELETE
    // ===========================
    deleteEventCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/event-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventCategory", "Event"],
    }),

    // ===========================
    // REPLACE (IMPORTANT)
    // ===========================
    replaceEventCategories: builder.mutation<
      EventCategory[],
      ReplaceEventCategoryPayload
    >({
      query: (body) => ({
        url: "/event-categories/replace",
        method: "POST",
        body,
      }),
      transformResponse: (res: any): EventCategory[] => res.data,
      invalidatesTags: ["EventCategory", "Event"],
    }),
  }),
});

export const {
  useGetEventCategoriesQuery,
  useGetCategoriesByEventQuery,
  useCreateEventCategoryMutation,
  useUpdateEventCategoryMutation,
  useDeleteEventCategoryMutation,
  useReplaceEventCategoriesMutation,
} = eventCategoryApi;
