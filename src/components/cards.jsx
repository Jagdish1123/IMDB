/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const Cards = ({ movieObj, poster_path, name, handleAddtoWatchlist, handleRemoveFromWatchList, watchlist }) => {

    const addToWatchList = () => {
        handleAddtoWatchlist(movieObj); // Only adds the selected movie
    };

    const removeFromWatchList = () => {
        handleRemoveFromWatchList(movieObj.imdbID); // Remove by the unique movie ID (imdbID)
    };

    const isContainedInWatchlist = (movie) => {
        return watchlist.some((item) => item.imdbID === movie.imdbID); // Use imdbID to check uniqueness
    };

    return (
        <div className="relative h-80 w-52 m-2 bg-cover bg-center rounded-xl hover:cursor-pointer hover:scale-110 duration-300 flex flex-col justify-between items-end"
            style={{ backgroundImage: `url(${poster_path})` }}>

            {isContainedInWatchlist(movieObj) ? (
                <div onClick={removeFromWatchList} className="m-4 h-8 w-8 flex items-center justify-center rounded-full bg-gray-800/50 cursor-pointer hover:bg-gray-800/70">
                    &#x274c; {/* This is the red X symbol */}
                </div>
            ) : (
                <div onClick={addToWatchList} className="m-4 h-8 w-8 flex items-center justify-center rounded-full bg-gray-800/50 text-green-500 cursor-pointer hover:bg-gray-800/70">
                    &#x2713; {/* This is the check mark symbol */}
                </div>
            )}

            <div className="m-2 p-0.5 font-medium text-center bg-gray-100 border border-red-300 rounded-lg shadow-lg">
                {name}
            </div>

        </div>
    );
};

Cards.propTypes = {
    movieObj: PropTypes.object.isRequired,
    poster_path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleAddtoWatchlist: PropTypes.func.isRequired,
    handleRemoveFromWatchList: PropTypes.func.isRequired,
    watchlist: PropTypes.array.isRequired,
};

export default Cards;
