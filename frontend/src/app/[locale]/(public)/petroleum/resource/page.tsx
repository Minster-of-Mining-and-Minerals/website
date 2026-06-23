"use client";

import React, { useMemo, useState } from 'react';
import { useGetResourcesQuery, useRecordResourceAccessMutation } from '@/redux/api/resourceApi';
import PublicEmptyState from '@/components/common/PublicEmptyState';
import { Loader2, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getAttachmentUrl } from '@/utils/fileUrl';

const ResourcePage = () => {
    const t = useTranslations("empty_state");
    // Fetch resources from API (filter by sector = mining)
    const { data: resources, isLoading, error } = useGetResourcesQuery({
        sector: 'petroleum'
    });

    // Mutation for tracking downloads/views
    const [recordResourceAccess] = useRecordResourceAccessMutation();

    // State to track which categories are expanded (show more resources)
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    // State to track which cards are collapsed/expanded
    const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});

    // Helper function to get file extension and size from file name
    const getFileInfo = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase() || '';
        const size = '-- KB';
        return { type: extension, size };
    };

    // Helper to get category icon based on title
    const getCategoryIcon = (title: string) => {
        const titleLower = title?.toLowerCase() || '';
        if (titleLower.includes('license') || titleLower.includes('permit')) return '📄';
        if (titleLower.includes('regul') || titleLower.includes('compli')) return '⚖️';
        if (titleLower.includes('fee') || titleLower.includes('payment')) return '💰';
        if (titleLower.includes('template') || titleLower.includes('guide')) return '📚';
        return '📁';
    };

    // Helper to get file URL (adjust based on your API endpoint)
    const getResourceFileUrl = (attachment: any) => {
        if (!attachment?.file_path) return '#';
        return getAttachmentUrl(attachment, 'medium');
    };

    // Helper function to get file icon based on type (yellow/orange style)
    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return (
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        <path d="M8 11h4v1H8v-1zm0 2h4v1H8v-1zm0 2h4v1H8v-1zM8 7h4v3H8V7z" fill="white" />
                    </svg>
                );
            case 'doc':
            case 'docx':
                return (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        <rect x="7" y="9" width="6" height="1" fill="white" />
                        <rect x="7" y="11" width="6" height="1" fill="white" />
                        <rect x="7" y="13" width="4" height="1" fill="white" />
                    </svg>
                );
            case 'xls':
            case 'xlsx':
                return (
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        <path d="M8 8h4v1H8V8zm0 2h4v1H8v-1zm0 2h4v1H8v-1z" fill="white" />
                    </svg>
                );
            case 'jpg':
            case 'png':
            case 'jpeg':
            case 'gif':
                return (
                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        <circle cx="8.5" cy="8.5" r="1.5" fill="white" />
                        <path d="M14 14l-3-3-2 2-3-3-2 2v1h10v-1z" fill="white" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        <path d="M8 10h4v1H8v-1zm0 2h4v1H8v-1zm0 2h4v1H8v-1z" fill="white" />
                    </svg>
                );
        }
    };

    // Transform API data to match the UI structure
    const resourceCategories = useMemo(() => {
        if (!resources) return [];

        return resources.map((resource: any, index: number) => ({
            id: resource.resource_id || index,
            title: resource.title,
            icon: getCategoryIcon(resource.title),
            description: resource.description,
            resources: resource.attachments?.map((attachment: any) => ({
                name: attachment.attachment?.file_name || 'Unnamed File',
                type: getFileInfo(attachment.attachment?.file_name).type,
                size: getFileInfo(attachment.attachment?.file_name).size,
                url: getResourceFileUrl(attachment.attachment),
                description: attachment.label || 'Resource Document',
                attachmentId: attachment.attachment_id,
                resourceId: resource.resource_id,
                filePath: attachment.attachment?.file_path
            })) || []
        }));
    }, [resources]);

    // Handle download with tracking
    const handleDownload = async (resourceId: string, attachmentId: string, fileUrl: string) => {
        try {
            await recordResourceAccess({
                resource_id: resourceId,
                attachment_id: attachmentId,
                access_type: 'download'
            }).unwrap();

            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = '';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error recording resource access:', error);
            window.open(fileUrl, '_blank');
        }
    };

    // Toggle expanded state for a category (show more resources)
    const toggleExpand = (categoryId: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    // Toggle collapsed state for a card
    const toggleCollapse = (categoryId: string) => {
        setCollapsedCards(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-golden-dark" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
                <PublicEmptyState
                    title={t("resources_title")}
                    description={t("error_description")}
                    icon={FolderOpen}
                />
            </div>
        );
    }

    if (resourceCategories.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
                <PublicEmptyState title={t("resources_title")} icon={FolderOpen} />
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6'>
            {/* Header Section */}
            <div className='max-w-7xl mx-auto mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>Petroleum Resources Library</h1>
                <p className='text-gray-600 text-sm md:text-base'>Access all necessary documents, forms, and guidelines for the petroleum sector</p>
            </div>

            {/* Categories Grid - With independent heights */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-start'>
                {resourceCategories.map((category) => {
                    const isExpanded = expandedCategories[category.id];
                    const isCollapsed = collapsedCards[category.id];
                    const visibleResources = isExpanded ? category.resources : category.resources.slice(0, 3);
                    const hasMoreResources = category.resources.length > 3;

                    return (
                        <div
                            key={category.id}
                            className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 h-fit'
                        >
                            {/* Category Header - Compact with Collapse Button */}
                            <div className='bg-gradient-to-r from-golden-dark/5 to-golden-dark/10 p-4 border-b border-gray-200'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-4 flex-1'>
                                        <div className='text-2xl'>{category.icon}</div>
                                        <div className='text-lg md:text-xl font-bold text-gray-900'>{category.title}</div>
                                    </div>
                                    <button
                                        onClick={() => toggleCollapse(category.id)}
                                        className='p-1 hover:bg-golden-dark/10 rounded-lg transition-colors'
                                        title={isCollapsed ? "Expand" : "Collapse"}
                                    >
                                        <svg
                                            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Animated Description */}
                                <div className={`description-container ${isCollapsed ? 'description-collapsed' : 'description-expanded'}`}>
                                    <p className='text-gray-600 text-xs md:text-sm'>{category.description}</p>
                                </div>
                            </div>

                            {/* Animated Resources List */}
                            <div className={`resources-container ${isCollapsed ? 'resources-container-collapsed' : 'resources-container-expanded'}`}>
                                {!isCollapsed && (
                                    <>
                                        <div className='divide-y divide-gray-100'>
                                            {visibleResources.map((resource, idx) => (
                                                <div
                                                    key={idx}
                                                    className='p-4 hover:bg-gray-50 transition-colors group animate-slideIn'
                                                    style={{
                                                        animationDelay: `${idx * 50}ms`,
                                                        animationDuration: '300ms',
                                                        animationFillMode: 'both'
                                                    }}
                                                >
                                                    <div className='flex items-start justify-between gap-3'>
                                                        <div className='flex-1 min-w-0'>
                                                            <div className='flex items-center gap-2 mb-1'>
                                                                <div className='flex-shrink-0'>
                                                                    {getFileIcon(resource.type)}
                                                                </div>
                                                                <div className='font-semibold text-gray-800 group-hover:text-golden-dark transition-colors text-sm md:text-base truncate'>
                                                                    {resource.description}
                                                                </div>
                                                            </div>
                                                            <p className='text-xs text-gray-500 mb-1 truncate'>{resource.name}</p>
                                                            <div className='flex items-center gap-2 text-xs text-gray-400'>
                                                                <span className='uppercase'>{resource.type}</span>
                                                                <span>•</span>
                                                                <span>{resource.size}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDownload(
                                                                resource.resourceId,
                                                                resource.attachmentId,
                                                                resource.url
                                                            )}
                                                            className='flex-shrink-0 flex items-center gap-1 px-3 py-1.5 bg-golden-dark/10 text-golden-dark rounded-lg hover:bg-golden-dark/20 transition-all duration-200 hover:scale-105 active:scale-95'
                                                        >
                                                            <span>Download</span>
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Animated View All / Show Less Button */}
                                        <div className={`view-all-container ${hasMoreResources ? 'view-all-visible' : 'view-all-hidden'}`}>
                                            {hasMoreResources && (
                                                <div className='p-3 bg-gray-50 border-t border-gray-200 text-center'>
                                                    <button
                                                        onClick={() => toggleExpand(category.id)}
                                                        className='text-xs md:text-sm text-golden-dark hover:text-golden-dark/80 font-medium inline-flex items-center gap-1 transition-all duration-200 hover:scale-105'
                                                    >
                                                        {isExpanded ? (
                                                            <>
                                                                <span>Show Less</span>
                                                                <svg className="w-3 h-3 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                                </svg>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>View All ({category.resources.length} Resources)</span>
                                                                <svg className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResourcePage;