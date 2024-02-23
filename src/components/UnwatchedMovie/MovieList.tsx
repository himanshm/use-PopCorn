import Movie from './Movie';
import { type UnwatchedMoviesProps } from '../../utils/temp-movies';

type MovieListProps = {
  movies: UnwatchedMoviesProps[];
};

function MovieList({ movies }: MovieListProps) {
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default MovieList;
