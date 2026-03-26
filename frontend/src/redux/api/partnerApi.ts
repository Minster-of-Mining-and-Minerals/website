import { baseApi } from "../baseApi";
import {
    Partner,
    CreatePartnerPayload,
    UpdatePartnerPayload,
} from "../types/partner";

export const partnerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ================= GET ALL =================
        getPartners: builder.query<Partner[], void>({
            query: () => ({ url: "/partners" }),
            transformResponse: (res: any) => res.data ?? [],
            providesTags: ["Partner"],
        }),

        // ================= GET BY ID =================
        getPartnerById: builder.query<Partner, string>({
            query: (id) => `/partners/${id}`,
            transformResponse: (res: any) => res.data,
            providesTags: (_r, _e, id) => [{ type: "Partner", id }],
        }),

        // ================= CREATE =================
        createPartner: builder.mutation<Partner, CreatePartnerPayload>({
            query: (body) => ({
                url: "/partners",
                method: "POST",
                body,
            }),
            transformResponse: (res: any) => res.data,
            invalidatesTags: ["Partner"],
        }),

        // ================= UPDATE =================
        updatePartner: builder.mutation<
            Partner,
            { id: string; data: UpdatePartnerPayload }
        >({
            query: ({ id, data }) => ({
                url: `/partners/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (res: any) => res.data,
            invalidatesTags: (_r, _e, { id }) => [
                { type: "Partner", id },
                "Partner",
            ],
        }),

        // ================= DELETE =================
        deletePartner: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/partners/${id}`,
                method: "DELETE",
            }),
            transformResponse: (res: any) => res,
            invalidatesTags: ["Partner"],
        }),
    }),
});

export const {
    useGetPartnersQuery,
    useGetPartnerByIdQuery,
    useCreatePartnerMutation,
    useUpdatePartnerMutation,
    useDeletePartnerMutation,
} = partnerApi;