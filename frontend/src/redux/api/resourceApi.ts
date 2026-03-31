import { baseApi } from "../baseApi";
import {
    Resource,
    CreateResourcePayload,
    UpdateResourcePayload,
    ResourceAccessPayload,
} from "../types/resource";

export const resourceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** ---------------------------
         * GET ALL RESOURCES
         * --------------------------- */
        getResources: builder.query<
            Resource[],
            { search?: string; sector?: string; isAdmin?: boolean } | void
        >({
            query: (params) =>
                params ? { url: "/resources", params } : { url: "/resources" },
            transformResponse: (response: any): Resource[] =>
                response.data ?? [],
            providesTags: ["Resource"],
        }),

        /** ---------------------------
         * GET RESOURCE BY ID
         * --------------------------- */
        getResourceById: builder.query<Resource, string>({
            query: (id) => `/resources/${id}`,
            transformResponse: (response: any): Resource =>
                response.data,
            providesTags: (_r, _e, id) => [{ type: "Resource", id }],
        }),

        /** ---------------------------
         * CREATE RESOURCE
         * --------------------------- */
        createResource: builder.mutation<Resource, CreateResourcePayload>({
            query: (body) => ({
                url: "/resources",
                method: "POST",
                body,
            }),
            transformResponse: (response: any): Resource =>
                response.data,
            invalidatesTags: ["Resource"],
        }),

        /** ---------------------------
         * UPDATE RESOURCE
         * --------------------------- */
        updateResource: builder.mutation<
            Resource,
            { id: string; data: UpdateResourcePayload }
        >({
            query: ({ id, data }) => ({
                url: `/resources/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any): Resource =>
                response.data,
            invalidatesTags: (_r, _e, { id }) => [
                { type: "Resource", id },
                "Resource",
            ],
        }),

        /** ---------------------------
         * DELETE RESOURCE
         * --------------------------- */
        deleteResource: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/resources/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["Resource"],
        }),

        /** ---------------------------
         * RECORD RESOURCE ACCESS (DOWNLOAD / VIEW)
         * --------------------------- */
        recordResourceAccess: builder.mutation<any, ResourceAccessPayload>({
            query: (body) => ({
                url: "/resources/access",
                method: "POST",
                body,
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ["Resource"],
        }),

        /** ---------------------------
         * GET RESOURCE ACCESS COUNT
         * --------------------------- */
        getResourceAccessCount: builder.query<
            { resource_id: string; access_count: number },
            string
        >({
            query: (resource_id) =>
                `/resources/access/count/${resource_id}`,
            transformResponse: (response: any) => response.data,
            providesTags: ["Resource"],
        }),
    }),
});

export const {
    useGetResourcesQuery,
    useGetResourceByIdQuery,
    useCreateResourceMutation,
    useUpdateResourceMutation,
    useDeleteResourceMutation,
    useRecordResourceAccessMutation,
    useGetResourceAccessCountQuery,
} = resourceApi;