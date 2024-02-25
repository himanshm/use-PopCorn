import { useEffect, useState } from 'react';

import {
  type WatchedMoviesProps,
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
import MovieDetails from './components/MovieDetails.tsx';

const KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<UnwatchedMoviesProps[]>([]);
  const [watched, setWatched] = useState<WatchedMoviesProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>('');
  // const [error, setError] = useState<Error>(new Error('No error'));
  // const [error, setError] = useState<Error | null>(null);

  function handleQuery(newQuery: string) {
    setQuery(newQuery);
  }

  function handleSelectedMovie(id: string) {
    setSelectedId(id === selectedId ? '' : id);
  }

  function handleCloseMovie() {
    setSelectedId('');
  }

  function handleAddWatchedMovie(movie: WatchedMoviesProps) {
    setWatched((prevWatchedMovie) => [...prevWatchedMovie, movie]);
  }

  function handleDeleteWatchedMovie(id: string) {
    setWatched((prevWatchedMovie) =>
      prevWatchedMovie.filter((movie) => movie.imdbID !== id)
    );
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching movies!');
        const data = await res.json();

        if (data.Response === 'False') throw new Error('Movie not found!');
        setMovies(data.Search);
        setError('');
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') {
            console.error(error.message);
            setError(error.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }
    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);
  return (
    <>
      <NavBar>
        <Search query={query} handleSetQuery={handleQuery} />
        <SearchResults movies={movies} />
      </NavBar>
      <Main>
        <MoviesBox>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </MoviesBox>
        <MoviesBox>
          {selectedId ? (
            <MovieDetails
              movieId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </MoviesBox>
      </Main>
    </>
  );
}
