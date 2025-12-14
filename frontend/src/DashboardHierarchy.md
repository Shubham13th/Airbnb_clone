# Frontend Component Hierarchy

## App Structure
- `App.jsx` (Router)
    - `Layout.jsx` (Navbar, Footer)
        - `HomePage.jsx` (Search, Categories, Featured Listings)
        - `ListingDetailsPage.jsx` (Images, Info, BookingModal)
        - `SearchPage.jsx` (Map, Filters, List)
        - `LoginPage.jsx`
        - `SignupPage.jsx`
        - **Protected Routes**:
            - `DashboardLayout.jsx` (Sidebar)
                - **User Dashboard**:
                    - `UserBookings.jsx` (List of past/upcoming trips)
                    - `UserMessages.jsx` (Inbox)
                    - `UserReviews.jsx` (Reviews written by user)
                - **Host Dashboard** (Requires `role === 'host'`):
                    - `HostListings.jsx` (CRUD Listings)
                    - `HostBookings.jsx` (Manage reservations)
                    - `HostCalendar.jsx` (Availability view)
                    - `HostEarnings.jsx` (Chart/Stats)

## Key Components
- `Navbar`: Conditional links based on auth & role.
- `BookingModal`: Handles "Hold" and "Confirm" flow.
- `ListingCard`: Reusable card for search/home.
- `Map`: Mapbox integration.
