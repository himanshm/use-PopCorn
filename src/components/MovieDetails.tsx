type MovieDetailsProps = {
  movieId: string;
  onCloseMovie: () => void;
};

function MovieDetails({ movieId, onCloseMovie }: MovieDetailsProps) {
  return (
    <div className='details'>
      <button className='btn-back' onClick={onCloseMovie}>
        &larr;
      </button>
      {movieId}
    </div>
  );
}

export default MovieDetails;
