import "./Movie.css"
const imageBaseUrl = 'http://image.tmdb.org/t/p/w342';

const Movie = (props) => {
    const movie = props.info;
    return (
        <div className="photo-container">
            <a href="#" onClick={() => props.onIsActive(true, movie, props.index)}>
                <div className="photo-container__image">
                    <img
                        className="photo-container__movie"
                        src={`${imageBaseUrl}${movie.poster_path}`}
                        alt={movie.title || "The poster is missing"}
                    />
                    <div className="overlay">
                        <div className="overlay-text">
                            <p>{movie.title}</p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}
 export default Movie;