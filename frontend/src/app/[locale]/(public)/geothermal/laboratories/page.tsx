"use client";
import React from "react";
import { Microscope, Beaker, Pipette, FlaskConical, Database, ClipboardCheck, MicroscopeIcon, TestTube2, Thermometer } from "lucide-react";

/**
 * Geothermal Laboratory Services Page
 * Showcases the technical testing capabilities for geothermal fluid and rock analysis.
 */
const GeothermalLaboratoriesPage = () => {
  const labServices = [
    {
      title: "Geochemical Analysis",
      description: "Analysis of thermal waters and gases to determine reservoir temperatures and origin.",
      icon: Beaker,
      features: ["Ionic Balance", "Isotopic Tracing", "Gas Chronometry"],
      color: "blue"
    },
    {
      title: "Petrography & Mineralogy",
      description: "Study of rock sections to identify hydrothermal alteration minerals and reservoir porosity.",
      icon: Microscope,
      features: ["Thin Section Analysis", "XRD Analysis", "SEM-EDS"],
      color: "emerald"
    },
    {
      title: "Physical Property Testing",
      description: "Measuring rock density, thermal conductivity, and permeability of reservoir samples.",
      icon: Thermometer,
      features: ["Core Analysis", "Thermal Diffusion", "Point Load Testing"],
      color: "amber"
    },
    {
      title: "Environmental Testing",
      description: "Monitoring water quality and soil chemistry to ensure environmental compliance.",
      icon: ClipboardCheck,
      features: ["Heavy Metal Screening", "pH & Conductivity", "Turbidity Monitoring"],
      color: "teal"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              State-of-the-Art <span className="text-emerald-600">Laboratory Services</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our laboratories provide critical analytical support for geothermal exploration and development. 
              Equipped with modern instrumentation, we ensure high-precision data for reservoir modeling and environmental monitoring.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
                <MicroscopeIcon className="w-4 h-4 text-emerald-600" />
                ISO 17025 Compliant
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
                <Database className="w-4 h-4 text-emerald-600" />
                Digital Sample Archives
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/home-2.jpg" 
              alt="Geothermal Lab" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {labServices.map((service, index) => (
            <div key={index} className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 hover:border-emerald-500/20 hover:bg-white transition-all shadow-sm group">
              <div className={`p-4 bg-white rounded-2xl shadow-sm text-${service.color}-600 w-fit mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, fIdx) => (
                  <span key={fIdx} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Analysis Request Section */}
        <div className="bg-neutral-900 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Request Analytical Services</h2>
            <p className="text-neutral-400 mb-10 leading-relaxed">
              We provide testing services for government agencies, private developers, and academic researchers. 
              Our service catalog includes pricing and sample preparation guidelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2">
                <TestTube2 className="w-5 h-5" />
                Service Catalog (PDF)
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm flex items-center justify-center gap-2">
                <Pipette className="w-5 h-5" />
                Request Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeothermalLaboratoriesPage;
