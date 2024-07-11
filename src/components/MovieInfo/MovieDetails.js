import React, {useState, useEffect} from "react";
import "./MovieDetails.css";
import StarIcon from "./star.png"
const imageBaseUrl = 'http://image.tmdb.org/t/p/w342';

const MovieDetails = (props) => {

    const movies = props.movies;
    const favourite = props.favourite;
    const [currentMovie, setCurrentMovie] = useState(props.currentMovie);
    const [index, setIndex] = useState(props.index);

    const [isFavourite, setIsFavourite] = useState(favourite.some(item => (
                                        item.id === currentMovie.id)));

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const handlerNextMovie = () => {
        if(index != 19){
            setIsFavourite(favourite.some(item => (
                item.id === movies[index + 1].id)));
            setCurrentMovie(movies[index + 1]);
            setIndex(index + 1);
        }
    }

    const favouriteHandler = () => {
        if(isFavourite === true) {
            setIsFavourite(false);
            props.onGetIsFavourite(false, currentMovie);
        }
        else if(isFavourite === false) {
            setIsFavourite(true);
            props.onGetIsFavourite(true, currentMovie);
        }
    }

    return (
        <div className="details">
            <img className="details__back" 
                 src={`${imageBaseUrl}${currentMovie.backdrop_path}`} 
                 alt="poster is missing"/>
            <div className="details__btns">
                <button onClick={() => props.onIsActive(false, currentMovie)}>
                   {"<"} Back to List
                </button>
                {index != 19 && (
                    <button onClick={handlerNextMovie}>
                        Next Movie {">"}
                    </button>
                    )
                }
            </div>
            <div className="details__info">
                <img className="details__info-poster"
                     src={`${imageBaseUrl}${currentMovie.poster_path}`}/>
                <div className="details__info-text">    
                    <div className="title-btn">
                        <h2>{currentMovie.title}</h2>
                        <button className="details__info__favorite-button"
                            onClick={favouriteHandler}>
                            {isMobile ? 
                                <img 
                                    className="details__info__favorite-button-img" 
                                    style={{filter: isFavourite ? "grayscale(0%)" : "grayscale(100%)",}}
                                    src ={StarIcon}/>
                              : 
                                isFavourite ? "Unfavourite" : "Add to Favourite"
                            }
                        </button>
                    </div>
                    <div className="description">
                        <h4>Score: {currentMovie.vote_average} 
                            | Rating: {currentMovie.popularity} 
                            | Release Date: {currentMovie.release_date}</h4>
                        <p>{currentMovie.overview}</p>
                    </div>   
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;