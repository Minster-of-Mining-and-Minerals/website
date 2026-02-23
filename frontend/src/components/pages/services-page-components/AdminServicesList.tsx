"use client";

import { useState, useEffect } from "react";
import ServiceTable from "./ServiceTable";
import ServiceModal from "./ServiceModal";

export type Service = {
    id: string;
    title: string;
    description: string;
    iconName: string;
};

export const initialServices: Service[] = [
    {
        id: "licensing",
        title: "Mineral Licensing",
        description: "Facilitating the issuance of exploration and mining licenses for investors.",
        iconName: "licensing",
    },
    {
        id: "geology",
        title: "Geological Information",
        description: "Providing access to reliable geological and geochemical data and maps.",
        iconName: "geology",
    },
    {
        id: "laboratory",
        title: "Laboratory Services",
        description: "Conducting mineral analysis, physical tests, and chemical evaluations.",
        iconName: "laboratory",
    },
    {
        id: "petroleum",
        title: "Petroleum Support",
        description: "Overseeing and supporting oil and gas exploration activities across the country.",
        iconName: "petroleum",
    },
    {
        id: "investment",
        title: "Investment Promotion",
        description: "Promoting Ethiopia's vast mineral potential to global and local investors.",
        iconName: "investment",
    },
    {
        id: "regulation",
        title: "Environmental Regulation",
        description: "Ensuring resource extraction adheres to strict environmental and safety standards.",
        iconName: "regulation",
    },
];

export default function AdminServicesList() {
    const [services, setServices] = useState<Service[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState<Partial<Service> | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("services_data");
        if (saved) {
            try {
                setServices(JSON.parse(saved));
            } catch (e) {
                setServices(initialServices);
            }
        } else {
            setServices(initialServices);
        }
    }, []);

    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

    const handleAdd = () => {
        setCurrentService({
            id: Date.now().toString(),
            title: "",
            description: "",
            iconName: "licensing",
        });
        setIsModalOpen(true);
    };

    const handleEdit = (service: Service) => {
        setCurrentService(service);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            const newServices = services.filter(s => s.id !== id);
            setServices(newServices);
            localStorage.setItem("services_data", JSON.stringify(newServices));
        }
    };

    const handleSave = () => {
        if (!currentService?.title || !currentService?.description) return;

        let newServices;
        if (services.find(s => s.id === currentService.id)) {
            newServices = services.map(s => s.id === currentService.id ? (currentService as Service) : s);
        } else {
            newServices = [...services, currentService as Service];
        }

        setServices(newServices);
        localStorage.setItem("services_data", JSON.stringify(newServices));
        setIsModalOpen(false);
        setCurrentService(null);
    };

    const isEditing = !!(currentService?.id && services.find(s => s.id === currentService.id));

    return (
        <>
            <ServiceTable
                services={services}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPagination={handlePagination}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ServiceModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSave={handleSave}
                currentService={currentService}
                setCurrentService={setCurrentService}
                isEditing={isEditing}
            />
        </>
    );
}
