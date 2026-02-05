"use client"
import React, { useState } from 'react'
import Image from "next/image";
import { Search, Sparkles, Diamond, Gem, Award, MapPin, Filter, ChevronDown } from 'lucide-react';

// Static gemstone data with image descriptions
const gemstonesData = [
    {
        id: 1,
        name: "Ethiopian Opal",
        category: "Precious",
        type: "Opal",
        color: "Multi-color, Fire",
        hardness: "5.5-6.5",
        location: "Wollo Province",
        description: "Renowned for its stunning play-of-color and unique fire patterns. Ethiopian opals are relatively new to the market but have gained international recognition for their vibrant colors.",
        image: "/gems/opal.jpg",
        tags: ["precious", "opal", "multicolor", "wollo", "fire-opal"],
        value: "High",
        discoveryYear: 1994
    },
    {
        id: 2,
        name: "Sapphire",
        category: "Precious",
        type: "Corundum",
        color: "Blue, Pink, Yellow",
        hardness: "9",
        location: "Tigray Region",
        description: "Ethiopian sapphires are known for their excellent clarity and range of colors. The blue sapphires from Tigray are particularly prized for their cornflower blue hue.",
        image: "/gems/sapphire.webp",
        tags: ["precious", "sapphire", "corundum", "blue", "tigray"],
        value: "Very High",
        discoveryYear: 2017
    },
    {
        id: 3,
        name: "Emerald",
        category: "Precious",
        type: "Beryl",
        color: "Green",
        hardness: "7.5-8",
        location: "South Gondar",
        description: "High-quality emeralds with deep green coloration and good transparency. Ethiopian emeralds are becoming increasingly important in the global gemstone market.",
        image: "/gems/emerald.jpg",
        tags: ["precious", "emerald", "beryl", "green", "gondar"],
        value: "Very High",
        discoveryYear: 2016
    },
    {
        id: 4,
        name: "Tourmaline",
        category: "Semi-precious",
        type: "Tourmaline",
        color: "Pink, Green, Watermelon",
        hardness: "7-7.5",
        location: "Southern Nations",
        description: "Ethiopian tourmalines display a wide range of colors including rare watermelon tourmalines (pink core with green rind).",
        image: "/gems/tourmaline.jpg",
        tags: ["semi-precious", "tourmaline", "pink", "green", "watermelon"],
        value: "Medium-High",
        discoveryYear: 2001
    },
    {
        id: 5,
        name: "Aquamarine",
        category: "Semi-precious",
        type: "Beryl",
        color: "Blue, Blue-green",
        hardness: "7.5-8",
        location: "Wello Province",
        description: "Light blue to blue-green aquamarines known for their excellent clarity and large crystal sizes.",
        image: "/gems/aquamarine.webp",
        tags: ["semi-precious", "aquamarine", "beryl", "blue", "wello"],
        value: "Medium",
        discoveryYear: 1999
    },
    {
        id: 6,
        name: "Garnet",
        category: "Semi-precious",
        type: "Garnet",
        color: "Red, Orange, Green",
        hardness: "6.5-7.5",
        location: "Oromia Region",
        description: "Ethiopian garnets include spessartine (orange-red) and tsavorite (green) varieties. Tsavorite garnet is particularly valued.",
        image: "/gems/garnet.jpg",
        tags: ["semi-precious", "garnet", "red", "green", "tsavorite"],
        value: "Medium",
        discoveryYear: 1967
    },
    {
        id: 7,
        name: "Quartz",
        category: "Semi-precious",
        type: "Quartz",
        color: "Clear, Amethyst, Citrine",
        hardness: "7",
        location: "Multiple Regions",
        description: "Includes various quartz varieties: clear rock crystal, purple amethyst, and yellow citrine. Amethyst is particularly abundant.",
        image: "/gems/quartz.webp",
        tags: ["semi-precious", "quartz", "amethyst", "citrine", "clear"],
        value: "Low-Medium",
        discoveryYear: "Ancient"
    },
    {
        id: 8,
        name: "Obsidian",
        category: "Ornamental",
        type: "Volcanic Glass",
        color: "Black, Mahogany",
        hardness: "5-5.5",
        location: "Afar Region",
        description: "Volcanic glass used for carvings and jewelry. Ethiopian obsidian is known for its sharp conchoidal fracture and deep black color.",
        image: "/gems/obsidian.webp",
        tags: ["ornamental", "obsidian", "volcanic", "black", "afar"],
        value: "Low",
        discoveryYear: "Ancient"
    }
];

