import { baseApi } from "../baseApi";
import {
    Service,
    CreateServicePayload,
    UpdateServicePayload,
} from "../types/service";

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /** ---------------------------
         * GET ALL SERVICES
         * --------------------------- */
        getServices: builder.query<Service[], void>({
            query: () => ({ url: "/services" }),
            transformResponse: (response: any): Service[] => response.data ?? [],
            providesTags: ["Service"],
        }),

        /** ---------------------------
         * GET SERVICE BY ID
         * --------------------------- */
        getServiceById: builder.query<Service, string>({
            query: (id) => `/services/${id}`,
            transformResponse: (response: any): Service => response.data,
            providesTags: (_r, _e, id) => [{ type: "Service", id }],
        }),

        /** ---------------------------
         * CREATE SERVICE
         * --------------------------- */
        createService: builder.mutation<Service, CreateServicePayload>({
            query: (body) => ({
                url: "/services",
                method: "POST",
                body,
            }),
            transformResponse: (response: any): Service => response.data,
            invalidatesTags: ["Service"],
        }),

        /** ---------------------------
         * UPDATE SERVICE
         * --------------------------- */
        updateService: builder.mutation<
            Service,
            { id: string; data: UpdateServicePayload }
        >({
            query: ({ id, data }) => ({
                url: `/services/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any): Service => response.data,
            invalidatesTags: (_r, _e, { id }) => [{ type: "Service", id }, "Service"],
        }),

        /** ---------------------------
         * DELETE SERVICE
         * --------------------------- */
        deleteService: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/services/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
            invalidatesTags: ["Service"],
        }),
    }),
});

export const {
    useGetServicesQuery,
    useGetServiceByIdQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = serviceApi;