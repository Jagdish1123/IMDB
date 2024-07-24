/* eslint-disable no-unused-vars */
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importing icons from Font Awesome

const pagination = ({ pageNo, totalPages, goToNextPage, goToPrevPage }) => {
  return (
    <div className='bg-gray-200 p-4 flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <div className={`p-1 rounded-full bg-white ${pageNo === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={goToPrevPage}>
          <FaArrowLeft className='text-gray-600' />
        </div>
        <div className='p-1 text-lg font-medium text-gray-800'>{pageNo}</div> {/* Current page number */}
        <div className={`p-1 rounded-full bg-white ${pageNo === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={goToNextPage}>
          <FaArrowRight className='text-gray-600' />
        </div>
      </div>
      <div className='text-sm text-gray-600'>
        Page {pageNo} of {totalPages}
      </div>
    </div>
  );
}

export default pagination;
