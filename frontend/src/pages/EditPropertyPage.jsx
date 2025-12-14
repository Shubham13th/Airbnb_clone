import React from 'react';
import Navbar from '../components/Navbar';
import PropertyForm from '../components/Host/PropertyForm';
import { useNavigate, useParams } from 'react-router-dom';

const EditPropertyPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock fetching data based on ID
    const initialData = {
        title: "Whitefish Estate",
        location: "Whitefish, Montana",
        price: 350,
        description: "A beautiful estate in the mountains...",
        category: "Mountains",
        amenities: ["Wifi", "Kitchen", "Pool"],
        images: ["https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/9da40e3c-5846-4dc0-95f2-1695dd88df3d.jpeg?im_w=720"]
    };

    const handleUpdate = (data) => {
        console.log("Updating Property:", data);
        // Here we would call API to update property
        alert("Property Updated Successfully!");
        navigate('/dashboard?tab=hosting');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto mb-6">
                    <h1 className="text-3xl font-bold">Edit Property</h1>
                    <p className="text-gray-600">Update your listing details</p>
                </div>
                <PropertyForm
                    initialData={initialData}
                    onSubmit={handleUpdate}
                    isEditMode={true}
                />
            </div>
        </div>
    );
};

export default EditPropertyPage;
