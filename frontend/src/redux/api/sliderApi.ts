import { baseApi } from "../baseApi";
import {
    Slider,
    CreateSliderPayload,
    UpdateSliderPayload,
} from "../types/slider";

export const sliderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSliders: builder.query<Slider[], void>({
            query: () => ({ url: "/sliders" }),
            transformResponse: (res: any) => res.data ?? [],
            providesTags: ["Slider"],
        }),

        getSliderById: builder.query<Slider, string>({
            query: (id) => `/sliders/${id}`,
            transformResponse: (res: any) => res.data,
            providesTags: (_r, _e, id) => [{ type: "Slider", id }],
        }),

        createSlider: builder.mutation<Slider, CreateSliderPayload>({
            query: (body) => ({
                url: "/sliders",
                method: "POST",
                body,
            }),
            transformResponse: (res: any) => res.data,
            invalidatesTags: ["Slider"],
        }),

        updateSlider: builder.mutation<
            Slider,
            { id: string; data: UpdateSliderPayload }
        >({
            query: ({ id, data }) => ({
                url: `/sliders/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (res: any) => res.data,
            invalidatesTags: (_r, _e, { id }) => [
                { type: "Slider", id },
                "Slider",
            ],
        }),

        deleteSlider: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/sliders/${id}`,
                method: "DELETE",
            }),
            transformResponse: (res: any) => res,
            invalidatesTags: ["Slider"],
        }),
    }),
});

export const {
    useGetSlidersQuery,
    useGetSliderByIdQuery,
    useCreateSliderMutation,
    useUpdateSliderMutation,
    useDeleteSliderMutation,
} = sliderApi;