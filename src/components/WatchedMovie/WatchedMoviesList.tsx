// import WatchedMovie from './WatchedMovie';
import { type WatchedMoviesProps } from '../../utils/temp-movies';

export type WatchedMoviesListProps = {
  watched: WatchedMoviesProps[];
  onDeleteMovie: (id: string) => void;
};

function WatchedMoviesList({ watched, onDeleteMovie }: WatchedMoviesListProps) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        // <WatchedMovie movie={movie} key={movie.imdbID} />
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button
              className='btn-delete'
              onClick={() => onDeleteMovie(movie.imdbID)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
