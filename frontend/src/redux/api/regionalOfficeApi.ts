import { baseApi } from "../baseApi";
import {
  RegionalOfficeContactCenter,
  CreateRegionalOfficePayload,
  UpdateRegionalOfficePayload,
} from "../types/regionalOffice";


export const regionalOfficeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** ---------------------------
     * GET ALL REGIONAL OFFICES
     * --------------------------- */
    getRegionalOffices: builder.query<RegionalOfficeContactCenter[], void>({
      query: () => "/regional-offices",
      transformResponse: (response: any): RegionalOfficeContactCenter[] =>
        response.data ?? [],
      providesTags: ["RegionalOffice"],
    }),

    /** ---------------------------
     * GET REGIONAL OFFICE BY ID
     * --------------------------- */
    getRegionalOfficeById: builder.query<RegionalOfficeContactCenter, string>({
      query: (id) => `/regional-offices/${id}`,
      transformResponse: (response: any): RegionalOfficeContactCenter =>
        response.data,
      providesTags: (_r, _e, id) => [{ type: "RegionalOffice", id }],
    }),

    /** ---------------------------
     * CREATE REGIONAL OFFICE
     * --------------------------- */
    createRegionalOffice: builder.mutation<
      RegionalOfficeContactCenter,
      CreateRegionalOfficePayload
    >({
      query: (body) => ({ url: "/regional-offices", method: "POST", body }),
      transformResponse: (response: any): RegionalOfficeContactCenter =>
        response.data,
      invalidatesTags: ["RegionalOffice"],
    }),

    /** ---------------------------
     * UPDATE REGIONAL OFFICE
     * --------------------------- */
    updateRegionalOffice: builder.mutation<
      RegionalOfficeContactCenter,
      { id: string; data: UpdateRegionalOfficePayload }
    >({
      query: ({ id, data }) => ({
        url: `/regional-offices/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any): RegionalOfficeContactCenter =>
        response.data,
      invalidatesTags: (_r, _e, { id }) => [
        { type: "RegionalOffice", id },
        "RegionalOffice",
      ],
    }),

    /** ---------------------------
     * DELETE REGIONAL OFFICE
     * --------------------------- */
    deleteRegionalOffice: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/regional-offices/${id}`, method: "DELETE" }),
      transformResponse: (response: any) => response,
      invalidatesTags: ["RegionalOffice"],
    }),
  }),
});

export const {
  useGetRegionalOfficesQuery,
  useGetRegionalOfficeByIdQuery,
  useCreateRegionalOfficeMutation,
  useUpdateRegionalOfficeMutation,
  useDeleteRegionalOfficeMutation,
} = regionalOfficeApi;
