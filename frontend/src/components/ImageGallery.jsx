import React from 'react';
import '../styles/components/ImageGallery.css';

const ImageGallery = ({ images }) => {
    // Fallback images if none provided
    const galleryImages = images || [
        'https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/9da40e3c-5846-4dc0-95f2-1695dd88df3d.jpeg?im_w=1200',
        'https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/12345678-abc-def-123.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/12345678-abc-def-456.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/12345678-abc-def-789.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/12345678-abc-def-000.jpeg?im_w=720',
    ];

    return (
        <div className="image-gallery-container">
            <div className="gallery-main-image">
                <img src={galleryImages[0]} alt="Main property view" />
            </div>
            <div className="gallery-sub-images">
                {galleryImages.slice(1, 5).map((img, index) => (
                    <div key={index} className="gallery-sub-image-item">
                        <img src={img} alt={`Property view ${index + 2}`} />
                    </div>
                ))}
            </div>
            <button className="show-all-photos-btn">Show all photos</button>
        </div>
    );
};

export default ImageGallery;
