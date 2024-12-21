/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import genres from '../utility/genre';

const Watchlist = ({ watchlist, setWatchlist, handleRemoveFromWatchList, handleAddToWatchlist }) => {
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
//   const removeFromWatchList = () => {
//     handleRemoveFromWatchList(movieObj.imdbID); // Remove by the unique movie ID (imdbID)
// };

  useEffect(() => {
    const temp = watchlist.flatMap((movieObj) => {
      return movieObj?.genre_ids?.map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      }) || []; // Ensure it returns an empty array if genre_ids is undefined
    });
    setGenreList(['All Genres', ...new Set(temp.filter(Boolean))]);
  }, [watchlist]);


  return (
    <div className="p-8">
      {/* Add Movie Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => handleAddToWatchlist({
            Title: "New Movie", 
            Poster: "/path/to/image.jpg", 
            vote_average: 7.5, 
            popularity: 1500, 
            genre_ids: [28, 35] 
          })}
          className="h-12 w-72 bg-blue-600 text-white rounded-lg"
        >
          Add Movie
        </button>
      </div>

      {/* Genre Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleGenreChange(genre)}
            className={`flex items-center justify-center h-12 w-36 rounded-xl font-semibold p-3 cursor-pointer transition-transform duration-300 ${
              currgenre === genre ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-12 w-72 bg-gray-100 border border-gray-300 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Movies Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
        <table className="w-full text-gray-700 text-sm border-separate border-spacing-0">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">Name</th>
              <th className="py-3 px-4 font-semibold border-r border-gray-300">
                <div className="flex items-center justify-center space-x-2">
                  <div onClick={sortIncreasing} className="p-2 cursor-pointer hover:bg-gray-200 rounded-full">
                    <FaArrowUp className="text-gray-600" />
                  </div>
                  <span>Ratings</span>
                  <div onClick={sortDecreasing} className="p-2 cursor-pointer hover:bg-gray-200 rounded-full">
                    <FaArrowDown className="text-gray-600" />
                  </div>
                </div>
              </th>
              <th className="py-3 px-4 font-semibold border-r border-gray-300">Popularity</th>
              <th className="py-3 px-4 font-semibold border-r border-gray-300">Genre</th>
              <th className="py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          
          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currgenre === 'All Genres') return true;
                const genre = genres.find((g) => g.name === currgenre);
                return genre ? movieObj.genre_ids?.includes(genre.id) : false;
              })
              .filter((movieObj) => movieObj.Title?.toLowerCase().includes(search))
              .map((movieObj, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="flex items-center px-4 py-3 border-r border-gray-300">
                    <img
                      className="h-16 w-16 rounded-lg object-cover"
                      src={movieObj.Poster ? movieObj.Poster : 'fallback-image-url'}
                      alt={movieObj.Title || 'Movie Poster'}
                    />
                    <div className="ml-4">{movieObj.Title || 'Untitled Movie'}</div>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300">{movieObj.vote_average || 'N/A'}</td>
                  <td className="px-4 py-3 border-r border-gray-300">{movieObj.popularity}</td>
                  <td className="px-4 py-3 border-r border-gray-300">
                    {movieObj.genre_ids?.map((id) => {
                      const genre = genres.find((g) => g.id === id);
                      return genre ? <span key={id} className="mr-2">{genre.name}</span> : null;
                    })}
                  </td>
                  <td
                    className="text-red-600 px-4 py-3 cursor-pointer hover:underline"
                    onClick={() => handleRemoveFromWatchList(movieObj.imdbID)}
                  >
                    Delete
                  </td>
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
  handleAddToWatchlist: PropTypes.func.isRequired,
};

export default Watchlist;
