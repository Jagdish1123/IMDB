/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './cards';
import Pagination from './pagination';

function Movies({watchlist,handleAddtoWatchlist,handleRemoveFromWatchList}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);




  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=movie&type=movie&page=${pageNo}&apikey=d19cd846`
        );

        console.log(response);
        if (response.data.Response === "True") {
          setMovies(response.data.Search || []);
          setTotalPages(Math.ceil(response.data.totalResults / 10));
        } else {
          console.error('Error fetching movies: ', response.data.Error);
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies: ', error);
      }
    };

    fetchMovies();
  }, [pageNo]);

  const goToNextPage = () => {
    if (pageNo < totalPages) setPageNo(pageNo + 1);
  };

  const goToPrevPage = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };


  return (
    <div className="p-5">
      <div className="text-center text-2xl font-bold m-5 p-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-red-700 hover:via-red-500 hover:to-black transition-all duration-300">
        Trending Movies
      </div>
      <div className="flex flex-wrap justify-around m-5 p-4 bg-gray-100 rounded-lg shadow-md">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Cards
              key={movie.imdbID}
              movieObj={movie}
              poster_path={movie.Poster}
              name={movie.Title}
              year={movie.Year}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchlist={watchlist}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 w-full">No movies found</div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          pageNo={pageNo}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
        />
      )}
    </div>
  );
}

export default Movies;
