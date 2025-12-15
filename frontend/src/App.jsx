import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer
import Categories from './components/Categories';
import ListingCard from './components/ListingCard';
import Filters from './components/Filters';
import ListingDetailsPage from './pages/ListingDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { BsMapFill, BsListUl } from 'react-icons/bs';
import { BiFilter } from 'react-icons/bi';
import './App.css';

import { MOCK_LISTINGS } from './data/mockListings';
import WishlistPage from './pages/WishlistPage';
import AddPropertyPage from './pages/AddPropertyPage';
import EditPropertyPage from './pages/EditPropertyPage';
import Skeleton from './components/common/Skeleton';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [priceRange, setPriceRange] = useState([500, 50000]);
  const [minRating, setMinRating] = useState(0); // New State
  const [sortBy, setSortBy] = useState('recommended'); // New State
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const handleLoadMore = () => {
    // Placeholder for pagination
    console.log("Load more clicked");
  };

  // Fetch listings from API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/listings');
        const data = await res.json();
        if (data.listings && Array.isArray(data.listings)) {
          setListings(data.listings);
        } else if (Array.isArray(data)) {
          setListings(data);
        } else {
          console.error("API did not return a listings array:", data);
          setListings([]);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const checkCategory = (listing, selectedCategory) => {
    return !selectedCategory || selectedCategory === 'All' || listing.category === selectedCategory;
  };

  const filteredListings = listings.filter(listing => {
    const matchesCategory = checkCategory(listing, selectedCategory);
    const location = typeof listing.location === 'string' ? listing.location : '';
    const title = typeof listing.title === 'string' ? listing.title : '';
    const description = typeof listing.description === 'string' ? listing.description : '';
    const category = typeof listing.category === 'string' ? listing.category : '';

    // Enhanced Search: Check title, location, description, and category
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = location.toLowerCase().includes(searchLower) ||
      title.toLowerCase().includes(searchLower) ||
      description.toLowerCase().includes(searchLower) ||
      category.toLowerCase().includes(searchLower);

    // Check Date Range availability (Mock logic: just check if dates provided)
    // Real logic would calculate overlap
    const matchesDates = (!dateRange.startDate || !dateRange.endDate) ? true : true;

    // Check Guest Count
    const matchesGuests = listing.guests >= guests;

    const price = parseInt(listing.price || 0);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

    // Handle missing rating safely
    const ratingValue = listing.rating ? parseFloat(listing.rating) : 4.5; // Default to 4.5 if no rating
    const matchesRating = ratingValue >= minRating;

    return matchesCategory && matchesSearch && matchesDates && matchesGuests && matchesPrice && matchesRating;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return parseInt(a.price || 0) - parseInt(b.price || 0);
    if (sortBy === 'price_desc') return parseInt(b.price || 0) - parseInt(a.price || 0);
    if (sortBy === 'rating') return (parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
    return 0; // recommended
  });

  return (
    <AuthProvider>
      <div className="App">
        <Navbar
          setSearchQuery={setSearchQuery}
          searchQueryLocal={searchQuery}
          dateRange={dateRange}
          guests={guests}
          setDateRange={setDateRange}
          setGuests={setGuests}
        />

        <Routes>
          <Route path="/" element={
            <>
              <Categories
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <div className="main-content pt-4">
                {!showMap ? (
                  <>
                    {isLoading ? (
                      <div className="listings-grid">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="flex flex-col gap-3">
                            <Skeleton height="280px" className="w-full" />
                            <Skeleton height="20px" width="70%" />
                            <Skeleton height="16px" width="40%" />
                          </div>
                        ))}
                      </div>
                    ) : filteredListings.length > 0 ? (
                      <>
                        <div className="listings-grid">
                          {filteredListings.map((listing) => (
                            <ListingCard key={listing._id} data={listing} />
                          ))}
                        </div>
                        <div className="load-more-container">
                          <button className="load-more-btn" onClick={handleLoadMore}>
                            Load more properties
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold mb-2">No results found</h2>
                        <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <button
                          onClick={() => { setSearchQuery(''); setPriceRange([0, 1000]); setMinRating(0); setSelectedCategory('All'); }}
                          className="mt-6 px-6 py-2 border border-black rounded-lg hover:bg-gray-100 font-semibold"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="map-placeholder">
                    <p>Interactive Map View</p>
                    <span>(Coming Soon)</span>
                  </div>
                )}

                <div className="map-toggle-container">
                  <button className="map-toggle-btn" onClick={() => setShowMap(!showMap)}>
                    {showMap ? (
                      <>
                        Show List <BsListUl />
                      </>
                    ) : (
                      <>
                        Show Map <BsMapFill />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <Filters
                isOpen={isFiltersOpen}
                onClose={() => setIsFiltersOpen(false)}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
              />
            </>
          } />
          <Route path="/listing/:id" element={<ListingDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
          <Route path="/book/confirm" element={
            <ProtectedRoute>
              <BookingConfirmationPage />
            </ProtectedRoute>
          } />
          <Route path="/booking/success" element={
            <ProtectedRoute>
              <BookingSuccessPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/host/add-property" element={<AddPropertyPage />} />
          <Route path="/host/edit-property/:id" element={<EditPropertyPage />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
