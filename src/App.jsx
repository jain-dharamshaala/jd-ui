import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import DharamshaalaPage from './pages/DharamshaalaPage';
import PreBookPage from './pages/PreBookPage';
import SuccessPage from './pages/SuccessPage';



function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dharamshaala/:id" element={<DharamshaalaPage />} />
        <Route path="/pre-book" element={<PreBookPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
      <Footer />
    </Router>
    </AuthContext.Provider>
  );
}

export default App;