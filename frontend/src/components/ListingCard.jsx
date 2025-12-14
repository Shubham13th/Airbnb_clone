import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ListingCard = ({ data }) => {
    // Ensure we have an array of images. If 'image' is string, wrap it. If 'images' is array, use it.
    // Fallback to placeholder if nothing.
    const images = data.images && data.images.length > 0 ? data.images : (data.image ? [data.image] : ['https://via.placeholder.com/400']);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    React.useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsWishlisted(wishlist.includes(data._id || data.id));
    }, [data._id, data.id]);

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const id = data._id || data.id;
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        let newWishlist;

        if (wishlist.includes(id)) {
            newWishlist = wishlist.filter(item => item !== id);
        } else {
            newWishlist = [...wishlist, id];
        }

        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        setIsWishlisted(!isWishlisted);

        // Optional callback if parent needs to know
        // if (typeof onWishlistChange === 'function') { // onWishlistChange is not passed as prop, so commenting out
        //     onWishlistChange(data.id);
        // }
    };

    const checkCategory = (listing, selectedCategory) => {
        if (!selectedCategory) return true;
        // Map old categories to new ones for backward compatibility if needed, 
        // or just ensure data is updated.
        // For now, simple exact match.
        return listing.category === selectedCategory;
    };

    const nextImage = (e) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <Link to={`/listing/${data._id || data.id}`} className="group block relative cursor-pointer no-underline text-inherit hover:scale-105 transition">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 mb-3 group/image">
                <img
                    src={images[currentImageIndex]}
                    alt={data.title || "Listing"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Heart Button */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-3 right-3 text-white/70 hover:scale-110 transition hover:text-white z-10"
                >
                    {isWishlisted ? (
                        <AiOutlineHeart size={24} className="fill-primary stroke-white stroke-2 text-primary" style={{ fill: '#ff385c', stroke: 'white', strokeWidth: '2px' }} />
                    ) : (
                        <AiOutlineHeart size={24} className="fill-transparent stroke-white" style={{ strokeWidth: '2px' }} />
                    )}
                </button>

                {/* Slider Buttons - Only show if multiple images */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-1 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity z-10 shadow-md"
                        >
                            <AiOutlineLeft size={16} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-1 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity z-10 shadow-md"
                        >
                            <AiOutlineRight size={16} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {images.slice(0, 5).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all ${currentImageIndex === idx ? 'bg-white scale-110' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 truncate pr-2">
                    {typeof data.location === 'string' ? data.location : 'Beautiful Stay'}
                </h3>
                <div className="flex items-center gap-1 text-sm font-light whitespace-nowrap">
                    <AiFillStar className="text-black" />
                    <span>{data.rating || 'New'}</span>
                </div>
            </div>

            <p className="text-gray-500 text-sm mt-1">{data.distance || "3,250 miles away"}</p>
            <p className="text-gray-500 text-sm">{data.dates}</p>

            <div className="mt-2 flex items-baseline gap-1">
                <span className="font-semibold text-gray-900">₹{data.price}</span>
                <span className="text-gray-900">night</span>
            </div>
        </Link>
    );
};

export default ListingCard;
