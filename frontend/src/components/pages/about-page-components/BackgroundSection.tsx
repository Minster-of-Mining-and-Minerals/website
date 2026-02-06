"use client";
import React from "react";
import { Building2, Target, Shield, Gem, Users, Globe, Award, FileText, Rocket, PieChart } from "lucide-react";
import RotatingImage3D from "./RotatingImage3D";

const BackgroundPage = () => {


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="bg-golden-dark/10 p-3 rounded-2xl">
                            <Building2 className="w-8 h-8 text-golden-dark" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Ministry <span className="text-golden-dark">Background</span>
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Established to regulate and develop Ethiopia's mineral and petroleum resources
                        for sustainable economic growth and national development.
                    </p>
                </div>
                <RotatingImage3D frontUrl="/map.jpg" backUrl="/home-2.jpg" />
                {/* <GlobeTwoSided frontUrl="/map.jpg" backUrl="/home-2.jpg" /> */}
            </div>
        </div>
    );
};

export default BackgroundPage;