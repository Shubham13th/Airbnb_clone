import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';

const BookingModal = ({ listing, onClose }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [guests, setGuests] = useState(1);
    const [bookingStep, setBookingStep] = useState('select'); // select, confirm, success
    const [bookingData, setBookingData] = useState(null);

    const nights = differenceInDays(endDate, startDate);
    const totalPrice = nights > 0 ? nights * listing.price : 0;

    const handleHold = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:5000/api/bookings/hold', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    listingId: listing._id,
                    startDate,
                    endDate,
                    guests,
                    totalPrice,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setBookingData(data);
                setBookingStep('confirm');
            } else {
                if (data.message === 'Not authorized, token expired') {
                    alert('Your session has expired. Please log in again.');
                    // Ideally we would access logout here but this component doesn't use useAuth yet. 
                    // For now just redirect or let the user manually logout.
                    // A better fix would be to pass logout as prop or useAuth
                    location.reload();
                } else {
                    alert(data.message);
                }
            }
        } catch (error) {
            console.error(error);
            alert('Booking failed');
        }
    };

    const handleConfirm = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/api/bookings/confirm/${bookingData._id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                setBookingStep('success');
            } else {
                if (data.message === 'Not authorized, token expired') {
                    alert('Your session has expired. Please log in again.');
                    location.reload();
                } else {
                    alert(data.message);
                }
            }
        } catch (error) {
            console.error(error);
            alert('Confirmation failed');
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
                <h2>Book {listing.title}</h2>

                {bookingStep === 'select' && (
                    <>
                        <div>
                            <label>Dates:</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} />
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
                            </div>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <label>Guests:</label>
                            <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" max={listing.guests} />
                        </div>
                        <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                            <p>Price: ${listing.price} x {nights} nights</p>
                            <h3>Total: ${totalPrice}</h3>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={handleHold} disabled={nights <= 0}>Reserve</button>
                        </div>
                    </>
                )}

                {bookingStep === 'confirm' && (
                    <>
                        <p>Your booking is held for 15 minutes.</p>
                        <h3>Total to Pay: ${bookingData.totalPrice}</h3>
                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={handleConfirm}>Pay & Confirm</button>
                        </div>
                    </>
                )}

                {bookingStep === 'success' && (
                    <>
                        <h3 style={{ color: 'green' }}>Booking Confirmed!</h3>
                        <button onClick={onClose} style={{ marginTop: '20px' }}>Close</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
