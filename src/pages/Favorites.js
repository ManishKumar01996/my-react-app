import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Favorites.css';

const Favorites = () => {
  // Get favorites from context
  const { favorites } = useMovieContext();

  // Local state for filtered favorites 
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  // Effect to keep filteredFavorites in sync with favorites
  useEffect(() => {
    setFilteredFavorites(favorites);
  }, [favorites]);

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

  return (
    <motion.div 
      className="favorites-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header with title */}
      <div className="favorites-header">
        <motion.h1 
          className="favorites-title"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          Your Favorite Movies
        </motion.h1>
      </div>

      {/* Empty state if no favorites */}
      {filteredFavorites.length === 0 ? (
        <motion.div 
          className="favorites-empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>Your favorites list is empty.</p>
          <p>Start adding movies to see them here!</p>
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
            Showing {filteredFavorites.length} favorite{filteredFavorites.length !== 1 ? 's' : ''}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Favorites;