import { useEffect, useState } from 'react';
import StarRating from './UI/StarRating';
import Loader from './Loader';

const KEY = import.meta.env.VITE_API_KEY;

type MovieDetailsProps = {
  movieId: string;
  onCloseMovie: () => void;
};

type MovieProps = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
};

function MovieDetails({ movieId, onCloseMovie }: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieProps | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
      );

      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }

    fetchMovieDetails();
  }, [movieId]);
  return (
    <div className='details'>
      {isLoading && <Loader />}
      <header>
        <button className='btn-back' onClick={onCloseMovie}>
          &larr;
        </button>
        {movie && (
          <>
            <img src={movie.Poster} alt={`Poster of ${movie?.Title} movie`} />
            <div className='details-overview'>
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </>
        )}
      </header>
      <section>
        <div className='rating'>
          <StarRating maxRating={10} color='#FCC419' size={24} />
        </div>

        {movie && (
          <>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed By {movie.Director}</p>
          </>
        )}
      </section>
    </div>
  );
}

export default MovieDetails;
