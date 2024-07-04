import "./FavouriteMovies.css";
import Movie from "../Movies/Movie.js";
const imageBaseUrl = 'http://image.tmdb.org/t/p/w342';

const FavouriteMovies = (props) => {
    return(
        <div className="favourite-container">
            {props.favourite.length === 0 && (
                <h2 className="favourite-container__empty">You don't have any favourite movies!</h2>
            )}
            {props.favourite.length > 0 && (
                <section className="movie-section">
                    {props.favourite.map((item, index) => (
                        <div key={index} className="movie-card">
                            <img src={`${imageBaseUrl}${item.poster_path}`}/>
                            <div className="movie-card__all-text">
                                <div className="movie-card__text">
                                    <h2>{item.title}</h2>
                                    <button onClick={
                                        () => props.onRemoveFavourite(item)}>
                                            Unfavourite
                                    </button>
                                </div>
                                <p>{item.overview}</p>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}

export default FavouriteMovies;