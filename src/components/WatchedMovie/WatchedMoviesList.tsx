import WatchedMovie from './WatchedMovie';
import { type WatchedMoviesProps } from '../../utils/temp-movies';

export type WatchedMoviesListProps = {
  watched: WatchedMoviesProps[];
};

function WatchedMoviesList({ watched }: WatchedMoviesListProps) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
