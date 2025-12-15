const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Listing = require('./models/Listing');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Listing.deleteMany();
        await User.deleteMany();

        const createdUser = await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: 'password123',
        });

        const adminId = createdUser._id;

        const amenitiesList = ['Wifi', 'Pool', 'AC', 'Kitchen', 'Parking'];

        const indianListings = [
            // --- BANDRA ---
            {
                title: 'Celebrity Style Sea-View Apt, Bandstand',
                description: 'Live like a star in this ultra-luxurious apartment right on Bandra Bandstand. Offering panoramic views of the Arabian Sea, this home features floor-to-ceiling windows, a private deck, and contemporary interiors. Just steps away from Shah Rukh Khan\'s Mannat.',
                image: 'https://images.unsplash.com/photo-1512918760532-3ad8386b83f9?w=720',
                images: [
                    'https://images.unsplash.com/photo-1512918760532-3ad8386b83f9?w=720',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=720',
                    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=720'
                ],
                location: 'Bandstand, Bandra West, Mumbai',
                price: 5000,
                category: 'Amazing pools',
                guests: 4,
                user: adminId
            },
            {
                title: 'Cozy Pali Hill Cottage',
                description: 'A quaint and peaceful cottage tucked away in the lush greenery of Pali Hill. Experience the old-world charm of Bandra with modern comforts. Walking distance to hip cafes and Candies.',
                image: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?w=720',
                images: [
                    'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?w=720',
                    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=720'
                ],
                location: 'Pali Hill, Bandra West, Mumbai',
                price: 3500,
                category: 'Cabins',
                guests: 2,
                user: adminId
            },
            {
                title: 'Modern Loft on Carter Road',
                description: 'Stylish seafront loft on Carter Road promenade. Perfect for evening walks by the ocean. Features a minimalist design, high-speed wifi, and a fully stocked kitchen.',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720',
                images: [
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720',
                    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=720'
                ],
                location: 'Carter Road, Bandra West, Mumbai',
                price: 4500,
                category: 'Beach',
                guests: 3,
                user: adminId
            },

            // --- JUHU ---
            {
                title: 'Opulent Juhu Beach Villa',
                description: 'Direct access to Juhu Beach. This sprawling private villa offers a large swimming pool, landscaped gardens, and 5 master bedrooms. Ideal for large families and events.',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=720',
                images: [
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=720',
                    'https://images.unsplash.com/photo-1576013551627-5cc20b368678?w=720'
                ],
                location: 'Juhu Tara Road, Mumbai',
                price: 12000,
                category: 'Villas',
                guests: 10,
                user: adminId
            },
            {
                title: 'Sea-Facing Apartment near JW Marriott',
                description: 'Luxury apartment situated right next to JW Marriott Juhu. Enjoy sunset views from your balcony.',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=720',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=720',
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=720'
                ],
                location: 'Juhu, Mumbai',
                price: 6000,
                category: 'Amazing pools',
                guests: 4,
                user: adminId
            },

            // --- COLABA / SOUTH BOMBAY ---
            {
                title: 'Heritage Suite near Gateway of India',
                description: 'Stay in a 100-year-old restored heritage building just 5 minutes from the Gateway of India and Taj Mahal Palace hotel. High ceilings, vintage furniture, and royal vibes.',
                image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=720',
                images: [
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=720',
                    'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=720'
                ],
                location: 'Colaba Causeway, Mumbai',
                price: 4000,
                category: 'Castles',
                guests: 3,
                user: adminId
            },
            {
                title: 'Art Deco Flat on Marine Drive',
                description: 'Experience the Queen\'s Necklace from this stunning Art Deco apartment on Marine Drive. Uninterrupted ocean views and sea breeze all day long.',
                image: 'https://images.unsplash.com/photo-1502005229762-cf1e2a862d82?w=720',
                images: [
                    'https://images.unsplash.com/photo-1502005229762-cf1e2a862d82?w=720',
                    'https://images.unsplash.com/photo-1512918760532-3ad8386b83f9?w=720'
                ],
                location: 'Marine Drive, Mumbai',
                price: 7500,
                category: 'Beach',
                guests: 5,
                user: adminId
            },
            {
                title: 'Luxury High-Rise in Worli',
                description: 'Ultra-modern apartment in a Worli skyscraper offering views of the Sea Link and the city skyline. Amenities include a gym, infinity pool, and concierge.',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=720',
                images: [
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=720',
                    'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=720'
                ],
                location: 'Worli Sea Face, Mumbai',
                price: 9000,
                category: 'Amazing pools',
                guests: 4,
                user: adminId
            },

            // --- ANDHERI / VERSOVA ---
            {
                title: 'Bohemian Studio in Versova',
                description: 'A quirky, artistic studio in the heart of Versova village. Close to cafes, the beach, and the metro. Ideal for creative professionals and solo travelers.',
                image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=720',
                images: [
                    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=720',
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=720'
                ],
                location: 'Versova, Andheri West, Mumbai',
                price: 2500,
                category: 'Rooms',
                guests: 2,
                user: adminId
            },
            {
                title: 'Spacious 3BHK in Lokhandwala',
                description: 'Large family apartment in the bustling neighborhood of Lokhandwala Complex. Close to shopping malls, cinemas, and restaurants.',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720',
                images: [
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720',
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=720'
                ],
                location: 'Lokhandwala, Andheri West, Mumbai',
                price: 4500,
                category: 'Hotels',
                guests: 6,
                user: adminId
            },

            // --- POWAI ---
            {
                title: 'Lake View Residency, Powai',
                description: 'Serene apartment overlooking Powai Lake and Hiranandani Gardens. Enjoy the European architecture and green surroundings.',
                image: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=720',
                images: [
                    'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=720',
                    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=720'
                ],
                location: 'Hiranandani Gardens, Powai, Mumbai',
                price: 3800,
                category: 'Amazing pools',
                guests: 4,
                user: adminId
            },

            // --- OTHER INDIAN CITIES (Kept for variety) ---
            {
                title: 'Royal Palace Stay in Jaipur',
                description: 'Experience royalty in the Pink City. This haveli feature courtyards, fountains, and traditional Rajasthani decor.',
                image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=720',
                images: [
                    'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=720',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=720'
                ],
                location: 'Jaipur, Rajasthan',
                price: 5500,
                category: 'Castles',
                guests: 8,
                user: adminId
            },
            {
                title: 'Goa Beach Hut',
                description: 'Right on the sands of Palolem Beach. Fall asleep to the sound of waves.',
                image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=720',
                images: [
                    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=720',
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=720'
                ],
                location: 'Palolem, Goa',
                price: 2000,
                category: 'Beach',
                guests: 2,
                user: adminId
            },
            {
                title: 'Houseboat in Alleppey',
                description: 'Traditional Kerala houseboat cruise with bedrooms and onboard chef.',
                image: 'https://images.unsplash.com/photo-1593693396865-b5d158a741e5?w=720',
                images: [
                    'https://images.unsplash.com/photo-1593693396865-b5d158a741e5?w=720',
                    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=720'
                ],
                location: 'Alleppey, Kerala',
                price: 6500,
                category: 'Boats',
                guests: 4,
                user: adminId
            },
            {
                title: 'Penthouse in South Delhi',
                description: 'Luxurious penthouse in Greater Kailash with private terrace garden.',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720',
                images: [
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720'
                ],
                location: 'Greater Kailash, New Delhi',
                price: 5200,
                category: 'Amazing pools',
                guests: 4,
                user: adminId
            }
        ];

        await Listing.insertMany(indianListings);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Listing.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
