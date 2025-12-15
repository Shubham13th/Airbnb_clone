import React from 'react';
import Navbar from '../components/Navbar';
import PropertyForm from '../components/Host/PropertyForm';
import { useNavigate } from 'react-router-dom';

const AddPropertyPage = () => {
    const navigate = useNavigate();

    const handleCreate = async (rawFormData) => {
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();

            // Append simple fields
            Object.keys(rawFormData).forEach(key => {
                if (key !== 'imageFiles' && key !== 'images' && key !== 'amenities') {
                    data.append(key, rawFormData[key]);
                }
            });

            // Append amenities as array
            // Backend might expect comma separated or array. 
            // Controller: const amenitiesArray = amenities.split(','); (in search)
            // But createListing model expects array of strings? Mongoose handles array of strings if passed multiple times with same key or indices.
            // Let's check model... Listing.js not fully visible but schema implies [String].
            // Usually data.append('amenities', item) for each item works for multer/express if configured, 
            // OR JSON.stringify it if backend manually parses.
            // Let's assume sending each amenity separately works for array.
            if (rawFormData.amenities) {
                rawFormData.amenities.forEach(amenity => data.append('amenities[]', amenity));
            }

            // Append files
            if (rawFormData.imageFiles) {
                rawFormData.imageFiles.forEach(file => {
                    data.append('images', file);
                });
            }

            const res = await fetch('http://localhost:5000/api/listings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            if (res.ok) {
                alert("Property Created Successfully!");
                navigate('/dashboard?tab=hosting');
            } else {
                const data = await res.json();
                alert(data.message || "Failed to create property");
            }
        } catch (error) {
            console.error("Error creating property:", error);
            alert("An error occurred");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto mb-6">
                    <h1 className="text-3xl font-bold">Become a Host</h1>
                    <p className="text-gray-600">Fill in the details to list your property</p>
                </div>
                <PropertyForm onSubmit={handleCreate} />
            </div>
        </div>
    );
};

export default AddPropertyPage;
