import React from 'react';
import { MdBedroomParent, MdHotel, MdLocalFireDepartment } from 'react-icons/md';
import { GiCampingTent, GiBarn, GiBeachBucket, GiForestCamp, GiMountainCave, GiIsland, GiCastle, GiFishingBoat, GiWoodCabin } from 'react-icons/gi';
import { FaSwimmingPool } from 'react-icons/fa';
import { BiWater } from 'react-icons/bi';

import { BiWorld } from 'react-icons/bi';

const CATEGORIES = [
    { label: 'All', icon: <BiWorld size={24} /> },
    { label: 'Beach', icon: <GiBeachBucket size={24} /> },
    { label: 'Cabins', icon: <GiWoodCabin size={24} /> },
    { label: 'Castles', icon: <GiCastle size={24} /> },
    { label: 'Amazing pools', icon: <FaSwimmingPool size={24} /> },
    { label: 'Boats', icon: <GiFishingBoat size={24} /> },
    { label: 'Camping', icon: <GiCampingTent size={24} /> },
    { label: 'OMG!', icon: <MdLocalFireDepartment size={24} /> },
];

const Categories = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="pt-32 pb-4 px-6 max-w-7xl mx-auto">
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-2 items-center justify-center">
                {CATEGORIES.map((cat, idx) => (
                    <button
                        key={idx}
                        className={`group flex flex-col items-center gap-2 min-w-[64px] cursor-pointer transition-all duration-200 border-b-2 bg-transparent pb-2 outline-none ${selectedCategory === cat.label
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-black'
                            }`}
                        onClick={() => onSelectCategory(cat.label)}
                    >
                        <div className={`transition-opacity ${selectedCategory === cat.label ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                            {cat.icon}
                        </div>
                        <span className="text-xs font-semibold whitespace-nowrap">{cat.label}</span>
                    </button>
                ))}
            </div>
            {/* Simple CSS to hide scrollbar but keep functionality */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Categories;
