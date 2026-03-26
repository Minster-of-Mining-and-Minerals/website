import { baseApi } from "../baseApi";
import {
  SocialMedia,
  CreateSocialMediaPayload,
  UpdateSocialMediaPayload,
} from "../types/socialMedia";

export const socialMediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** ---------------------------
     * GET ALL SOCIAL MEDIAS
     * --------------------------- */
    getSocialMedias: builder.query<SocialMedia[], void>({
      query: () => "/social-media",
      transformResponse: (response: any): SocialMedia[] => response.data ?? [],
      providesTags: ["SocialMedia"],
    }),

    /** ---------------------------
     * GET SOCIAL MEDIA BY ID
     * --------------------------- */
    getSocialMediaById: builder.query<SocialMedia, string>({
      query: (id) => `/social-media/${id}`,
      transformResponse: (response: any): SocialMedia => response.data,
      providesTags: (_r, _e, id) => [{ type: "SocialMedia", id }],
    }),

    /** ---------------------------
     * CREATE SOCIAL MEDIA
     * --------------------------- */
    createSocialMedia: builder.mutation<SocialMedia, CreateSocialMediaPayload>({
      query: (body) => ({ url: "/social-media", method: "POST", body }),
      transformResponse: (response: any): SocialMedia => response.data,
      invalidatesTags: ["SocialMedia"],
    }),

    /** ---------------------------
     * UPDATE SOCIAL MEDIA
     * --------------------------- */
    updateSocialMedia: builder.mutation<
      SocialMedia,
      { id: string; data: UpdateSocialMediaPayload }
    >({
      query: ({ id, data }) => ({
        url: `/social-media/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any): SocialMedia => response.data,
      invalidatesTags: (_r, _e, { id }) => [
        { type: "SocialMedia", id },
        "SocialMedia",
      ],
    }),

    /** ---------------------------
     * DELETE SOCIAL MEDIA
     * --------------------------- */
    deleteSocialMedia: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/social-media/${id}`, method: "DELETE" }),
      transformResponse: (response: any) => response,
      invalidatesTags: ["SocialMedia"],
    }),
  }),
});

export const {
  useGetSocialMediasQuery,
  useGetSocialMediaByIdQuery,
  useCreateSocialMediaMutation,
  useUpdateSocialMediaMutation,
  useDeleteSocialMediaMutation,
} = socialMediaApi;
