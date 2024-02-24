import { useEffect, useState } from 'react';
import StarRating from './UI/StarRating';
import Loader from './Loader';
import { type WatchedMoviesProps } from '../utils/temp-movies';

const KEY = import.meta.env.VITE_API_KEY;

type MovieDetailsProps = {
  movieId: string;
  onCloseMovie: () => void;
  onAddWatchedMovie: (movie: WatchedMoviesProps) => void;
  watched: WatchedMoviesProps[];
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
  UserRating: number;
};

const initialMovie: MovieProps = {
  Title: '',
  Year: '',
  Poster: '',
  Runtime: '',
  imdbRating: '',
  Plot: '',
  Released: '',
  Actors: '',
  Director: '',
  Genre: '',
  UserRating: 0,
};

function MovieDetails({
  movieId,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieProps>(initialMovie);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;

  function handleAddWatchedMovie() {
    const newWatchedMovie: WatchedMoviesProps = {
      imdbID: movieId,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: Number(movie.Runtime.split(' ')[0]),
      imdbRating: Number(movie.imdbRating),
      userRating: Number(rating),
    };

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

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
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                color='#FCC419'
                size={24}
                onSetRating={setRating}
              />

              <button className='btn-add' onClick={handleAddWatchedMovie}>
                + Add to list
              </button>
            </>
          ) : (
            <p>
              You rated with movie {watchedUserRating} <span>⭐️</span>.
            </p>
          )}
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
