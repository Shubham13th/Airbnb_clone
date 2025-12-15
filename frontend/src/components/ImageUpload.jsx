import { useState } from 'react';
import config from '../config';

const ImageUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        // Get token from localStorage (assuming it's stored there for this demo)
        // In a real app, you'd use a context or state manager
        // For this scaffold, we'll assume the user manually puts the token in the code or it's just a demo component
        const token = localStorage.getItem('accessToken');

        try {
            const res = await fetch(`${config.API_BASE_URL}/api/listings`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
            const data = await res.json();
            console.log(data);
            alert('Listing created!');
        } catch (err) {
            console.error(err);
            alert('Error creating listing');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input type="file" multiple onChange={handleFileChange} />
            <button type="submit">Create Listing</button>
        </form>
    );
};

export default ImageUpload;
