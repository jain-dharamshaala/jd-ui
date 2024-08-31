import React from 'react';

function Footer() {
  return (

    <footer className="bg-gray-800 text-white py-6 fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-between">
        <a href="#about" className="hover:text-gray-400">About us</a>
        <a href="#services" className="hover:text-gray-400">Services</a>
        <a href="#contact" className="hover:text-gray-400">Contact</a>
      </div>
    </footer>
    //   <footer className="bg-slate-400 text-white fixed bottom-0 p-4 w-full">
    //   {/* Add your footer content here */}
    //   <h1 className="text-2xl">About us</h1>
    // </footer>
  );
}

export default Footer;