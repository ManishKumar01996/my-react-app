import { useParams, Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { useEffect } from 'react';
import './MovieDetails.css';

const MovieDetails = () => {
  // Get the movie ID from the URL parameters
  const { id } = useParams();

  // Get current movie details, loading, error, and fetch function from context
  const { currentMovie, loading, error, getMovieDetails } = useMovieContext();

  // Fetch movie details when the component mounts or the ID changes
  useEffect(() => {
    if (id) {
      getMovieDetails(id);
    }
  }, [id, getMovieDetails]);

  // Show loading state while fetching movie details
  if (loading) {
    return (
      <div className="centered">
        <p>Loading movie details...</p>
      </div>
    );
  }

  // Show error message if there was a problem fetching details
  if (error) {
    return (
      <div className="centered error">
        <p>Sorry, we couldn't load movie details. Please try again later.</p>
      </div>
    );
  }

  // Show message if no movie data is available
  if (!currentMovie) {
    return (
      <div className="centered">
        <p>No movie data available.</p>
      </div>
    );
  }

  // Render the movie details
  return (
    <div className="movie-container">
      {/* Back link to home page */}
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="movie-details">
        {/* Movie poster */}
        <img
          src={currentMovie.Poster !== 'N/A' ? currentMovie.Poster : '/fallback.jpg'}
          alt={`Poster of the movie ${currentMovie.Title}`}
          className="poster"
        />

        {/* Movie information */}
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