import { useEffect, useState } from 'react';
import { IMovie } from '../model/IMovie';

export function useMovies(query: string, page: string, setActive: any) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultNum, setResultNum] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setMovies([]);
        setError('');
        setIsLoading(true);

        if (query.length < 4) {
          return;
        }

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=7ad09941&s=${query}&page=${page}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error('Error occurs when fetching movies.');
        }

        if (data.Response === 'False') {
          setError(data.Error);
          return;
        }

        setMovies(data.Search);
        setError('');
        setResultNum(data.totalResults);
        return { movies, error, isLoading, resultNum };
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    setActive('list');
  }, [page]);

  return { movies, isLoading, error, resultNum };
}
