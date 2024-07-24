/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Movies from './components/movies';
import Watchlist from './components/watchlist';
import Banner from './components/banner';
import './App.css';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Load watchlist from localStorage on component mount
    const movieFromLocalStorage = localStorage.getItem('movieApp');
    if (movieFromLocalStorage) {
      setWatchlist(JSON.parse(movieFromLocalStorage));
    }
  }, []); // Empty dependency array ensures this effect runs only on mount

  const handleAddtoWatchlist = (movieObj) => {
    // Update the watchlist state
    setWatchlist((prevWatchlist) => [...prevWatchlist, movieObj]);
  
    // Update localStorage with the new watchlist
    localStorage.setItem('movieApp', JSON.stringify([...watchlist, movieObj]));
  };

  const handleRemoveFromWatchList = (movieObj) => {
    const filteredWatchlist = watchlist.filter((movie) => movie.id !== movieObj.id);
    setWatchlist(filteredWatchlist);

    // Update localStorage with the updated watchlist after removal
    localStorage.setItem('movieApp', JSON.stringify(filteredWatchlist));
  };

  return (
    <>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  watchlist={watchlist}
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                />
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} setWatchlist={setWatchlist} handleRemoveFromWatchList={handleRemoveFromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
