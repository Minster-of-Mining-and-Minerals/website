import { baseApi } from "../baseApi";
import {
  Footer,
  FooterSection,
  CreateFooterPayload,
  UpdateFooterPayload,
  CreateFooterSectionPayload,
} from "../types/footer";

export const footerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** ---------------------------
     * GET ALL FOOTERS
     * --------------------------- */
    getFooters: builder.query<Footer[], void>({
      query: () => "/footer",
      transformResponse: (response: any): Footer[] => response.data ?? [],
      providesTags: ["Footer"],
    }),

    /** ---------------------------
     * GET FOOTER BY ID
     * --------------------------- */
    getFooterById: builder.query<Footer, string>({
      query: (id) => `/footer/${id}`,
      transformResponse: (response: any): Footer => response.data,
      providesTags: (_r, _e, id) => [{ type: "Footer", id }],
    }),

    /** ---------------------------
     * CREATE FOOTER
     * --------------------------- */
    createFooter: builder.mutation<Footer, CreateFooterPayload>({
      query: (body) => ({
        url: "/footer",
        method: "POST",
        body,
      }),
      transformResponse: (response: any): Footer => response.data,
      invalidatesTags: ["Footer"],
    }),

    /** ---------------------------
     * UPDATE FOOTER
     * --------------------------- */
    updateFooter: builder.mutation<
      Footer,
      { id: string; data: UpdateFooterPayload }
    >({
      query: ({ id, data }) => ({
        url: `/footer/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any): Footer => response.data,
      invalidatesTags: (_r, _e, { id }) => [{ type: "Footer", id }, "Footer"],
    }),

    /** ---------------------------
     * DELETE FOOTER
     * --------------------------- */
    deleteFooter: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/footer/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response,
      invalidatesTags: ["Footer"],
    }),

    /** ---------------------------
     * CREATE FOOTER SECTION
     * --------------------------- */
    createFooterSection: builder.mutation<
      FooterSection,
      CreateFooterSectionPayload
    >({
      query: (body) => ({
        url: "/footer/section",
        method: "POST",
        body,
      }),
      transformResponse: (response: any): FooterSection => response.data,
      invalidatesTags: ["Footer"],
    }),

    /** ---------------------------
     * GET FOOTER SECTIONS BY FOOTER
     * --------------------------- */
    getFooterSections: builder.query<FooterSection[], string>({
      query: (footer_id) => `/footer/section/${footer_id}`,
      transformResponse: (response: any): FooterSection[] =>
        response.data ?? [],
      providesTags: ["Footer"],
    }),
  }),
});

export const {
  useGetFootersQuery,
  useGetFooterByIdQuery,
  useCreateFooterMutation,
  useUpdateFooterMutation,
  useDeleteFooterMutation,
  useCreateFooterSectionMutation,
  useGetFooterSectionsQuery,
} = footerApi;
