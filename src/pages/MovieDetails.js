import { useParams } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { useEffect } from 'react';

const MovieDetails = () => {
  const { id } = useParams();
  const { currentMovie, loading, error, getMovieDetails } = useMovieContext();

  useEffect(() => {
    if (id) {
      getMovieDetails(id);
    }
  }, [id, getMovieDetails]);

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentMovie) return <div>No movie data available</div>;

  return (
    <div className="movie-details">
      <h1>{currentMovie.Title}</h1>
      <img src={currentMovie.Poster} alt={currentMovie.Title} />
      <p>Year: {currentMovie.Year}</p>
      <p>Rating: {currentMovie.imdbRating}</p>
      <p>Plot: {currentMovie.Plot}</p>
    </div>
  );
};

export default MovieDetails;