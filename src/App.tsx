import { useState } from 'react';
import NavBar from './components/Logo/NavBar';
import Search from './components/Logo/Search.tsx';
import SearchResults from './components/Logo/SearchResults.tsx';
import { type UnwatchedMoviesProps } from './utils/temp-movies';

import { tempMovieData } from './utils/temp-movies';
import Main from './components/Main.tsx';
import UnwatchedMovieBox from './components/UnwatchedMovie/UnwatchedMoviesBox.tsx';
import WatchedMovieBox from './components/WatchedMovie/WatchedMovieBox.tsx';
import MovieList from './components/UnwatchedMovie/MovieList.tsx';

export default function App() {
  const [movies, setMovies] = useState<UnwatchedMoviesProps[]>(tempMovieData);
  return (
    <>
      <NavBar>
        <Search />
        <SearchResults movies={movies} />
      </NavBar>
      <Main>
        <UnwatchedMovieBox>
          <MovieList movies={movies} />
        </UnwatchedMovieBox>
        <WatchedMovieBox />
      </Main>
    </>
  );
}
