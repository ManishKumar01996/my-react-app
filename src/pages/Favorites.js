import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <div className="favorites-page">
      <h1>Your Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet</p>
      ) : (
        <div className="favorites-list">
          {favorites.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;