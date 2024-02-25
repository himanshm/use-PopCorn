import { type UnwatchedMoviesProps } from '../../utils/movie-types';

type MovieListProps = {
  movies: UnwatchedMoviesProps[];
  onSelectMovie: (id: string) => void;
};

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className='list list-movies'>
      {movies.map((movie) => (
        // <Movie movie={movie} key={movie.imdbID} onSelectMovie={selectMovie} />
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
