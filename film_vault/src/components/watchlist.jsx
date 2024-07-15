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
    const sorted = [...watchlist].sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...watchlist].sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
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
    <>
      <div className='flex justify-center flex-wrap m-4'>
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleGenreChange(genre)}
            className={`flex justify-center items-center h-12 w-36 rounded-xl font-bold p-2 m-2 cursor-pointer ${currgenre === genre ? 'bg-blue-400 text-white' : 'bg-gray-400 bg-opacity-50 text-gray-800'}`}
          >
            {genre}
          </div>
        ))}
      </div>

      <div className='flex justify-center my-4'>
        <input onChange={handleSearch} value={search} type="text" placeholder='Search Movies' className='h-12 w-72 bg-gray-200 outline-none px-4' />
      </div>

      <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
        <table className='w-full text-gray-600 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th className='flex justify-center '>
                <div onClick={sortIncreasing} className='p-2'><FaArrowUp className='text-gray-600' /></div>
                <div className=''>Ratings</div>
                <div onClick={sortDecreasing} className='p-2'><FaArrowDown className='text-gray-600' /></div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
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

              .filter((movieObj) =>
                movieObj.title.toLowerCase().includes(search)
              )
              .map((movieObj, index) => (
                <tr key={index} className='border border-gray-300'>
                  <td className='flex items-center px-6 py-4'>
                    <img className='h-20 w-20 rounded-lg' src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} alt="" />
                    <div className='mx-5'>{movieObj.title}</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>{movieObj.vote_average}</td>
                  <td className='border border-gray-300 px-4 py-2'>{movieObj.popularity}</td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {movieObj.genre_ids.map(id => {
                      const genre = genres.find(g => g.id === id);
                      return genre ? <span key={id} className='mr-2'>{genre.name}</span> : null;
                    })}
                  </td>
                  <td className='text-red-600 border border-gray-300 px-4 py-2 cursor-pointer' onClick={() => handleRemoveFromWatchList(movieObj)}>Delete</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

Watchlist.propTypes = {
  watchlist: PropTypes.array.isRequired,
  setWatchlist: PropTypes.func.isRequired,
  handleRemoveFromWatchList: PropTypes.func.isRequired,
};

export default Watchlist;
