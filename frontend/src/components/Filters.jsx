import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components/Filters.css';

const Filters = ({ isOpen, onClose, priceRange, setPriceRange, minRating, setMinRating }) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="filters-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="filters-modal"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="filters-header">
                            <button className="close-btn" onClick={onClose}>
                                <IoMdClose size={24} />
                            </button>
                            <h3>Filters</h3>
                            <div style={{ width: 24 }} /> {/* Spacer */}
                        </div>

                        <div className="filters-content">
                            <section className="filter-section">
                                <h4>Price range</h4>
                                <p className="subtitle">Nightly prices before fees and taxes</p>
                                <div className="price-inputs">
                                    <div className="price-input">
                                        <label>Minimum</label>
                                        <span>${priceRange[0]}</span>
                                    </div>
                                    <div className="price-input">
                                        <label>Maximum</label>
                                        <span>${priceRange[1]}+</span>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                                    className="range-slider"
                                />
                            </section>

                            <section className="filter-section">
                                <h4>Type of place</h4>
                                <div className="checkbox-group">
                                    <label className="checkbox-item">
                                        <input type="checkbox" defaultChecked />
                                        <div className="checkbox-label">
                                            <span>Entire home</span>
                                            <span className="subtext">A place all to yourself</span>
                                        </div>
                                    </label>
                                    <label className="checkbox-item">
                                        <input type="checkbox" />
                                        <div className="checkbox-label">
                                            <span>Private room</span>
                                            <span className="subtext">Your own room in a home or hotel, plus some shared common spaces</span>
                                        </div>
                                    </label>
                                </div>
                            </section>

                            <section className="filter-section">
                                <h4>Minimum Rating</h4>
                                <div className="flex gap-2">
                                    {[3, 4, 4.5, 5].map(rating => (
                                        <button
                                            key={rating}
                                            onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                                            className={`px-4 py-2 border rounded-full text-sm transition ${minRating === rating
                                                ? 'bg-black text-white border-black'
                                                : 'hover:border-black hover:bg-gray-50'
                                                }`}
                                        >
                                            {rating}+
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section className="filter-section">
                                <h4>Amenities</h4>
                                <div className="amenities-grid">
                                    {['Wifi', 'Kitchen', 'Washer', 'Dryer', 'Air conditioning', 'Heating'].map(item => (
                                        <label key={item} className="checkbox-item">
                                            <input type="checkbox" />
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="filters-footer">
                            <button className="clear-btn" onClick={() => {
                                setPriceRange([10, 1000]);
                                setMinRating(0);
                            }}>Clear all</button>
                            <button className="show-btn" onClick={onClose}>Show homes</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Filters;
