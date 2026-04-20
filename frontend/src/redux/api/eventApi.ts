import { baseApi } from "../baseApi";
import { Event, CreateEventPayload, UpdateEventPayload } from "../types/event";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===========================
    // GET ALL EVENTS
    // ===========================
    getEvents: builder.query<
      Event[],
      { search?: string; status?: string; isAdmin?: boolean } | void
    >({
      query: (params) =>
        params ? { url: "/events", params } : { url: "/events" },
      transformResponse: (res: any): Event[] => res.data ?? [],
      providesTags: ["Event"],
    }),

    // ===========================
    // GET EVENT BY ID
    // ===========================
    getEventById: builder.query<Event, string>({
      query: (id) => `/events/${id}`,
      transformResponse: (res: any): Event => res.data,
      providesTags: (_r, _e, id) => [{ type: "Event", id }],
    }),

    // ===========================
    // CREATE EVENT
    // ===========================
    createEvent: builder.mutation<Event, CreateEventPayload>({
      query: (body) => ({
        url: "/events",
        method: "POST",
        body,
      }),
      transformResponse: (res: any): Event => res.data,
      invalidatesTags: ["Event"],
    }),

    // ===========================
    // UPDATE EVENT
    // ===========================
    updateEvent: builder.mutation<
      Event,
      { id: string; data: UpdateEventPayload }
    >({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (res: any): Event => res.data,
      invalidatesTags: (_r, _e, { id }) => [{ type: "Event", id }, "Event"],
    }),

    // ===========================
    // DELETE EVENT
    // ===========================
    deleteEvent: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),

    // ===========================
    // APPROVE EVENT
    // ===========================
    approveEvent: builder.mutation<Event, string>({
      query: (id) => ({
        url: `/events/${id}/approve`,
        method: "PATCH",
      }),
      transformResponse: (res: any): Event => res.data,
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useApproveEventMutation,
} = eventApi;
