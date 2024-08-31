import React from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

function PreBookPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dharamshaala, checkInDate, checkOutDate, price, selectedRoom } = state;

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const totalPrice = days * price;

    const handleBook = async () => {
        try {
          const response = await axios.post('http://localhost:9000/api/bookings/book', {
            dharamshaala_id: dharamshaala._id,
            room_id: selectedRoom._id,
            checkinDate : checkInDate,
            checkoutDate : checkOutDate,
            "customerId": "65fe7711b82d72e3d24ebbe4",
            perNightPrice: price,
          });
    
          navigate('/success', { state: { bookingId: response.data._id } });
        } catch (error) {
          console.error('Failed to book:', error);
        }
      };

    return (
        <div className="p-4">
            <h1 className="mb-2 text-2xl font-bold">Booking Details</h1>
            <p>Dharamshaala: {dharamshaala.name}</p>
            <p>Room Number: {selectedRoom.room_number}</p>
            <p>Check-in Date: {checkInDate}</p>
            <p>Check-out Date: {checkOutDate}</p>
            <p>Price per Night: {price}</p>
            <p>Total Price: {totalPrice}</p>
            <button onClick={handleBook} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Confirm & Book
      </button>
        </div>
    );
}

export default PreBookPage;