import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineCloudUpload } from 'react-icons/ai';

const PropertyForm = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        description: '',
        image: '',
        amenities: [] // Simplified for demo
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ title: '', location: '', price: '', description: '', image: '', amenities: [] });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '600px',
                maxHeight: '90vh', overflowY: 'auto', padding: '24px', position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '24px', left: '24px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <AiOutlineClose size={20} />
                </button>

                <h2 style={{ textAlign: 'center', marginTop: '0', marginBottom: '24px' }}>
                    {initialData ? 'Edit Property' : 'Add New Property'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Image Upload Placeholder */}
                    <div style={{
                        border: '1px dashed #b0b0b0', borderRadius: '8px', padding: '40px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#717171', cursor: 'pointer'
                    }}>
                        <AiOutlineCloudUpload size={48} />
                        <span>Drag your photos here</span>
                        <span style={{ fontSize: '12px', textDecoration: 'underline' }}>Choose from your device</span>
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#717171' }}>TITLE</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Cozy cottage..."
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#717171' }}>LOCATION</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="San Francisco, CA"
                            className="form-input"
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#717171' }}>PRICE / NIGHT ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="150"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#717171' }}>DESCRIPTION</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell guests about your place..."
                            className="form-input"
                            rows={4}
                        />
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button type="button" onClick={onClose} style={{
                            background: 'white', border: '1px solid #222', color: '#222', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" className="auth-btn" style={{ margin: 0, width: 'auto' }}>
                            {initialData ? 'Save Changes' : 'Create Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyForm;
