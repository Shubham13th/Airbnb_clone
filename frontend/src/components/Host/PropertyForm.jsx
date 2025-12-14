import React, { useState, useEffect } from 'react';
import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai';

const PropertyForm = ({ initialData = {}, onSubmit, isEditMode = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        category: 'Villas',
        amenities: [],
        images: []
    });

    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        if (isEditMode && initialData) {
            setFormData(initialData);
            if (initialData.images) {
                setPreviewImages(initialData.images);
            }
        }
    }, [initialData, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAmenityChange = (amenity) => {
        setFormData(prev => {
            const amenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity];
            return { ...prev, amenities };
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newImages]);
        // keeping mostly for preview, real upload logic would go here
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    };

    const removeImage = (index) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const categories = ['Rooms', 'Hotels', 'Villas', 'Mountains', 'Beaches', 'Castles', 'Camping'];
    const availableAmenities = ['Wifi', 'Kitchen', 'Pool', 'Air conditioning', 'Heating', 'Washer', 'Free parking'];

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Property' : 'Add New Property'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="e.g. Luxury Beach Villa"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="City, Country"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price per night ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                placeholder="100"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Describe your place..."
                            required
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                        <div className="grid grid-cols-2 gap-2">
                            {availableAmenities.map(item => (
                                <label key={item} className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={formData.amenities.includes(item)}
                                        onChange={() => handleAmenityChange(item)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    />
                                    <span className="text-sm">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Images</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition relative">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center text-gray-500">
                                <AiOutlineCloudUpload size={40} />
                                <span className="mt-2 text-sm">Click to upload images</span>
                            </div>
                        </div>

                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {previewImages.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <AiOutlineClose size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-4 border-t pt-6">
                <button type="button" className="px-6 py-2 border border-black rounded-lg hover:bg-gray-100 font-semibold">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-rose-600 font-semibold">
                    {isEditMode ? 'Save Changes' : 'Create Property'}
                </button>
            </div>
        </form>
    );
};

export default PropertyForm;
