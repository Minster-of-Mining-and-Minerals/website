import { baseApi } from "../baseApi";
import { Tag, CreateTagPayload, UpdateTagPayload } from "../types/tag";

export const tagApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /** ---------------------------
         * GET ALL TAGS
         * --------------------------- */
        getTags: builder.query<Tag[], void>({
            query: () => "/tags",
            transformResponse: (response: any): Tag[] => response.data ?? [],
            providesTags: ["Tag"],
        }),

        /** ---------------------------
         * GET TAG BY ID
         * --------------------------- */
        getTagById: builder.query<Tag, string>({
            query: (id) => `/tags/${id}`,
            transformResponse: (response: any): Tag => response.data,
            providesTags: (_r, _e, id) => [{ type: "Tag", id }],
        }),

        /** ---------------------------
         * CREATE TAG
         * --------------------------- */
        createTag: builder.mutation<Tag, CreateTagPayload>({
            query: (body) => ({ url: "/tags", method: "POST", body }),
            transformResponse: (response: any): Tag => response.data,
            invalidatesTags: ["Tag"],
        }),

        /** ---------------------------
         * UPDATE TAG
         * --------------------------- */
        updateTag: builder.mutation<Tag, { id: string; data: UpdateTagPayload }>({
            query: ({ id, data }) => ({ url: `/tags/${id}`, method: "PUT", body: data }),
            transformResponse: (response: any): Tag => response.data,
            invalidatesTags: (_r, _e, { id }) => [{ type: "Tag", id }, "Tag"],
        }),

        /** ---------------------------
         * DELETE TAG
         * --------------------------- */
        deleteTag: builder.mutation<{ message: string }, string>({
            query: (id) => ({ url: `/tags/${id}`, method: "DELETE" }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["Tag"],
        }),
    }),
});

export const {
    useGetTagsQuery,
    useGetTagByIdQuery,
    useCreateTagMutation,
    useUpdateTagMutation,
    useDeleteTagMutation,
} = tagApi;
