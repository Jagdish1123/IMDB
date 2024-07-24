/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './cards';
import Pagination from './pagination';

function Movies({ watchlist, handleAddtoWatchlist, handleRemoveFromWatchList }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=YOURKEY&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [pageNo]);

  const goToNextPage = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  };

  const goToPrevPage = () => {
    setPageNo((prevPageNo) => prevPageNo - 1);
  };

  return (
    <div className="p-5">
      <div className="text-center text-2xl font-bold m-5 p-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-red-700 hover:via-red-500 hover:to-black transition-all duration-300">Trending Movies</div>
      <div className="flex flex-wrap justify-around m-5 p-4 bg-gray-100 rounded-lg shadow-md">
        {movies.map((movieObj) => (
          <Cards
            key={movieObj.id.toString()}
            movieObj={movieObj}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            handleAddtoWatchlist={handleAddtoWatchlist}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
            watchlist={watchlist}
          />
        ))}
      </div>

      <Pagination
        pageNo={pageNo}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />
    </div>
  );
}

export default Movies;
