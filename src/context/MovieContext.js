import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

const API_KEY = '34629d49';
const BASE_URL = 'https://www.omdbapi.com/';

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('omdb-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [genres, setGenres] = useState([]); // Added genres state

  // Initialize with some common genres (OMDb doesn't provide a genre list API)
  const initializeGenres = useCallback(() => {
    const commonGenres = [
      'Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
      'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy',
      'Film-Noir', 'History', 'Horror', 'Music', 'Musical',
      'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller',
      'War', 'Western'
    ];
    setGenres(commonGenres.map((genre, index) => ({ id: index + 1, name: genre })));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('omdb-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const makeApiCall = useCallback(async (params) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          ...params
        },
        timeout: 5000 
      });
      
      if (response.data.Response === 'False') {
        throw new Error(response.data.Error || 'API request failed');
      }
      return response.data;
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  }, []);

  // Enhanced fetch function with filtering support
  const fetchMovies = useCallback(async (options = {}) => {
    const { query = '', page = 1, year } = options;
    setLoading(true);
    setError(null);
    try {
      const params = {
        s: query || 'movie', // Default to 'movie' if no query
        type: 'movie',
        page
      };

      if (year) {
        params.y = year;
      }

      const data = await makeApiCall(params);
      const results = data.Search || [];

      // Enhance movies with genre information (OMDb returns genre as a string)
      const enhancedResults = results.map(movie => ({
        ...movie,
        genres: movie.Genre ? movie.Genre.split(', ').map(genre => ({
          id: genre.toLowerCase().replace(' ', '-'),
          name: genre.trim()
        })) : []
      }));

      setMovies(enhancedResults);
      return enhancedResults;
    } catch (err) {
      setError(err.message || 'Failed to fetch movies');
      return [];
    } finally {
      setLoading(false);
    }
  }, [makeApiCall]);

  // Search movies with filtering options
  const searchMovies = useCallback(async (query, options = {}) => {
    return fetchMovies({ ...options, query });
  }, [fetchMovies]);

  // Get movie details with full information
  const getMovieDetails = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall({
        i: id,
        plot: 'full'
      });
      
      // Enhance with genre array
      const enhancedMovie = {
        ...data,
        genres: data.Genre ? data.Genre.split(', ').map(genre => ({
          id: genre.toLowerCase().replace(' ', '-'),
          name: genre.trim()
        })) : []
      };

      setCurrentMovie(enhancedMovie);
      return enhancedMovie;
    } catch (err) {
      setError(err.message || 'Failed to load movie details');
      return null;
    } finally {
      setLoading(false);
    }
  }, [makeApiCall]);

  // Favorite management
  const addToFavorites = useCallback((movie) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.imdbID === movie.imdbID);
      return exists ? prev : [...prev, movie];
    });
  }, []);

  const removeFromFavorites = useCallback((imdbID) => {
    setFavorites(prev => prev.filter(movie => movie.imdbID !== imdbID));
  }, []);

  const isFavorite = useCallback((imdbID) => {
    return favorites.some(fav => fav.imdbID === imdbID);
  }, [favorites]);

  // Initialize with popular movies and genres
  useEffect(() => {
    initializeGenres();
    fetchMovies();
  }, [fetchMovies, initializeGenres]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        favorites,
        currentMovie,
        genres, // Added genres to context
        loading,
        error,
        fetchMovies, // Replaced fetchPopularMovies with more generic fetchMovies
        searchMovies,
        getMovieDetails,
        addToFavorites,
        removeFromFavorites,
        isFavorite
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

const useMovieContext = () => useContext(MovieContext);

export { MovieContext, MovieProvider, useMovieContext };