/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import genres from '../utility/genre';

const Watchlist = ({ watchlist, setWatchlist, handleRemoveFromWatchList }) => {
  const [search, setSearch] = useState('');
  const [genreList, setGenreList] = useState(['All Genres']);
  const [currgenre, setCurrgenre] = useState('All Genres');

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleGenreChange = (genre) => {
    setCurrgenre(genre);
  };

  const sortIncreasing = () => {
    const sorted = [...watchlist].sort((movieA, movieB) => movieA.vote_average - movieB.vote_average);
    setWatchlist(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...watchlist].sort((movieA, movieB) => movieB.vote_average - movieA.vote_average);
    setWatchlist(sorted);
  };

  useEffect(() => {
    let temp = watchlist.flatMap((movieObj) => {
      return movieObj.genre_ids.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : null;
      });
    });
    setGenreList(['All Genres', ...temp.filter((genre, index, self) => self.indexOf(genre) === index)]);
  }, [watchlist]);

  return (
    <div className="p-8">
      {/* Genre Filter */}
      <div className='flex flex-wrap justify-center gap-2 mb-6'>
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleGenreChange(genre)}
            className={`flex items-center justify-center h-12 w-36 rounded-xl font-semibold p-3 cursor-pointer transition-transform duration-300 ${currgenre === genre ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className='flex justify-center mb-6'>
        <input 
          onChange={handleSearch} 
          value={search} 
          type="text" 
          placeholder='Search Movies' 
          className='h-12 w-72 bg-gray-100 border border-gray-300 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Movies Table */}
      <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-lg'>
        <table className='w-full text-gray-700 text-sm border-separate border-spacing-0'>
          <thead className='bg-gray-100 border-b border-gray-300'>
            <tr>
              <th className='py-3 px-4 text-left font-semibold border-r border-gray-300'>Name</th>
              <th className='py-3 px-4 font-semibold border-r border-gray-300'>
                <div className='flex items-center justify-center space-x-2'>
                  <div onClick={sortIncreasing} className='p-2 cursor-pointer hover:bg-gray-200 rounded-full'>
                    <FaArrowUp className='text-gray-600' />
                  </div>
                  <span>Ratings</span>
                  <div onClick={sortDecreasing} className='p-2 cursor-pointer hover:bg-gray-200 rounded-full'>
                    <FaArrowDown className='text-gray-600' />
                  </div>
                </div>
              </th>
              <th className='py-3 px-4 font-semibold border-r border-gray-300'>Popularity</th>
              <th className='py-3 px-4 font-semibold border-r border-gray-300'>Genre</th>
              <th className='py-3 px-4 font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currgenre === 'All Genres') {
                  return true;
                } else {
                  const genre = genres.find(g => g.name === currgenre);
                  return movieObj.genre_ids.includes(genre.id);
                }
              })
              .filter((movieObj) => movieObj.title.toLowerCase().includes(search))
              .map((movieObj, index) => (
                <tr key={index} className='border-b border-gray-300'>
                  <td className='flex items-center px-4 py-3 border-r border-gray-300'>
                    <img 
                      className='h-16 w-16 rounded-lg object-cover'
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} 
                      alt={movieObj.title} 
                    />
                    <div className='ml-4'>{movieObj.title}</div>
                  </td>
                  <td className='px-4 py-3 border-r border-gray-300'>{movieObj.vote_average}</td>
                  <td className='px-4 py-3 border-r border-gray-300'>{movieObj.popularity}</td>
                  <td className='px-4 py-3 border-r border-gray-300'>
                    {movieObj.genre_ids.map(id => {
                      const genre = genres.find(g => g.id === id);
                      return genre ? <span key={id} className='mr-2'>{genre.name}</span> : null;
                    })}
                  </td>
                  <td className='text-red-600 px-4 py-3 cursor-pointer hover:underline' onClick={() => handleRemoveFromWatchList(movieObj)}>Delete</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Watchlist.propTypes = {
  watchlist: PropTypes.array.isRequired,
  setWatchlist: PropTypes.func.isRequired,
  handleRemoveFromWatchList: PropTypes.func.isRequired,
};

export default Watchlist;
