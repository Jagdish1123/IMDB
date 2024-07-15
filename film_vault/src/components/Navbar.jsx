// eslint-disable-next-line no-unused-vars
import React from 'react'
import Logo from '../images/logo.png'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-gray-100 shadow'>
      <img className='w-12' src={Logo} alt="Logo" />
      
      <div>
        <a className='no-underline text-gray-800 mr-4 font-bold p-2 rounded hover:bg-gray-200 hover:text-blue-500 transition-colors duration-200' href="/">Home</a>
        <a className='no-underline text-gray-800 font-bold p-2 rounded hover:bg-gray-200 hover:text-blue-500 transition-colors duration-200' href="/watchlist">Watchlist</a>
      </div>
    </div>
  )
}

export default Navbar
