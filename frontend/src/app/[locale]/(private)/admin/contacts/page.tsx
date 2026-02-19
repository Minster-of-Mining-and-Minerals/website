"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminContactInfo from "@/components/pages/contact-page-components/AdminContactInfo";
import AdminContactMessages from "@/components/pages/contact-page-components/AdminContactMessages";
import AdminContactRegionalOffices from "@/components/pages/contact-page-components/AdminContactRegionalOffices";

const AdminContactsPage = () => {
    return (
        <div className="mx-auto space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-[#073954]">Contacts Management</h1>
                <p className="text-gray-500 text-lg">
                    Manage your office contact information and view messages from the public.
                </p>
            </div>

            <Tabs defaultValue="messages" className="w-full">
                <TabsList className="grid max-w-2xl grid-cols-3 mb-8 h-12 bg-golden-dark20 rounded-lg p-1">
                    <TabsTrigger
                        value="messages"
                        className="text-dark data-[state=active]:bg-golden-dark data-[state=active]:text-white rounded-md transition"
                    >
                        Messages
                    </TabsTrigger>

                    <TabsTrigger
                        value="contact-info"
                        className="text-dark data-[state=active]:bg-golden-dark data-[state=active]:text-white rounded-md transition"
                    >
                        Contact Details
                    </TabsTrigger>
                    <TabsTrigger
                        value="regional-offices"
                        className="text-dark data-[state=active]:bg-golden-dark data-[state=active]:text-white rounded-md transition"
                    >
                        Regional Offices
                    </TabsTrigger>

                </TabsList>

                <TabsContent value="messages">
                    <AdminContactMessages />
                </TabsContent>

                <TabsContent value="contact-info">
                    <AdminContactInfo />
                </TabsContent>
                <TabsContent value="regional-offices">
                    <AdminContactRegionalOffices />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminContactsPage;