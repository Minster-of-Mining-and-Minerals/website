import { baseApi } from "../baseApi";
import {
  Vacancy,
  CreateVacancyPayload,
  UpdateVacancyPayload,
} from "../types/vacancy";

export const vacancyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVacancies: builder.query<
      Vacancy[],
      { search?: string; status?: string; isAdmin?: boolean } | void
    >({
      query: (params) =>
        params ? { url: "/vacancies", params } : { url: "/vacancies" },
      transformResponse: (res: any): Vacancy[] => res.data ?? [],
      providesTags: ["Vacancy"],
    }),

    getVacancyById: builder.query<Vacancy, { id: string; isAdmin?: boolean }>({
      query: ({ id, isAdmin }) =>
        isAdmin
          ? { url: `/vacancies/${id}`, params: { isAdmin: "true" } }
          : `/vacancies/${id}`,
      transformResponse: (res: any): Vacancy => res.data,
      providesTags: (_r, _e, { id }) => [{ type: "Vacancy", id }],
    }),

    createVacancy: builder.mutation<Vacancy, CreateVacancyPayload>({
      query: (body) => ({ url: "/vacancies", method: "POST", body }),
      transformResponse: (res: any): Vacancy => res.data,
      invalidatesTags: ["Vacancy"],
    }),

    updateVacancy: builder.mutation<
      Vacancy,
      { id: string; data: UpdateVacancyPayload }
    >({
      query: ({ id, data }) => ({
        url: `/vacancies/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (res: any): Vacancy => res.data,
      invalidatesTags: (_r, _e, { id }) => [
        { type: "Vacancy", id },
        "Vacancy",
      ],
    }),

    deleteVacancy: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/vacancies/${id}`, method: "DELETE" }),
      invalidatesTags: ["Vacancy"],
    }),

    publishVacancy: builder.mutation<Vacancy, string>({
      query: (id) => ({ url: `/vacancies/${id}/publish`, method: "PATCH" }),
      transformResponse: (res: any): Vacancy => res.data,
      invalidatesTags: ["Vacancy"],
    }),

    unpublishVacancy: builder.mutation<Vacancy, string>({
      query: (id) => ({ url: `/vacancies/${id}/unpublish`, method: "PATCH" }),
      transformResponse: (res: any): Vacancy => res.data,
      invalidatesTags: ["Vacancy"],
    }),

    closeVacancy: builder.mutation<Vacancy, string>({
      query: (id) => ({ url: `/vacancies/${id}/close`, method: "PATCH" }),
      transformResponse: (res: any): Vacancy => res.data,
      invalidatesTags: ["Vacancy"],
    }),
  }),
});

export const {
  useGetVacanciesQuery,
  useGetVacancyByIdQuery,
  useCreateVacancyMutation,
  useUpdateVacancyMutation,
  useDeleteVacancyMutation,
  usePublishVacancyMutation,
  useUnpublishVacancyMutation,
  useCloseVacancyMutation,
} = vacancyApi;
