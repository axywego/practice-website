import FavouriteMovies from "./components/Favourite/FavouriteMovies.js";
import Header from "./components/Header/Header.js";
import Movies from "./components/Movies/Movies.js";
import React, { useState, useEffect } from "react";

function App() {
    const [favourite, setFavourite] = useState([]);

    const [isShowMovies, setIsShowMovies] = useState(true);
    const checkFavourite = (info) => {
        setIsShowMovies(info);
    }

    const addFavourite = (info) => {
        setFavourite((previousState) => {
            return([info, ...previousState]);
        });
    }

    const removeFavourite = (info) => {
        setFavourite(favourite.filter(movie => movie.id !== info.id));
    }

    return (
        <div className="App">
            <Header onCheckFavourite={checkFavourite} isShowMovies={isShowMovies}/>
            {isShowMovies && <Movies favourite={favourite}
                                     onAddFavourite={addFavourite}
                                     onRemoveFavourite={removeFavourite}/>}
            {!isShowMovies && <FavouriteMovies favourite={favourite}
                                               onRemoveFavourite={removeFavourite}/>}
        </div>
    );
}

export default App;