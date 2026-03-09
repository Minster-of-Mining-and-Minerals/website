import { baseApi } from "../baseApi";
import {
  Region,
  CreateRegionPayload,
  UpdateRegionPayload,
} from "../types/region";

export const regionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** ---------------------------
     * GET ALL REGIONS
     * --------------------------- */
    getRegions: builder.query<Region[], void>({
      query: () => "/region",
      transformResponse: (response: any): Region[] => response.data ?? [],
      providesTags: ["Region"],
    }),

    /** ---------------------------
     * GET REGION BY ID
     * --------------------------- */
    getRegionById: builder.query<Region, string>({
      query: (id) => `/region/${id}`,
      transformResponse: (response: any): Region => response.data,
      providesTags: (_r, _e, id) => [{ type: "Region", id }],
    }),

    /** ---------------------------
     * CREATE REGION
     * --------------------------- */
    createRegion: builder.mutation<Region, CreateRegionPayload>({
      query: (body) => ({ url: "/region", method: "POST", body }),
      transformResponse: (response: any): Region => response.data,
      invalidatesTags: ["Region"],
    }),

    /** ---------------------------
     * UPDATE REGION
     * --------------------------- */
    updateRegion: builder.mutation<
      Region,
      { id: string; data: UpdateRegionPayload }
    >({
      query: ({ id, data }) => ({
        url: `/region/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any): Region => response.data,
      invalidatesTags: (_r, _e, { id }) => [{ type: "Region", id }, "Region"],
    }),

    /** ---------------------------
     * DELETE REGION
     * --------------------------- */
    deleteRegion: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/region/${id}`, method: "DELETE" }),
      transformResponse: (response: any) => response,
      invalidatesTags: ["Region"],
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useGetRegionByIdQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} = regionApi;
