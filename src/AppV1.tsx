import { useState } from 'react';
import NavBar from './components/Logo/NavBar';
import Search from './components/Logo/Search.tsx';
import SearchResults from './components/Logo/SearchResults.tsx';
import {
  WatchedMoviesProps,
  type UnwatchedMoviesProps,
} from './utils/movie-types.ts';

import { tempMovieData, tempWatchedData } from './utils/movie-types.ts';
import Main from './components/Main.tsx';
import MoviesBox from './components/MoviesBox.tsx';
import WatchedSummary from './components/WatchedMovie/WatchedSummary.tsx';
import WatchedMoviesList from './components/WatchedMovie/WatchedMoviesList.tsx';
import MovieList from './components/UnwatchedMovie/MovieList.tsx';

export default function App() {
  const [movies, setMovies] = useState<UnwatchedMoviesProps[]>(tempMovieData);
  const [watched, setWatched] = useState<WatchedMoviesProps[]>(tempWatchedData);
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
          <MovieList movies={movies} />
        </MoviesBox>
        <MoviesBox>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </MoviesBox>
      </Main>
    </>
  );
}
