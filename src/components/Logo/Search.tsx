import { type ChangeEvent } from 'react';

type SearchProps = {
  query: string;
  handleSetQuery: (value: string) => void;
};
function Search({ query, handleSetQuery }: SearchProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    handleSetQuery(event.target.value);
  }
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={handleChange}
    />
  );
}

export default Search;
