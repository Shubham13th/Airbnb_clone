import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';


const PropertiesList = ({ properties = [], onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
            // onDelete(id); // If prop provided
            alert("Property deleted (Mock)");
        }
    };

    if (properties.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="text-lg font-semibold text-gray-900">No properties listed</h3>
                <p className="text-gray-500">Ready to earn money as a host? List your first property today.</p>
                <button
                    onClick={() => navigate('/host/add-property')}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-rose-600"
                >
                    List your property
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {properties.map(prop => (
                <div key={prop.id} style={{ position: 'relative', border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ height: '200px' }}>
                        <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3 style={{ fontSize: '15px', margin: '0 0 4px 0' }}>{prop.title}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                                <AiFillStar /> {prop.rating}
                            </div>
                        </div>
                        <p style={{ color: '#717171', fontSize: '14px', margin: '0' }}>{prop.location}</p>
                        <p style={{ marginTop: '8px', fontWeight: '600' }}>${prop.price} <span style={{ fontWeight: '400' }}>night</span></p>
                    </div>

                    {/* Action Overlay */}
                    <div style={{
                        position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px'
                    }}>
                        <button
                            onClick={() => navigate(`/host/edit-property/${prop.id}`)}
                            style={{
                                background: 'white', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <AiOutlineEdit size={16} />
                        </button>
                        <button
                            onClick={() => handleDelete(prop.id)}
                            style={{
                                background: 'white', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#ff385c'
                            }}
                        >
                            <AiOutlineDelete size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertiesList;
