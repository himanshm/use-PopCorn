import { useState } from 'react';

import { type WatchedMoviesProps } from './utils/movie-types.ts';

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
import { useMovies } from './hooks/useMovies.ts';
import { useLocalStorageState } from './hooks/useLocalStorageState.ts';

const KEY: string = import.meta.env.VITE_API_KEY;

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>('');

  const { movies, isLoading, error } = useMovies(
    'http://www.omdbapi.com/',
    query,
    KEY
  );

  const [watched, setWatched] = useLocalStorageState([], 'watchedMovies');

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

  // This will only run after the watched is updated to the newest state
  // useEffect(() => {
  //   localStorage.setItem('watchedMovies', JSON.stringify(watched));
  // }, [watched]);

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
