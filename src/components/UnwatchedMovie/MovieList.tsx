import Movie from './Movie';
import { type UnwatchedMoviesProps } from '../../utils/temp-movies';

type MovieListProps = {
  movies: UnwatchedMoviesProps[];
  selectMovie: (id: string) => void;
};

function MovieList({ movies, selectMovie }: MovieListProps) {
  return (
    <ul className='list list-movies'>
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={selectMovie} />
      ))}
    </ul>
  );
}

export default MovieList;
