import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

const API_KEY = '34629d49';
const BASE_URL = 'https://www.omdbapi.com/';

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage if available
    const saved = localStorage.getItem('omdb-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('omdb-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Memoized API call function
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

  // Fetch popular movies with pagination
  const fetchPopularMovies = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall({
        s: 'movie',
        type: 'movie',
        page
      });
      setMovies(data.Search || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch popular movies');
    } finally {
      setLoading(false);
    }
  }, [makeApiCall]);

  // Search movies with debounce-ready function
  const searchMovies = useCallback(async (query, page = 1) => {
    if (!query.trim()) {
      fetchPopularMovies();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall({
        s: query,
        type: 'movie',
        page
      });
      setMovies(data.Search || []);
    } catch (err) {
      setError(err.message || 'No movies found');
    } finally {
      setLoading(false);
    }
  }, [fetchPopularMovies, makeApiCall]);

  // for  movie details
  const getMovieDetails = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await makeApiCall({
        i: id,
        plot: 'full'
      });
      setCurrentMovie(data);
      return data;
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

  // Initialize with popular movies
  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        favorites,
        currentMovie,
        loading,
        error,
        fetchPopularMovies,
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