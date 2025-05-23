import { useMovieContext } from '../context/MovieContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const { movies, loading, error, fetchPopularMovies } = useMovieContext();
  const location = useLocation();

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  // Filter movies based on search query
  const filteredMovies = search
    ? movies.filter(movie =>
        movie.title?.toLowerCase().includes(search) ||
        movie.name?.toLowerCase().includes(search)
      )
    : movies;

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-page">
      <h1>Movie Explorer</h1>
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;