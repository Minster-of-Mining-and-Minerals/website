import { baseApi } from "../baseApi";
import {
    News,
    CreateNewsPayload,
    UpdateNewsPayload,
    NewsReactionPayload,
    NewsReadPayload,
    NewsFeedback,
    CreateNewsFeedbackPayload,
    PaginatedNewsQueryArgs,
    PaginatedNewsResponse,
} from "../types/news";

export const newsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /** ---------------------------
         * GET ALL NEWS (flat list)
         * --------------------------- */
        getNews: builder.query<News[], { search?: string; tag?: string; status?: string; isAdmin?: boolean } | void>({
            query: (params) => (params ? { url: "/news", params } : { url: "/news" }),
            transformResponse: (response: any): News[] => response.data ?? [],
            providesTags: ["News"],
        }),

        /** ---------------------------
         * GET PAGINATED NEWS
         * Returns items + pagination metadata. Used by the public news
         * listing page (URL-driven `?page=&tag=`).
         * --------------------------- */
        getPaginatedNews: builder.query<PaginatedNewsResponse, PaginatedNewsQueryArgs | void>({
            query: (args) => {
                const params: Record<string, string | number | boolean> = {
                    page: args?.page ?? 1,
                    limit: args?.limit ?? 9,
                };
                if (args?.search) params.search = args.search;
                if (args?.tag) params.tag = args.tag;
                if (args?.status) params.status = args.status;
                if (args?.isAdmin) params.isAdmin = args.isAdmin;

                return { url: "/news", params };
            },
            transformResponse: (response: any): PaginatedNewsResponse => ({
                items: response.data ?? [],
                pagination: response.pagination ?? {
                    total: response.data?.length ?? 0,
                    page: 1,
                    limit: response.data?.length ?? 0,
                    totalPages: 1,
                },
            }),
            providesTags: ["News"],
        }),

        /** ---------------------------
         * GET NEWS BY ID
         * --------------------------- */
        getNewsById: builder.query<News, string>({
            query: (id) => `/news/${id}`,
            transformResponse: (response: any): News => response.data,
            providesTags: (_r, _e, id) => [{ type: "News", id }],
        }),

        /** ---------------------------
         * CREATE NEWS
         * --------------------------- */
        createNews: builder.mutation<News, CreateNewsPayload>({
            query: (body) => ({ url: "/news", method: "POST", body }),
            transformResponse: (response: any): News => response.data,
            invalidatesTags: ["News"],
        }),

        /** ---------------------------
         * UPDATE NEWS
         * --------------------------- */
        updateNews: builder.mutation<News, { id: string; data: UpdateNewsPayload }>({
            query: ({ id, data }) => ({ url: `/news/${id}`, method: "PUT", body: data }),
            transformResponse: (response: any): News => response.data,
            invalidatesTags: (_r, _e, { id }) => [{ type: "News", id }, "News"],
        }),

        /** ---------------------------
         * DELETE NEWS (soft delete)
         * --------------------------- */
        deleteNews: builder.mutation<{ message: string }, string>({
            query: (id) => ({ url: `/news/${id}`, method: "DELETE" }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["News"],
        }),

        /** ---------------------------
         * REACT TO NEWS
         * --------------------------- */
        reactToNews: builder.mutation<any, NewsReactionPayload>({
            query: (body) => ({ url: "/news/react", method: "POST", body }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ["News"],
        }),

        /** ---------------------------
         * RECORD NEWS READ
         * --------------------------- */
        recordNewsRead: builder.mutation<any, NewsReadPayload>({
            query: (body) => ({ url: "/news/read", method: "POST", body }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ["News"],
        }),

        /** ---------------------------
         * RECORD NEWS FEEDBACK (public)
         * --------------------------- */
        recordNewsFeedback: builder.mutation<NewsFeedback, CreateNewsFeedbackPayload>({
            query: (body) => ({
                url: "/news/feedback",
                method: "POST",
                body,
            }),
            transformResponse: (response: any): NewsFeedback => response.data,
            invalidatesTags: (_r, _e, { news_id }) => [
                { type: "News", id: news_id },
                "News",
            ],
        }),

        /** ---------------------------
         * GET NEWS FEEDBACKS
         * --------------------------- */
        getNewsFeedbacks: builder.query<NewsFeedback[], { news_id: string; isAdmin?: boolean }>({
            query: ({ news_id, isAdmin }) => ({
                url: `/news/feedback/${news_id}`,
                params: { isAdmin }
            }),
            transformResponse: (response: any): NewsFeedback[] => response.data ?? [],
            providesTags: ["News"],
        }),

        /** ---------------------------
         * GET NEWS FEEDBACK COUNT
         * --------------------------- */
        getNewsFeedbackCount: builder.query<{ news_id: string; feedback_count: number }, string>({
            query: (news_id) => `/news/feedback/count/${news_id}`,
            transformResponse: (response: any): { news_id: string; feedback_count: number } => response.data,
            providesTags: ["News"],
        }),

        /** ---------------------------
         * GET ALL FEEDBACKS (ADMIN)
         * --------------------------- */
        getAllNewsFeedbacks: builder.query<NewsFeedback[], void>({
            query: () => "/news/admin/feedback/all",
            transformResponse: (response: any): NewsFeedback[] => response.data ?? [],
            providesTags: ["News"],
        }),

        /** ---------------------------
         * TOGGLE FEEDBACK STATUS
         * --------------------------- */
        toggleFeedbackStatus: builder.mutation<NewsFeedback, string>({
            query: (id) => ({
                url: `/news/admin/feedback/${id}/toggle`,
                method: "PATCH",
            }),
            transformResponse: (response: any): NewsFeedback => response.data,
            invalidatesTags: ["News"],
        }),

        /** ---------------------------
         * DELETE FEEDBACK (ADMIN)
         * --------------------------- */
        deleteFeedback: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/news/admin/feedback/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["News"],
        }),
    }),
});

export const {
    useGetNewsQuery,
    useGetPaginatedNewsQuery,
    useGetNewsByIdQuery,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
    useReactToNewsMutation,
    useRecordNewsReadMutation,
    useRecordNewsFeedbackMutation,
    useGetNewsFeedbackCountQuery,
    useGetNewsFeedbacksQuery,
    useGetAllNewsFeedbacksQuery,
    useToggleFeedbackStatusMutation,
    useDeleteFeedbackMutation,
} = newsApi;
