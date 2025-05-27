import { useParams, Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { useEffect } from 'react';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const { currentMovie, loading, error, getMovieDetails } = useMovieContext();

  useEffect(() => {
    if (id) {
      getMovieDetails(id);
    }
  }, [id, getMovieDetails]);

  if (loading) {
    return (
      <div className="centered">
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered error">
        <p>Sorry, we couldn't load movie details. Please try again later.</p>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="centered">
        <p>No movie data available.</p>
      </div>
    );
  }

  return (
    <div className="movie-container">
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="movie-details">
        <img
          src={currentMovie.Poster !== 'N/A' ? currentMovie.Poster : '/fallback.jpg'}
          alt={`Poster of the movie ${currentMovie.Title}`}
          className="poster"
        />

        <div className="movie-info">
          <h1>{currentMovie.Title}</h1>
          <p><strong>Year:</strong> {currentMovie.Year}</p>
          <p><strong>Rating:</strong> {currentMovie.imdbRating ?? 'N/A'}</p>
          <p><strong>Genre:</strong> {currentMovie.Genre ?? 'N/A'}</p>
          <p><strong>Director:</strong> {currentMovie.Director ?? 'N/A'}</p>
          <p><strong>Actors:</strong> {currentMovie.Actors ?? 'N/A'}</p>
          <p><strong>Runtime:</strong> {currentMovie.Runtime ?? 'N/A'}</p>
          <p><strong>Awards:</strong> {currentMovie.Awards ?? 'N/A'}</p>
          <p><strong>Plot:</strong> {currentMovie.Plot || 'No plot summary available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
