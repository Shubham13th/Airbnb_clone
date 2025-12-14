import React from 'react';

const Skeleton = ({ className, width, height, variant = "rect" }) => {
    const baseClasses = "bg-gray-200 animate-pulse";
    const variantClasses = variant === "circle" ? "rounded-full" : "rounded-lg";

    return (
        <div
            className={`${baseClasses} ${variantClasses} ${className}`}
            style={{ width, height }}
        />
    );
};

export default Skeleton;
