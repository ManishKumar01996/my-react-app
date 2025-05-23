import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites } = useMovieContext();

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
          alt={movie.Title}
        />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </Link>
      <button
        className="favorite-btn"
        onClick={() => addToFavorites(movie)}
        disabled={isFavorite(movie.imdbID)}
      >
        {isFavorite(movie.imdbID) ? '❤️ In Favorites' : '♡ Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;