"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateEventMutation } from "@/redux/api/eventApi";
import EventForm from "./EventForm";

export default function CreateEvent() {
    const router = useRouter();
    const [createEvent, { isLoading }] = useCreateEventMutation();

    const handleSubmit = async (data: any) => {
        const loadingToast = toast.loading("Creating event...");
        try {
            await createEvent(data).unwrap();
            toast.dismiss(loadingToast);
            toast.success("Event created successfully!");
            router.push("/admin/events");
        } catch (err: any) {
            toast.dismiss(loadingToast);
            toast.error(err?.data?.message || "Failed to create event");
        }
    };

    return (
        <EventForm 
            title="Create New Event"
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
}
