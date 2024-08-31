import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Header() {
  const { user } = useContext(AuthContext);
    return (
      <header style={{'--image-url': `url(https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`}} 
      className='bg-fixed p-4 bg-[image:var(--image-url)]'> 
      <nav className="flex justify-between">
      <h1 className="text-2xl">
      <Link to="/">Jain Dharamshaala</Link>
      </h1>
      <ul className="flex space-x-4">
        {user ? (
        <li><Link to="/profile">{user ? user.name : "User"}</Link></li>
        ) : (
        <li>
          <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200">Login / Signup</Link>
        </li>
        )}
      </ul>
      </nav>
    </header>
    );
}

export default Header;