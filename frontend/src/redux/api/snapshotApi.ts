import { baseApi } from "../baseApi";
import {
    Snapshot,
    CreateSnapshotPayload,
    UpdateSnapshotPayload,
} from "../types/snapshot";

export const snapshotApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ================= GET ALL =================
        getSnapshots: builder.query<
            Snapshot[],
            { search?: string; sector?: string; publishedOnly?: boolean } | undefined
        >({
            query: (params) => ({
                url: "/snapshots",
                params,
            }),
            transformResponse: (res: any) => res.data ?? [],
            providesTags: ["Snapshot"],
        }),

        // ================= GET BY ID =================
        getSnapshotById: builder.query<Snapshot, string>({
            query: (id) => `/snapshots/${id}`,
            transformResponse: (res: any) => res.data,
            providesTags: (_r, _e, id) => [{ type: "Snapshot", id }],
        }),

        // ================= CREATE =================
        createSnapshot: builder.mutation<
            Snapshot,
            CreateSnapshotPayload
        >({
            query: (body) => ({
                url: "/snapshots",
                method: "POST",
                body,
            }),
            transformResponse: (res: any) => res.data,
            invalidatesTags: ["Snapshot"],
        }),

        // ================= UPDATE =================
        updateSnapshot: builder.mutation<
            Snapshot,
            { id: string; data: UpdateSnapshotPayload }
        >({
            query: ({ id, data }) => ({
                url: `/snapshots/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (res: any) => res.data,
            invalidatesTags: (_r, _e, { id }) => [
                { type: "Snapshot", id },
                "Snapshot",
            ],
        }),

        // ================= DELETE =================
        deleteSnapshot: builder.mutation<
            { success: boolean; message: string },
            string
        >({
            query: (id) => ({
                url: `/snapshots/${id}`,
                method: "DELETE",
            }),
            transformResponse: (res: any) => res,
            invalidatesTags: ["Snapshot"],
        }),
        // ================= PUBLISH =================
        publishSnapshot: builder.mutation<
            Snapshot,
            string
        >({
            query: (id) => ({
                url: `/snapshots/${id}/publish`,
                method: "PATCH",
            }),
            transformResponse: (res: any) => res.data,
            invalidatesTags: ["Snapshot"],
        }),
    }),
});

export const {
    useGetSnapshotsQuery,
    useGetSnapshotByIdQuery,
    useCreateSnapshotMutation,
    useUpdateSnapshotMutation,
    useDeleteSnapshotMutation,
    usePublishSnapshotMutation,
} = snapshotApi;