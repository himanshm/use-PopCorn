import { useState } from 'react';
import WatchedSummary from './WatchedSummary';
import WatchedMoviesList from './WatchedMoviesList';
import Button from '../UI/Button';
import { tempWatchedData } from '../../utils/temp-movies';

function WatchedMovieBox() {
  const [isOpen, setIsOpen] = useState(true);

  function handleOpen() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <div className='box'>
      <Button className='btn-toggle' onClick={handleOpen}>
        {isOpen ? '–' : '+'}
      </Button>
      {isOpen && (
        <>
          <WatchedSummary watched={tempWatchedData} />
          <WatchedMoviesList watched={tempWatchedData} />
        </>
      )}
    </div>
  );
}

export default WatchedMovieBox;
