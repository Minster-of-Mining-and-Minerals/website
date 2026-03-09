import { baseApi } from "../baseApi";
import {
  FederalOffice,
  CreateFederalOfficePayload,
  UpdateFederalOfficePayload,
} from "../types/federalOffice";

export const federalOfficeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** ---------------------------
     * GET ALL FEDERAL OFFICES
     * --------------------------- */
    getFederalOffices: builder.query<FederalOffice[], void>({
      query: () => "/federal-office",
      transformResponse: (response: any): FederalOffice[] =>
        response.data ?? [],
      providesTags: ["FederalOffice"],
    }),

    /** ---------------------------
     * GET FEDERAL OFFICE BY ID
     * --------------------------- */
    getFederalOfficeById: builder.query<FederalOffice, string>({
      query: (id) => `/federal-office/${id}`,
      transformResponse: (response: any): FederalOffice => response.data,
      providesTags: (_r, _e, id) => [{ type: "FederalOffice", id }],
    }),

    /** ---------------------------
     * CREATE FEDERAL OFFICE
     * --------------------------- */
    createFederalOffice: builder.mutation<
      FederalOffice,
      CreateFederalOfficePayload
    >({
      query: (body) => ({ url: "/federal-office", method: "POST", body }),
      transformResponse: (response: any): FederalOffice => response.data,
      invalidatesTags: ["FederalOffice"],
    }),

    /** ---------------------------
     * UPDATE FEDERAL OFFICE
     * --------------------------- */
    updateFederalOffice: builder.mutation<
      FederalOffice,
      { id: string; data: UpdateFederalOfficePayload }
    >({
      query: ({ id, data }) => ({
        url: `/federal-office/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any): FederalOffice => response.data,
      invalidatesTags: (_r, _e, { id }) => [
        { type: "FederalOffice", id },
        "FederalOffice",
      ],
    }),

    /** ---------------------------
     * DELETE FEDERAL OFFICE
     * --------------------------- */
    deleteFederalOffice: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/federal-office/${id}`, method: "DELETE" }),
      transformResponse: (response: any) => response,
      invalidatesTags: ["FederalOffice"],
    }),
  }),
});

export const {
  useGetFederalOfficesQuery,
  useGetFederalOfficeByIdQuery,
  useCreateFederalOfficeMutation,
  useUpdateFederalOfficeMutation,
  useDeleteFederalOfficeMutation,
} = federalOfficeApi;
