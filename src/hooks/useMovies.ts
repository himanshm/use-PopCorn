import { useEffect, useState } from 'react';
import { UnwatchedMoviesProps } from '../utils/movie-types';

export function useMovies(baseUrl: string, query: string, apikey: string) {
  const [movies, setMovies] = useState<UnwatchedMoviesProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchUrl = `${baseUrl}?apikey=${apikey}&s=${query}`;

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(fetchUrl, { signal: controller.signal });

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
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query, fetchUrl]);

  return { movies, isLoading, error };
}
