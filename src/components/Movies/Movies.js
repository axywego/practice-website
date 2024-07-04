import React, { useState } from 'react';
import "./Movies.css";
import PageSelector from "./PageSelector.js";
import Movie from "./Movie.js";
import MovieDetails from '../MovieInfo/MovieDetails.js';

const Movies = (props) => {
    const [isDetailed, setIsDetailed] = useState(false);
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState([]);
    const [index, setIndex] = useState(1);

    const [page, setPage] = useState(1);
 
    const getMovies = (info) => {
        setMovies(info);
    }

    const getPage = (info) => {
        setPage(info);
    } 

    const isActive = (movieIsActive, movieInfo, index) => {
        setIsDetailed(movieIsActive);
        setMovie(movieInfo);
        setIndex(index);
    }

    const getIsFavourite = (info, movie) => {
        if(info === true){
            props.onAddFavourite(movie);
        }
        else {
            props.onRemoveFavourite(movie);
        }
    }

    return (
        <div>
        {isDetailed ? (
          <div className="body-details">
            <MovieDetails favourite={props.favourite} 
                          currentMovie={movie} 
                          movies={movies}
                          index={index} 
                          onIsActive={isActive}
                          onGetIsFavourite={getIsFavourite} />
          </div>
        ) : (
          <div className="body-movies">
            <h4>Latest Releases...</h4>
            <div className="body-movies__movies">
              {movies.map((item, index) => (
                <Movie key={index} info={item} index={index} onIsActive={isActive} />
              ))}
            </div>
            <PageSelector page={page} onGetMovies={getMovies} onGetPage={getPage}/>
          </div>
        )}
      </div>
    );
}

export default Movies;