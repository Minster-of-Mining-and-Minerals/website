"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLeadership from "@/components/pages/about-page-components/AdminLeadership";
import AdminBackground from "@/components/pages/about-page-components/AdminBackground";
import AdminMissionVision from "@/components/pages/about-page-components/AdminMissionVision";

export default function AboutAdminPage() {
    return (
        <div className=" mx-auto space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-[#073954]">About Us Management</h1>
                <p className="text-gray-500 text-lg">
                    Configure the ministry's background, leadership structure, and core principles.
                </p>
            </div>

            <Tabs defaultValue="leadership" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
                    <TabsTrigger value="background" className="text-base">Background</TabsTrigger>
                    <TabsTrigger value="leadership" className="text-base">Leadership</TabsTrigger>
                    <TabsTrigger value="vision-mission" className="text-base">Vision, Mission & Core</TabsTrigger>
                </TabsList>

                <TabsContent value="background">
                    <AdminBackground />
                </TabsContent>

                <TabsContent value="leadership">
                    <AdminLeadership />
                </TabsContent>

                <TabsContent value="vision-mission">
                    <AdminMissionVision />
                </TabsContent>
            </Tabs>
        </div>
    );
}