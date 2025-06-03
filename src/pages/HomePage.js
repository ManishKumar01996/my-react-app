import { useMovieContext } from '../context/MovieContext';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './HomePage.css';

const HomePage = () => {
  // Get movie data and actions from context
  const { 
    movies, 
    loading, 
    error, 
    fetchPopularMovies, 
    searchMovies 
  } = useMovieContext();
  
  // React Router hooks for URL and navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Local state for search input and searching status
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Handles searching movies or fetching popular movies based on query
  const handleSearch = useCallback(async (query) => {
    try {
      setIsSearching(true);
      if (query.trim()) {
        await searchMovies(query); // Search movies if query is not empty
      } else {
        await fetchPopularMovies(); // Otherwise, fetch popular movies
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  }, [fetchPopularMovies, searchMovies]);

  // On URL change, update search input and trigger search
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    setSearchQuery(search);
    handleSearch(search);
  }, [location.search, handleSearch]);

  // Handles form submission for search
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    navigate(`?search=${encodeURIComponent(searchQuery)}`); // Update URL with search query
  }, [navigate, searchQuery]);

  // Handles input change for search bar
  const handleInputChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Clears the search input and resets to popular movies
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    navigate('/'); // Remove search param from URL
  }, [navigate]);

  // Show loading state if fetching or searching
  if (loading || isSearching) {
    return <div className="loading">Loading movies...</div>;
  }

  // Show error state if there is an error
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