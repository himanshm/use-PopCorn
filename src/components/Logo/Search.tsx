import { useRef, type ChangeEvent } from 'react';
import { useKey } from '../../hooks/useKey';

type SearchProps = {
  query: string;
  handleSetQuery: (value: string) => void;
};
function Search({ query, handleSetQuery }: SearchProps) {
  const inputElement = useRef<HTMLInputElement>(null);

  /* we need to use an effect in order to use a ref that contains a DOM element like this one because the ref only gets added to this DOM element here after the DOM has already loaded, therefore we can only access it in effect which also runs after the DOM has been loaded. So this is the perfect place for using a ref that contains a DOM element. */

  useKey('Enter', () => {
    if (document.activeElement === inputElement.current) return;
    inputElement.current!.focus();
    handleSetQuery('');
  });

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
      ref={inputElement}
    />
  );
}

export default Search;
