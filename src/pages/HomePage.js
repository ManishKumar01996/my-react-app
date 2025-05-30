import { useMovieContext } from '../context/MovieContext';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './HomePage.css'; 

const HomePage = () => {
  const { movies, loading, error, fetchPopularMovies, searchMovies } = useMovieContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Get search query from URL on initial load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    setSearchQuery(search);
    if (search) {
      handleSearch(search);
    } else {
      fetchPopularMovies();
    }
  }, [location.search]);

  const handleSearch = async (query) => {
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
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    navigate('/');
  };

  if (loading || isSearching) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">Error: {error}</div>;

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
        />
        <button type="submit">Search</button>
        {searchQuery && (
          <button type="button" onClick={clearSearch} className="clear-btn">
            Clear
          </button>
        )}
      </form>

      {/* Results Count */}
      {searchQuery && (
        <div className="results-count">
          Found {movies.length} results for "{searchQuery}"
        </div>
      )}

      {/* Movie List */}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.id || movie.imdbID} movie={movie} />
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