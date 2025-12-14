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
            {
                title: 'Luxury Apartment in South Delhi',
                description: 'Experience luxury in this beautiful property located in the heart of Greater Kailash, New Delhi. Featuring amazing pools and modern amenities.',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720',
                images: [
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720',
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=720'
                ],
                location: 'Greater Kailash, New Delhi',
                price: 15000,
                category: 'Amazing pools',
                guests: 4,
                user: adminId
            },
            {
                title: 'Heritage Haveli near Connaught Place',
                description: 'A beautiful heritage haveli located near Connaught Place. Perfect for a royal stay.',
                image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=720',
                images: [
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=720',
                    'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=720'
                ],
                location: 'Connaught Place, New Delhi',
                price: 18000,
                category: 'Castles',
                guests: 6,
                user: adminId
            },
            {
                title: 'Modern Loft in Hauz Khas',
                description: 'A trendy modern loft in the heart of Hauz Khas Village.',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=720',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=720',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720'
                ],
                location: 'Hauz Khas Village, New Delhi',
                price: 12000,
                category: 'Cabins',
                guests: 2,
                user: adminId
            },
            {
                title: 'Sea-Facing Penthouse',
                description: 'Stunning sea-facing penthouse on Marine Drive.',
                image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=720',
                images: [
                    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=720',
                    'https://images.unsplash.com/photo-1512918760532-3ad8386b83f9?w=720'
                ],
                location: 'Marine Drive, Mumbai, Maharashtra',
                price: 35000,
                category: 'Amazing pools',
                guests: 6,
                user: adminId
            },
            {
                title: 'Gateway of India View Apartment',
                description: 'Apartment with a view of the Gateway of India.',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720',
                images: [
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720',
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=720'
                ],
                location: 'Colaba, Mumbai, Maharashtra',
                price: 28000,
                category: 'Beach',
                guests: 5,
                user: adminId
            },
            {
                title: 'Bandra Bandstand Villa',
                description: 'Luxurious villa in Bandra Bandstand.',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=720',
                images: [
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=720',
                    'https://images.unsplash.com/photo-1512918760532-3ad8386b83f9?w=720'
                ],
                location: 'Bandra West, Mumbai, Maharashtra',
                price: 45000,
                category: 'Castles',
                guests: 8,
                user: adminId
            },
            {
                title: 'High-Rise Penthouse',
                description: 'Penthouse with city views in Indiranagar.',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=720',
                images: [
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=720',
                    'https://images.unsplash.com/photo-1512918760532-3ad8386b83f9?w=720'
                ],
                location: 'Indiranagar, Bangalore, Karnataka',
                price: 20000,
                category: 'Amazing pools',
                guests: 6,
                user: adminId
            },
            {
                title: 'Garden City Villa',
                description: 'Spacious villa in Whitefield.',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=720',
                images: [
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=720',
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=720'
                ],
                location: 'Whitefield, Bangalore, Karnataka',
                price: 17500,
                category: 'Amazing pools',
                guests: 7,
                user: adminId
            },
            {
                title: 'Luxury Hills Villa',
                description: 'Exclusive villa in Jubilee Hills.',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=720',
                images: [
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=720',
                    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=720'
                ],
                location: 'Jubilee Hills, Hyderabad, Telangana',
                price: 25000,
                category: 'Castles',
                guests: 10,
                user: adminId
            },
            {
                title: 'Lake View Apartment',
                description: 'Apartment with scenic lake views.',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720',
                images: [
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720',
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=720'
                ],
                location: 'Hitech City, Hyderabad, Telangana',
                price: 14000,
                category: 'Amazing pools',
                guests: 4,
                user: adminId
            },
            {
                title: 'Victorian Heritage Home',
                description: 'Classic Victorian home on Park Street.',
                image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=720',
                images: [
                    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=720',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=720'
                ],
                location: 'Park Street, Kolkata, West Bengal',
                price: 11000,
                category: 'Castles',
                guests: 5,
                user: adminId
            },
            {
                title: 'Salt Lake Luxury Stay',
                description: 'Modern luxury stay in Salt Lake City.',
                image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=720',
                images: [
                    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=720',
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720'
                ],
                location: 'Salt Lake City, Kolkata, West Bengal',
                price: 8500,
                category: 'Cabins',
                guests: 4,
                user: adminId
            },
            {
                title: 'Luxury Beachfront Villa - Candolim',
                description: 'Direct beach access in Candolim.',
                image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=720',
                images: [
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=720',
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=720'
                ],
                location: 'Candolim, Goa',
                price: 18500,
                category: 'Beach',
                guests: 8,
                user: adminId
            },
            {
                title: 'Premium Sea-View Apartment',
                description: 'Sea-view apartment in Calangute.',
                image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=720',
                images: [
                    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=720',
                    'https://images.unsplash.com/photo-1512918760532-3ad8386b83f9?w=720'
                ],
                location: 'Calangute, Goa',
                price: 12000,
                category: 'Beach',
                guests: 6,
                user: adminId
            },
            {
                title: 'Royal Heritage Haveli',
                description: 'Live like royalty in Jaipur.',
                image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=720',
                images: [
                    'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=720',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=720'
                ],
                location: 'Pink City, Jaipur, Rajasthan',
                price: 22000,
                category: 'Castles',
                guests: 10,
                user: adminId
            },
            {
                title: 'Lake Palace Suite',
                description: 'Exquisite suite overlooking Lake Pichola.',
                image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=720',
                images: [
                    'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=720',
                    'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=720'
                ],
                location: 'Lake Pichola, Udaipur, Rajasthan',
                price: 45000,
                category: 'Castles',
                guests: 6,
                user: adminId
            },
            {
                title: 'Himalayan Mountain Cottage',
                description: 'Cozy cottage with mountain views.',
                image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=720',
                images: [
                    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=720',
                    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=720'
                ],
                location: 'Old Manali, Himachal Pradesh',
                price: 12000,
                category: 'Cabins',
                guests: 4,
                user: adminId
            },
            {
                title: 'Premium Luxury Houseboat',
                description: 'Floating luxury in Kerala backwaters.',
                image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=720',
                images: [
                    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=720',
                    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=720'
                ],
                location: 'Alleppey Backwaters, Kerala',
                price: 25000,
                category: 'Boats',
                guests: 6,
                user: adminId
            },
            {
                title: 'Sea Breeze Villa',
                description: 'Breezy villa on ECR road.',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=720',
                images: [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=720',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=720'
                ],
                location: 'ECR, Chennai, Tamil Nadu',
                price: 16000,
                category: 'Beach',
                guests: 8,
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
