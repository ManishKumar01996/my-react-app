import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiHeart, FiFilter, FiX, FiSearch } from 'react-icons/fi';
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useMovieContext();
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let results = [...favorites];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.year && movie.year.toString().includes(searchTerm))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'title-asc':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'year-asc':
        results.sort((a, b) => (a.year || 0) - (b.year || 0));
        break;
      case 'year-desc':
        results.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      default:
        // Default order (likely added order)
        break;
    }
    
    setFilteredFavorites(results);
  }, [favorites, searchTerm, sortBy]);

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

  return (
    <motion.div 
      className="favorites-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
          <div className="favorites-search-bar">
            <FiSearch className="favorites-search-icon" />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="favorites-clear-search"
                onClick={() => setSearchTerm('')}
              >
                <FiX />
              </button>
            )}
          </div>
          
          <button 
            className={`favorites-filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
          </button>
        </div>
        
        {showFilters && (
          <motion.div 
            className="favorites-filter-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="favorites-filter-group">
              <label>Sort by:</label>
              <select 
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
      
      {filteredFavorites.length === 0 ? (
        <motion.div 
          className="favorites-empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {searchTerm ? (
            <>
              <p>No favorites match your search.</p>
              <button 
                className="favorites-reset-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSortBy('default');
                }}
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
        <motion.div 
          className="favorites-list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredFavorites.map(movie => (
            <motion.div 
              key={movie.imdbID} 
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {filteredFavorites.length > 0 && (
        <div className="favorites-count">
          Showing {filteredFavorites.length} of {favorites.length} favorites
        </div>
      )}
    </motion.div>
  );
};

export default Favorites;