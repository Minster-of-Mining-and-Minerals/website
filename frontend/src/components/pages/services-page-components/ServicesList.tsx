"use client";

import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react"; // Import all icons
import ServiceCard from "./ServiceCard";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { Service } from "@/redux/types/service";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { useTranslations } from "next-intl";
import { ServicesGridSkeleton } from "@/components/skeletons";

const ServicesList = () => {
    const { data: apiData = [], isLoading, isError } = useGetServicesQuery();
    const [services, setServices] = useState<Service[]>([]);
    const t = useTranslations("empty_state");

    useEffect(() => {
        if (apiData.length > 0) {
            setServices(apiData);
        }
    }, [apiData]);

    if (isLoading) {
        return <ServicesGridSkeleton />;
    }

    if (isError) {
        return (
            <PublicEmptyState
                title={t("services_title")}
                description={t("error_description")}
            />
        );
    }

    if (services.length === 0) {
        return (
            <PublicEmptyState title={t("services_title")} />
        );
    }

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => {
                    // Dynamically map icon name to Lucide icon component
                    const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.File;

                    return (
                        <ServiceCard
                            key={service.service_id}
                            title={service.title}
                            description={service.content}
                            icon={IconComponent}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default ServicesList;