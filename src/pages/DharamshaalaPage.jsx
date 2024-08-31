import React, { useState, useEffect } from 'react';
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

function DharamshaalaPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const checkInDate = state?.checkInDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const checkOutDate = state?.checkOutDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [dharamshaala, setDharamshaala] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(null);

  useEffect(() => {
    const fetchDharamshaala = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/dharamshaalas/${id}/get-availability`,{
            params: {
                checkinDate: checkInDate,
                checkoutDate: checkOutDate
            }
        });
        console.log(response);
        setDharamshaala(response.data.dharamshaala);
        setAvailableRooms(response.data.availableRooms);
      } catch (error) {
        console.log('Fetch dharamshaala failed', error);
        // Show error message
      }
    };

    fetchDharamshaala();
  }, [id, checkInDate, checkOutDate]);

  if (!dharamshaala || !availableRooms) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-2 text-2xl font-bold">{dharamshaala.name}</h1>
      <p>{dharamshaala.description}</p>
      <div className="mt-4 mb-2">
      <label className="mr-2">Check-in Date:</label>
      <input type="date" value={checkInDate} disabled />
    </div>
    <div className="mt-4 mb-2">
      <label className="mr-2">Check-out Date:</label>
      <input type="date" value={checkOutDate} disabled />
    </div>
      <h2 className="mt-4 mb-2 text-xl font-bold">Available Rooms</h2>
      {Object.entries(availableRooms).map(([roomType, rooms], index) => (
      <div key={index}>
        <h3 className="mb-2 text-lg font-bold">{roomType}</h3>
        {rooms.slice(0, 1).map((room, index) => (
          <div key={index} className="mb-2 p-4 bg-white rounded shadow-md">
            <p>Room Number: {room.room_number}</p>
            <p>Price: {room.price}</p>
            {room.images.map((image, index) => (
              <img key={index} src={`http://localhost:9000/api/images/${image}`} alt={`Room ${room.room_number}`} className="w-64 h-64 object-cover mb-4" />
            ))}
            <button 
      onClick={() => navigate('/pre-book', { 
        state : {dharamshaala, 
            checkInDate, 
            checkOutDate, 
            price: room.price, 
            selectedRoom: room }
      })}
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Book
    </button>
          </div>
        ))}
      </div>
    ))}
    </div>
  );
}

export default DharamshaalaPage;