// eslint-disable-next-line no-unused-vars
import React from 'react';
import Logo from '../images/logo.png';
// import './Navbar.css'; // Remove if not needed

const Navbar = () => {
  return (
    <div className='navbar flex justify-between items-center p-4 bg-gray-100 shadow'>
      <img className='w-12' src={Logo} alt="Logo" />
      <div className="p-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-3xl font-bold text-center">
        Welcome To Your Movie Adventure
      </div>






      <div>
        <a
          className='
            bg-black-600
            hover:bg-red-600 
            no-underline 
            text-white 
            mr-4 
            font-bold 
            px-4 
            py-2 
            rounded 
            transition-all 
            duration-300 
            transform 
            hover:scale-105 
            shadow-lg 
            hover:shadow-xl
          '
          href="/"
        >
          Home
        </a>
        <a
          className='
            bg-black-600
            hover:bg-red-600 
            no-underline 
            text-white 
            mr-4 
            font-bold 
            px-4 
            py-2 
            rounded 
            transition-all 
            duration-300 
            transform 
            hover:scale-105 
            shadow-lg 
            hover:shadow-xl
          '
          href="/watchlist"
        >
          Watchlist
        </a>
      </div>
    </div>
  );
}

export default Navbar;
