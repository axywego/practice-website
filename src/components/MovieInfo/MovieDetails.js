import React, {useState, useEffect} from "react";
import "./MovieDetails.css";
const imageBaseUrl = 'http://image.tmdb.org/t/p/w342';

const MovieDetails = (props) => {
    const [movies, setMovies] = useState(props.movies);
    const [movie, setMovie] = useState(props.currentMovie);
    const [index, setIndex] = useState(props.index);
    const [isFavourite, setIsFavourite] = useState(props.favourite.some(item => item.id === movie.id));

    const [poster, setPoster] = useState(`${imageBaseUrl}${movie.poster_path}`);
    const [back, setBack] = useState(`${imageBaseUrl}${movie.backdrop_path}`);
    const [title, setTitle] = useState(movie.title);
    const [score, setScore] = useState(movie.vote_average);
    const [rating, setRating] = useState(movie.popularity);
    const [releaseDate, setReleaseDate] = useState((new Date(movie.release_date))
                                          .toLocaleString("en-US", 
                                          { month: 'long', day: 'numeric', year: 'numeric' }));
    const [description, setDescription] = useState(movie.overview);

    const handlerNextMovie = () => {
        if(index != 19){
            setIndex(index + 1);
            setMovie(movies[index + 1]);
            setTitle(movies[index + 1].title);
            setScore(movies[index + 1].vote_average);
            setRating(movies[index + 1].popularity);
            setReleaseDate((new Date(movies[index + 1].release_date))
                            .toLocaleString("en-US", 
                            { month: 'long', day: 'numeric', year: 'numeric' }));
            setDescription(movies[index + 1].overview);
            setBack(`${imageBaseUrl}${movies[index + 1].backdrop_path}`);
            setPoster(`${imageBaseUrl}${movies[index + 1].poster_path}`);
            setIsFavourite(props.favourite.includes(movies[index + 1]));
        }
    }

    const favouriteHandler = () => {
        if(isFavourite === true) {
            setIsFavourite(false);
            props.onGetIsFavourite(false, movie);
        }
        else if(isFavourite === false) {
            setIsFavourite(true);
            props.onGetIsFavourite(true, movie);
        }
    }

    return (
        <div className="details">
            <img className="details__back" src={back} alt="poster is missing"></img>
            <div className="details__btns">
                <button onClick={() => props.onIsActive(false, movie)}>
                   {"<"} Back to List
                </button>
                {index !== 19 && (
                    <button onClick={handlerNextMovie}>
                        Next Movie {">"}
                    </button>
                    )
                }
            </div>
            <div className="details__info">
                <img src={poster}></img>
                <div className="details__info-text">
                    <div className="title-btn">
                        <h2>{title}</h2>
                        <button className="details__info__favorite-button"
                            onClick={favouriteHandler}>
                            {isFavourite ? "Unfavourite" : "Add to favourite"}
                        </button>
                    </div>
                    <div className="description">
                        <h4>Score: {score} | Rating: {rating} | Release Date: {releaseDate}</h4>
                        <p>{description}</p>
                    </div>   
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;