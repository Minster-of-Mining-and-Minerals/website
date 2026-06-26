"use client";

import React, { useState } from 'react';
import { FileText, Upload, Clock, Shield, CheckCircle, AlertCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetMiningApplicationProcessesQuery } from '@/redux/api/miningApplicationProcessApi';
import * as LucideIcons from 'lucide-react';
import { getImageUrl } from '@/utils/fileUrl';
import PublicEmptyState from '@/components/common/PublicEmptyState';
import { SectorSnapshotSkeleton } from '@/components/skeletons';
import { useTranslations } from 'next-intl';

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <FileText className={className} />;
    return <IconComponent className={className} />;
};

// Hero Slider Component
const HeroSlider = ({ attachments }: { attachments: any[] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % attachments.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + attachments.length) % attachments.length);
    };

    if (!attachments || attachments.length === 0) return null;

    return (
        <div className='relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group'>
            {attachments.map((att, index) => (
                <div
                    key={index}
                    className='absolute inset-0 transition-transform duration-500 ease-in-out'
                    style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
                >
                    {/* IMAGE WRAPPER (IMPORTANT) */}
                    <div className="w-full h-full relative">
                        <img
                            src={getImageUrl(att.attachment, "large")}
                            alt={att.overlay_text || "Application Portal Interface"}
                            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                        />

                        {/* GRADIENT OVERLAY */}
                        <div className='absolute inset-0 bg-gradient-to-t from-[#073954]/80 via-[#073954]/30 to-transparent' />

                        {/* TEXT OVERLAY */}
                        <div className='absolute bottom-8 left-8 right-8 z-10'>
                            <div className='backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <div className='p-2 rounded-lg text-blue-600'>
                                        <DynamicIcon
                                            name={att.overlay_icon || 'Clock'}
                                            className='w-6 h-6'
                                        />
                                    </div>
                                    <h4 className='font-bold text-gray-900 m-0'>
                                        {att.overlay_text || 'Information'}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            {attachments.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20 opacity-0 group-hover:opacity-100'
                    >
                        <ChevronLeft className='w-5 h-5 text-[#073954]' />
                    </button>

                    <button
                        onClick={nextSlide}
                        className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20 opacity-0 group-hover:opacity-100'
                    >
                        <ChevronRight className='w-5 h-5 text-[#073954]' />
                    </button>

                    {/* Dots Indicator */}
                    <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20'>
                        {attachments.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`transition-all rounded-full ${index === currentSlide
                                    ? 'w-8 h-2 bg-white'
                                    : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const MiningApplicationPortal = () => {
    const { data: records, isLoading } = useGetMiningApplicationProcessesQuery({ published: true });
    const t = useTranslations("empty_state");

    if (isLoading) {
        return <SectorSnapshotSkeleton />;
    }

    const process = records && records.length > 0 ? records[0] : null;

    if (!process) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
                <div className="max-w-md w-full">
                    <PublicEmptyState
                        title={t("mining_application_portal_title")}
                        icon={AlertCircle}
                        action={
                            <Link href="/">
                                <Button className="bg-golden-dark text-white hover:bg-golden-dark/90">
                                    Return Home
                                </Button>
                            </Link>
                        }
                    />
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
            <div className='max-w-7xl mx-auto px-6 py-12'>
                {/* Portal Overview */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20'>
                    <div className='flex flex-col justify-center'>
                        <div className='mb-8'>
                            <h1 className='text-4xl md:text-5xl font-extrabold text-[#073954] mb-6 leading-tight'>
                                {process.title}
                            </h1>
                            <div className='text-lg text-gray-600 leading-relaxed space-y-4' dangerouslySetInnerHTML={{ __html: process.description || "" }} />
                        </div>

                        {process.objectives && process.objectives.length > 0 && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                {process.objectives.map((objective, index) => (
                                    <div key={index} className='flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                                        <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
                                        <p className='text-sm font-medium text-gray-700'>{objective}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Hero Slider using attachments */}
                    <HeroSlider attachments={process.attachments || []} />
                </div>

                {/* Application Types */}
                {process.application_types && process.application_types.length > 0 && (
                    <div className='mb-24'>
                        <div className='text-center mb-16'>
                            <h2 className='text-3xl font-bold text-[#073954] mb-4'>
                                Available Application Types
                            </h2>
                            <p className='text-gray-500 max-w-2xl mx-auto'>
                                Select the appropriate license category to begin your digital application process.
                            </p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {process.application_types.map((type, index) => (
                                <div
                                    key={index}
                                    className='group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2'
                                >
                                    <div className='h-3' style={{ backgroundColor: type.color || '#094C81' }} />
                                    <div className='p-8 flex-grow flex flex-col'>
                                        <div className='flex items-center gap-4 mb-6'>
                                            <div
                                                className='p-3 rounded-xl text-white shadow-lg bg-golden-dark'
                                            >
                                                <DynamicIcon name={type.icon} className="w-6 h-6" />
                                            </div>
                                            <h3 className='text-xl font-bold text-gray-900'>{type.title}</h3>
                                        </div>

                                        <div className='space-y-6 flex-grow min-h-[220px]'>
                                            {/* Requirements */}
                                            {type.requirements && type.requirements.length > 0 && (
                                                <div>
                                                    <p className='text-xs font-bold uppercase tracking-wider text-gray-400 mb-3'>Key Requirements</p>
                                                    <div className='space-y-2'>
                                                        {type.requirements.slice(0, 3).map((req, idx) => (
                                                            <div key={idx} className='flex items-center gap-2 text-sm text-gray-600'>
                                                                <div className='w-1.5 h-1.5 rounded-full bg-green-500 shrink-0' />
                                                                <span className='line-clamp-1'>{req}</span>
                                                            </div>
                                                        ))}
                                                        {type.requirements.length > 3 && (
                                                            <p className='text-xs text-blue-600 font-medium pl-3'>+{type.requirements.length - 3} more requirements</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Steps */}
                                            {type.steps && type.steps.length > 0 && (
                                                <div>
                                                    <p className='text-xs font-bold uppercase tracking-wider text-gray-400 mb-3'>Process Steps</p>
                                                    <div className='space-y-3'>
                                                        {type.steps.map((step, idx) => (
                                                            <div key={idx} className='flex items-start gap-3'>
                                                                <div className='w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-blue-100'>
                                                                    {idx + 1}
                                                                </div>
                                                                <span className='text-xs text-gray-600 leading-tight'>{step}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {type.action_url && (
                                            <Link href={type.action_url} className='block mt-auto pt-8'>
                                                <Button
                                                    className='w-full text-white py-6 rounded-xl font-bold transition-all shadow-md hover:shadow-lg'
                                                >
                                                    {type.action_label || 'Start Application'}
                                                    <ArrowRight className='w-4 h-4 ml-2' />
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MiningApplicationPortal;