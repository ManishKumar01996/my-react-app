import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiHeart, FiFilter, FiX, FiSearch } from 'react-icons/fi';
import './Favorites.css';

const Favorites = () => {
  // Get favorites from context
  const { favorites } = useMovieContext();

  // Local state for filtered favorites, search, sorting, filter visibility, and error
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Effect to filter and sort favorites when dependencies change
  useEffect(() => {
    try {
      let results = [...favorites];

      // Filter by search term if provided
      if (searchTerm.trim()) {
        const searchTermLower = searchTerm.toLowerCase().trim();
        results = results.filter(movie => {
          try {
            if (!movie) return false;

            // Normalize all searchable fields
            const title = String(movie.title || '').toLowerCase().trim();
            const year = String(movie.year || '').trim();
            const imdbID = String(movie.imdbID || '').toLowerCase().trim();

            // Check if any field matches the search term
            return (
              title.includes(searchTermLower) ||
              year.includes(searchTerm) ||
              imdbID.includes(searchTermLower)
            );
          } catch (error) {
            console.error('Error processing movie:', movie, error);
            return false;
          }
        });
      }

      // Sort results based on selected sort option
      switch (sortBy) {
        case 'title-asc':
          results.sort((a, b) => String(a?.title || '').localeCompare(String(b?.title || '')));
          break;
        case 'title-desc':
          results.sort((a, b) => String(b?.title || '').localeCompare(String(a?.title || '')));
          break;
        case 'year-asc':
          results.sort((a, b) => (parseInt(a?.year) || 0) - (parseInt(b?.year) || 0));
          break;
        case 'year-desc':
          results.sort((a, b) => (parseInt(b?.year) || 0) - (parseInt(a?.year) || 0));
          break;
        default:
          break;
      }

      setFilteredFavorites(results);
      setSearchError(null);
    } catch (error) {
      // Handle errors during search/filter
      console.error('Search error:', error);
      setSearchError('An error occurred during search');
      setFilteredFavorites(favorites);
    }
  }, [favorites, searchTerm, sortBy]);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search and reset sort
  const clearSearch = () => {
    setSearchTerm('');
    setSortBy('default');
  };

  return (
    <motion.div 
      className="favorites-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header with title, search bar, and filter button */}
      <div className="favorites-header">
        <motion.h1 
          className="favorites-title"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <FiHeart className="favorites-heart-icon" /> Your Favorite Movies
        </motion.h1>
        
        <div className="favorites-controls">
          {/* Search bar */}
          <div className="favorites-search-bar">
            <FiSearch className="favorites-search-icon" />
            <input
              type="text"
              placeholder="Search by title, year, or ID..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search favorites"
            />
            {searchTerm && (
              <button 
                className="favorites-clear-search"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>
          
          {/* Filter button */}
          <button 
            className={`favorites-filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-label="Filter options"
          >
            <FiFilter /> Filters
          </button>
        </div>
        
        {/* Filter options dropdown */}
        {showFilters && (
          <motion.div 
            className="favorites-filter-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            aria-hidden={!showFilters}
          >
            <div className="favorites-filter-group">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="year-asc">Year (Oldest first)</option>
                <option value="year-desc">Year (Newest first)</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Error message if search/filter fails */}
      {searchError && (
        <div className="favorites-error">
          {searchError}
        </div>
      )}
      
      {/* Empty state if no favorites match */}
      {filteredFavorites.length === 0 ? (
        <motion.div 
          className="favorites-empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {searchTerm ? (
            <>
              <p>No favorites match "{searchTerm}"</p>
              <button 
                className="favorites-reset-btn"
                onClick={clearSearch}
              >
                Reset filters
              </button>
            </>
          ) : (
            <>
              <p>Your favorites list is empty.</p>
              <p>Start adding movies to see them here!</p>
            </>
          )}
        </motion.div>
      ) : (
        <>
          {/* Favorites list with animation */}
          <motion.div 
            className="favorites-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredFavorites.map((movie, index) => (
              <motion.div 
                key={`${movie?.imdbID || 'missing-id'}-${index}`}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Show count of filtered favorites */}
          <div className="favorites-count">
            Showing {filteredFavorites.length} of {favorites.length} favorites
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Favorites;