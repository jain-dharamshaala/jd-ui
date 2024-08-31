import React, { useContext,useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
          navigate('/login');
        }
      }, [user, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="mb-6 text-3xl font-bold text-center">Profile Page</h1>
            {user && (
                <div className="p-6 bg-white rounded shadow-md">
                    <h2 className="mb-4 text-2xl font-bold text-gray-700">User Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Add more user details as needed */}
                </div>
            )}
        </div>
    );
}

export default ProfilePage;