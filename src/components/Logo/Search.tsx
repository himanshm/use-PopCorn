import { useRef } from 'react';

function Search() {
  const query = useRef<HTMLInputElement>(null);

  // if(query.current !== null )

  const enteredMovie = query.current?.value;
  console.log(enteredMovie);
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      ref={query}
    />
  );
}

export default Search;
