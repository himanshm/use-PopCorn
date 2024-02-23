import { type ReactNode, useState } from 'react';
import Button from '../UI/Button';

type UnwatchedMovieBoxProps = {
  children: ReactNode;
};

function UnwatchedMovieBox({ children }: UnwatchedMovieBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  function openHandler() {
    setIsOpen((prevState) => !prevState);
  }
  return (
    <div className='box'>
      <Button className='btn-toggle' onClick={openHandler}>
        {isOpen ? '–' : '+'}
      </Button>
      {isOpen ? children : null}
      {/* {isOpen ? <>{children}</> : null} */}
    </div>
  );
}

export default UnwatchedMovieBox;
