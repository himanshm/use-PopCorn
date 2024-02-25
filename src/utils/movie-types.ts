export type UnwatchedMoviesProps = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type WatchedMoviesProps = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
};
