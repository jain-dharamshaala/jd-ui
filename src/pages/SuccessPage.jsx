import React from 'react';
import { useLocation } from 'react-router-dom';

function SuccessPage() {
    const { state } = useLocation();
    const { bookingId } = state;

    return (
        <div className="p-4">
            <h1 className="mb-2 text-2xl font-bold">Booking Successful</h1>
            <p>Your booking ID is: {bookingId}</p>
        </div>
    );
}

export default SuccessPage;