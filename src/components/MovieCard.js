import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaInfoCircle, FaShareAlt } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  const shareMovie = () => {
    navigator.clipboard.writeText(`${movie.Title} (${movie.Year}) - Check it out!`);
    alert('Movie info copied to clipboard!');
  };

  return (
    <div 
      className={`movie-card ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header">
        {movie.Type && <span className="media-type">{movie.Type}</span>}
        {movie.imdbRating && (
          <span className="rating">
            <FaStar className="star-icon" /> {movie.imdbRating}
          </span>
        )}
      </div>

      <Link to={`/movie/${movie.imdbID}`} className="poster-link">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
          alt={movie.Title}
          className="movie-poster"
        />
        {isHovered && (
          <div className="quick-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            {movie.Genre && <p className="genre">{movie.Genre.split(',').slice(0, 2).join(', ')}</p>}
          </div>
        )}
      </Link>

      <div className="card-footer">
        <button
          className={`favorite-btn ${isFavorite(movie.imdbID) ? 'active' : ''}`}
          onClick={toggleFavorite}
          aria-label={isFavorite(movie.imdbID) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite(movie.imdbID) ? <FaHeart /> : <FaRegHeart />}
        </button>

        <button 
          className="info-btn" 
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="More info"
        >
          <FaInfoCircle />
        </button>

        <button 
          className="share-btn" 
          onClick={shareMovie}
          aria-label="Share movie"
        >
          <FaShareAlt />
        </button>
      </div>

      {isExpanded && (
        <div className="expanded-info">
          <h4>{movie.Title} ({movie.Year})</h4>
          {movie.Plot && <p className="plot">{movie.Plot.substring(0, 100)}...</p>}
          {movie.Director && <p><strong>Director:</strong> {movie.Director}</p>}
          {movie.Actors && <p><strong>Cast:</strong> {movie.Actors.split(',').slice(0, 3).join(', ')}</p>}
          <Link to={`/movie/${movie.imdbID}`} className="details-link">
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieCard;