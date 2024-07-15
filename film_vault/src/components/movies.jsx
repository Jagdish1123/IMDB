/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './cards';
import Pagination from './pagination';

function Movies({  watchlist,handleAddtoWatchlist, handleRemoveFromWatchList }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=f38d2af3bbc9c079e48fd87c88112e0a&language=en-US&page=${pageNo}`
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
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around m-5">
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
