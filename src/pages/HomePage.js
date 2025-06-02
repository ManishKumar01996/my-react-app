import { useMovieContext } from '../context/MovieContext';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './HomePage.css';

const HomePage = () => {
  const { 
    movies, 
    loading, 
    error, 
    fetchPopularMovies, 
    searchMovies 
  } = useMovieContext();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Memoized search handler
  const handleSearch = useCallback(async (query) => {
    try {
      setIsSearching(true);
      if (query.trim()) {
        await searchMovies(query);
      } else {
        await fetchPopularMovies();
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  }, [fetchPopularMovies, searchMovies]);

  // Initialize search from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    setSearchQuery(search);
    handleSearch(search);
  }, [location.search, handleSearch]);

  // Form submission handler
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    navigate(`?search=${encodeURIComponent(searchQuery)}`);
  }, [navigate, searchQuery]);

  // Input change handler
  const handleInputChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Clear search handler
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    navigate('/');
  }, [navigate]);

  // Loading and error states
  if (loading || isSearching) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-page">
      <h1>Movie Explorer</h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleInputChange}
          aria-label="Search movies"
        />
        <button type="submit" aria-label="Search">
          Search
        </button>
        {searchQuery && (
          <button 
            type="button" 
            onClick={clearSearch} 
            className="clear-btn"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </form>

      {/* Results Count */}
      {searchQuery && (
        <div className="results-count">
          Found {movies.length} {movies.length === 1 ? 'result' : 'results'} for "{searchQuery}"
        </div>
      )}

      {/* Movie List */}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
            />
          ))
        ) : (
          <div className="no-results">
            {searchQuery ? (
              <p>No movies found matching "{searchQuery}"</p>
            ) : (
              <p>No movies available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;