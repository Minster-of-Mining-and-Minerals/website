import { baseApi } from "../baseApi";
import { Message, CreateMessagePayload } from "../types/message";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** ---------------------------
     * SEND MESSAGE (CONTACT FORM)
     * --------------------------- */
    createMessage: builder.mutation<Message, CreateMessagePayload>({
      query: (body) => ({
        url: "/message",
        method: "POST",
        body,
      }),
      transformResponse: (response: any): Message => response.data,
      invalidatesTags: ["Message"],
    }),

    /** ---------------------------
     * GET ALL MESSAGES
     * --------------------------- */
    getMessages: builder.query<Message[], void>({
      query: () => "/message",
      transformResponse: (response: any): Message[] => response.data ?? [],
      providesTags: ["Message"],
    }),

    /** ---------------------------
     * GET MESSAGE BY ID
     * --------------------------- */
    getMessageById: builder.query<Message, string>({
      query: (id) => `/message/${id}`,
      transformResponse: (response: any): Message => response.data,
      providesTags: (_r, _e, id) => [{ type: "Message", id }],
    }),

    /** ---------------------------
     * DELETE MESSAGE
     * --------------------------- */
    deleteMessage: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/message/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response,
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useDeleteMessageMutation,
} = messageApi;
