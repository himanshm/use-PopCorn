import { UnwatchedMoviesProps } from '../../utils/temp-movies';

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
