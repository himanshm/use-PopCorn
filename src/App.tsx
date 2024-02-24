import { useEffect, useState } from 'react';

import {
  WatchedMoviesProps,
  type UnwatchedMoviesProps,
} from './utils/temp-movies';

import NavBar from './components/Logo/NavBar';
import Search from './components/Logo/Search.tsx';
import SearchResults from './components/Logo/SearchResults.tsx';
import Main from './components/Main.tsx';
import MoviesBox from './components/MoviesBox.tsx';
import Loader from './components/Loader.tsx';
import MovieList from './components/UnwatchedMovie/MovieList.tsx';
import WatchedSummary from './components/WatchedMovie/WatchedSummary.tsx';
import WatchedMoviesList from './components/WatchedMovie/WatchedMoviesList.tsx';
import ErrorMessage from './components/ErrorMessage.tsx';

const KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [movies, setMovies] = useState<UnwatchedMoviesProps[]>([]);
  const [watched, setWatched] = useState<WatchedMoviesProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<Error>(new Error('No error'));
  // const [error, setError] = useState<Error | null>(null);
  const [error, setError] = useState<string>();

  const tempQuery = 'interstellar';

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${tempQuery}`
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching movies!');
        const data = await res.json();

        // Using the response data to throw an error
        if (data.Response === 'False') throw new Error('Movie not found!');
        setMovies(data.Search);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);
  return (
    <>
      <NavBar>
        <Search />
        <SearchResults movies={movies} />
      </NavBar>
      <Main>
        {/* <MoviesBox element={<MovieList movies={movies} />} />
        <MoviesBox
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        /> */}
        <MoviesBox>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </MoviesBox>
        <MoviesBox>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </MoviesBox>
      </Main>
    </>
  );
}
