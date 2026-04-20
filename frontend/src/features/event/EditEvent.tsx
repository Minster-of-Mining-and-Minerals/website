"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetEventByIdQuery, useUpdateEventMutation } from "@/redux/api/eventApi";
import EventForm from "./EventForm";

export default function EditEvent() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.eventId as string;

    const { data: event, isLoading: isFetching } = useGetEventByIdQuery(eventId);
    const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

    const handleSubmit = async (data: any) => {
        const loadingToast = toast.loading("Updating event...");
        try {
            await updateEvent({ id: eventId, data }).unwrap();
            toast.dismiss(loadingToast);
            toast.success("Event updated successfully!");
            router.push("/admin/events");
        } catch (err: any) {
            toast.dismiss(loadingToast);
            toast.error(err?.data?.message || "Failed to update event");
        }
    };

    if (isFetching) return <div className="h-64 flex items-center justify-center">Loading event data...</div>;

    return (
        <EventForm 
            title="Edit Event"
            initialData={event}
            onSubmit={handleSubmit}
            isLoading={isUpdating}
        />
    );
}
