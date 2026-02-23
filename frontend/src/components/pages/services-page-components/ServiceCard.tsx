import React from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon }) => {
    return (
        <div className="bg-white hover:shadow-lg hover:border-gray-200 cursor-pointer p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group">
            <div className="w-14 h-14 bg-golden-dark/10 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                <Icon className="w-7 h-7 text-golden-dark transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

export default ServiceCard;
