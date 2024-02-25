import { UnwatchedMoviesProps } from '../../utils/movie-types';

type SearchResultsProps = {
  movies: UnwatchedMoviesProps[];
};

function SearchResults({ movies }: SearchResultsProps) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default SearchResults;
