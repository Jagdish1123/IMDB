/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const Cards = ({ movieObj, poster_path, name, handleAddtoWatchlist, handleRemoveFromWatchList, watchlist }) => {
    const imageUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;

    const addToWatchList = () => {
        handleAddtoWatchlist(movieObj);
    };

    const removeFromWatchList = () => {
        handleRemoveFromWatchList(movieObj);
    };

    const isContainedInWatchlist = (movie) => {
        return watchlist.some((item) => item.id === movie.id);
    };

    return (
        <div className="h-[40vh] w-[200px] bg-cover bg-center rounded-xl hover:cursor-pointer hover:scale-110 duration-300 flex flex-col justify-between items-end" style={{ backgroundImage: `url(${imageUrl})` }}>
            {isContainedInWatchlist(movieObj) ? (
                <div onClick={removeFromWatchList} className="m-4 h-8 w-8 flex items-center justify-center rounded-full bg-gray-800/50  cursor-pointer hover:bg-gray-800/70">
                    &#x274c; {/* This is the red X symbol */}
                </div>
            ) : (
                <div onClick={addToWatchList} className="m-4 h-8 w-8 flex items-center justify-center rounded-full bg-gray-800/50 text-green-500 cursor-pointer hover:bg-gray-800/70">
                    &#x2713; {/* This is the check mark symbol */}
                </div>
            )}


            <div className="flex flex-col text-white justify-end text-xl p-1.5 bg-gray-800/50 rounded-lg shadow-lg">
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
