import { useState, useEffect, useCallback } from 'react';
import Map, { Marker } from 'react-map-gl';
import debounce from 'lodash.debounce';
import 'mapbox-gl/dist/mapbox-gl.css';
import config from '../config';

// NOTE: You need to add your Mapbox Token here or in .env
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGZ4...'; // Replace with real token

const SearchPage = () => {
    const [listings, setListings] = useState([]);
    const [filters, setFilters] = useState({
        q: '',
        minPrice: '',
        maxPrice: '',
        guests: '',
        amenities: '',
    });
    const [viewState, setViewState] = useState({
        longitude: -74.006,
        latitude: 40.7128,
        zoom: 11,
    });

    const fetchListings = async (currentFilters) => {
        const queryParams = new URLSearchParams(currentFilters).toString();
        try {
            const res = await fetch(`${config.API_BASE_URL}/api/listings/search?${queryParams}`);
            const data = await res.json();
            setListings(data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    // Debounce search
    const debouncedFetch = useCallback(
        debounce((nextFilters) => fetchListings(nextFilters), 500),
        []
    );

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        debouncedFetch(newFilters);
    };

    useEffect(() => {
        fetchListings(filters);
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar Filters & List */}
            <div style={{ width: '40%', padding: '20px', overflowY: 'scroll' }}>
                <h2>Search Listings</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    <input
                        type="text"
                        name="q"
                        placeholder="Search destination..."
                        value={filters.q}
                        onChange={handleFilterChange}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Min Price"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Max Price"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <input
                        type="number"
                        name="guests"
                        placeholder="Guests"
                        value={filters.guests}
                        onChange={handleFilterChange}
                    />
                    <input
                        type="text"
                        name="amenities"
                        placeholder="Amenities (comma separated)"
                        value={filters.amenities}
                        onChange={handleFilterChange}
                    />
                </div>

                <div>
                    {listings.map((listing) => (
                        <div key={listing._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <h3>{listing.title}</h3>
                            <p>{listing.description}</p>
                            <p>${listing.price} / night</p>
                            <p>Guests: {listing.guests}</p>
                            <p>Amenities: {listing.amenities.join(', ')}</p>
                        </div>
                    ))}
                    {listings.length === 0 && <p>No listings found.</p>}
                </div>
            </div>

            {/* Map View */}
            <div style={{ width: '60%' }}>
                <Map
                    {...viewState}
                    onMove={(evt) => setViewState(evt.viewState)}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                >
                    {listings.map((listing) => (
                        listing.location && (
                            <Marker
                                key={listing._id}
                                longitude={listing.location.coordinates[0]}
                                latitude={listing.location.coordinates[1]}
                                anchor="bottom"
                            >
                                <div style={{ fontSize: '20px' }}>📍</div>
                            </Marker>
                        )
                    ))}
                </Map>
            </div>
        </div>
    );
};

export default SearchPage;
