"use client";
import React from "react";
import { Building2, Target, Shield, Gem, Users, Globe, Award, FileText, Rocket, PieChart } from "lucide-react";
import RotatingImage3D from "./RotatingImage3D";

const BackgroundPage = () => {
    return (
        <div className="h-auto  py-12 px-4 mb-10">
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center md:gap-4 mb-4">
                        <div className="bg-golden-dark/10 p-3 rounded-2xl">
                            <Building2 className="w-8 h-8 text-golden-dark" />
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-teal-900">
                            Ministry <span className="text-golden-dark">Background</span>
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Established to regulate and develop Ethiopia's mineral and petroleum resources
                        for sustainable economic growth and national development.
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <RotatingImage3D frontUrl="/map.jpg" backUrl="/home-2.jpg" />
                </div>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center mt-12">
                    The world is changing faster than ever before, business is no exception. Industic industries are threatened as technology disrupts and software “eats the world.” Yet those that embrace change are thriving, building bigger, better, faster, and stronger products than ever before. You are helping to lead the charge; we can help you build on your past successes and prepare for future.
                </p>


            </div>
        </div>
    );
};

export default BackgroundPage;