const categories = ["All", "Precious", "Semi-precious", "Ornamental"];
const colors = ["All", "Blue", "Green", "Red", "Multi-color", "Black", "Pink"];

const GemstonesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedColor, setSelectedColor] = useState("All");

    // Filter gemstones based on search and filters
    const filteredGemstones = gemstonesData.filter(gem => {
        const matchesSearch = gem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
            gem.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === "All" || gem.category === selectedCategory;
        const matchesColor = selectedColor === "All" || gem.color.toLowerCase().includes(selectedColor.toLowerCase());

        return matchesSearch && matchesCategory && matchesColor;
    });

    // Statistics
    const stats = {
        total: gemstonesData.length,
        precious: gemstonesData.filter(g => g.category === "Precious").length,
        regions: [...new Set(gemstonesData.map(g => g.location))].length,
        discovered: gemstonesData.filter(g => g.discoveryYear !== "Ancient").length
    };

    return (
        <div className='w-7xl mx-auto'>
            {/* Hero Header */}
            <div className='bg-gradient-to-r from-golden-dark via-golden-light to-golden-dark rounded-2xl p-8 mb-10 text-white overflow-hidden relative'>
                <div className='relative z-10'>
                    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8'>
                        <div>
                            <h1 className='text-4xl font-bold mb-4 flex items-center gap-3'>
                                <Sparkles className="w-10 h-10" />
                                Ethiopian Gemstones
                            </h1>
                            <p className='text-xl text-white max-w-2xl'>
                                Discover Ethiopia's rich mineral heritage - Home to world-class gemstones and precious stones
                            </p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='text-right'>
                                <p className='text-sm text-golden-light'>Gemstone Varieties</p>
                                <p className='text-3xl font-bold'>{stats.total}</p>
                            </div>
                            <div className='h-12 w-px bg-golden-light'></div>
                            <div className='text-right'>
                                <p className='text-sm text-golden-light'>Precious Stones</p>
                                <p className='text-3xl font-bold'>{stats.precious}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full -translate-y-32 translate-x-32'></div>
            </div>

            {/* Search and Filter Section */}
            <div className='mb-10'>
                <div className='bg-white rounded-xl p-6 border border-gray-200 shadow-lg'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                        {/* Search Bar */}
                        <div className='lg:col-span-5'>
                            <div className='relative'>
                                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                                <input
                                    type="text"
                                    placeholder="Search gemstones by name, location, color, or type..."
                                    className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className='lg:col-span-3'>
                            <div className='relative'>
                                <Filter className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                                <select
                                    className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none'
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            Category: {category}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
                            </div>
                        </div>

                        {/* Color Filter */}
                        <div className='lg:col-span-3'>
                            <div className='relative'>
                                <Diamond className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                                <select
                                    className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none'
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                >
                                    {colors.map(color => (
                                        <option key={color} value={color}>
                                            Color: {color}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
                            </div>
                        </div>

                        {/* Reset Button */}
                        <div className='lg:col-span-1'>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                    setSelectedColor("All");
                                }}
                                className='w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className='mt-6 pt-6 border-t border-gray-200'>
                        <p className='text-gray-600'>
                            Showing <span className='font-bold text-golden-dark'>{filteredGemstones.length}</span> of {gemstonesData.length} gemstones
                            {searchTerm && ` matching "${searchTerm}"`}
                        </p>
                    </div>
                </div>
            </div>

            <div className='w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
                    {filteredGemstones.map(gem => (
                        <div
                            key={gem.id}
                            className='bg-white rounded-xl grid grid-cols-1 lg:grid-cols-3 gap-2 border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group'
                        >
                            {/* Image with placeholder description */}
                            <div className='relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden'>
                                {gem.image ? (
                                    <Image
                                        src={gem.image}
                                        alt={`High quality ${gem.color.toLowerCase()} ${gem.name.toLowerCase()} from ${gem.location}, Ethiopia`}
                                        fill
                                        className='object-center group-hover:scale-105 transition-transform duration-300'
                                    />
                                ) : (
                                    <div className='w-full h-full flex flex-col items-center justify-center p-4 text-center'>
                                        <Gem className='w-16 h-16 text-gray-400 mb-3' />
                                        <p className='text-gray-500 font-medium'>{gem.name}</p>
                                        <p className='text-sm text-gray-400 mt-1'>{gem.color} • {gem.type}</p>
                                    </div>
                                )}
                                {/* Category Badge */}
                                {/* <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${gem.category === "Precious"
                                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
                                    : gem.category === "Semi-precious"
                                        ? 'bg-gradient-to-r from-golden-dark to-golden-light text-white'
                                        : 'bg-gradient-to-r from-gray-600 to-gray-800 text-white'
                                    }`}>
                                    {gem.category}
                                </div> */}
                            </div>

                            {/* Content */}
                            <div className='p-6 col-span-2'>
                                <div className='flex justify-between items-start mb-3'>
                                    <div>
                                        <h3 className='text-xl font-bold text-gray-900 mb-1'>{gem.name}</h3>
                                        <div className='flex items-center gap-2 text-gray-600'>
                                            <MapPin className='w-4 h-4' />
                                            <span className='text-sm'>{gem.location}</span>
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <div className={`px-2 py-1 rounded text-xs font-bold ${gem.value === "Very High" ? 'bg-red-100 text-red-700' :
                                            gem.value === "High" ? 'bg-amber-100 text-amber-700' :
                                                gem.value === "Medium-High" ? 'bg-blue-100 text-blue-700' :
                                                    gem.value === "Medium" ? 'bg-green-100 text-green-700' :
                                                        'bg-gray-100 text-gray-700'
                                            }`}>
                                            {gem.value} Value
                                        </div>
                                    </div>
                                </div>

                                <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                                    {gem.description}
                                </p>

                                <div className='grid grid-cols-2 gap-3 mb-4'>
                                    <div className='p-2 bg-gray-50 rounded'>
                                        <p className='text-xs text-gray-500'>Type</p>
                                        <p className='font-medium text-gray-900'>{gem.type}</p>
                                    </div>
                                    <div className='p-2 bg-gray-50 rounded'>
                                        <p className='text-xs text-gray-500'>Hardness</p>
                                        <p className='font-medium text-gray-900'>{gem.hardness} Mohs</p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className='flex flex-wrap gap-2 mb-4'>
                                    {gem.tags.slice(0, 3).map((tag, index) => (
                                        <span
                                            key={index}
                                            className='px-2 py-1 bg-yellow-50 text-golden-dark text-xs rounded-full'
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {gem.tags.length > 3 && (
                                        <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full'>
                                            +{gem.tags.length - 3} more
                                        </span>
                                    )}
                                </div>

                                <div className='flex justify-between items-center pt-4 border-t border-gray-100'>
                                    <div className='text-sm text-gray-500'>
                                        Discovered: {gem.discoveryYear}
                                    </div>
                                    <button className='text-sm font-medium text-golden-dark hover:text-golden-light'>
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredGemstones.length === 0 && (
                    <div className='text-center py-16 bg-white rounded-xl border border-gray-200'>
                        <Gem className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                        <h3 className='text-xl font-bold text-gray-900 mb-2'>No gemstones found</h3>
                        <p className='text-gray-600 max-w-md mx-auto'>
                            Try adjusting your search or filters to find Ethiopian gemstones matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className='mt-12 pt-8 border-t border-gray-200 text-center'>
                <p className='text-gray-600 mb-2'>
                    Data Source: Ministry of Mines Geological Survey & Ethiopian Gemological Institute
                </p>
                <p className='text-sm text-gray-500'>
                    All images and descriptions are for illustrative purposes. Actual specimens may vary.
                </p>
            </div>
        </div>
    )
}

export default GemstonesPage