import React from 'react';
import Navbar from '../components/Navbar';
import PropertyForm from '../components/Host/PropertyForm';
import { useNavigate } from 'react-router-dom';

const AddPropertyPage = () => {
    const navigate = useNavigate();

    const handleCreate = (data) => {
        console.log("Creating Property:", data);
        // Here we would call API to create property
        alert("Property Created Successfully!");
        navigate('/dashboard?tab=hosting');
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
