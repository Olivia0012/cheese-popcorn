import { useContext, useState, createContext, useEffect } from 'react'
import { IMovie } from '../model/IMovie';

interface IMoviesContext {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    selectedId?: string,
    setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>,
    movie?: IMovie,
    setMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>,
    fetchMovies: () => void;
    movies: IMovie[];
    setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
    resultNum: number,
    setResultNum: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    error?: string,
    setError: React.Dispatch<React.SetStateAction<string | undefined>>,
}

const FetchMoviesContext = createContext<IMoviesContext | undefined>(undefined);

const MoviesProvider = ({ children }: { children: React.ReactElement }) => {
    const [query, setQuery] = useState('Spider man');
    const [page, setPage] = useState('1');
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [selectedId, setSelectedId] = useState<string>();
    const [movie, setMovie] = useState<IMovie>();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [resultNum, setResultNum] = useState(0);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            setError(undefined);

            if (query!.length < 4) {
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
            setResultNum(Number(data.totalResults))
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchMovie = async (movieId: string) => {
        try {
            setLoading(true);
            setError(undefined);

            const res = await fetch(`https://www.omdbapi.com/?apikey=7ad09941&i=${movieId}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error('Error occurs when fetching movie.')
            }

            if (data.Response === 'False') {
                setError(data.Error);
                return;
            }

            setMovie(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!selectedId) return;
        fetchMovie(selectedId);
    }, [selectedId]);

    useEffect(() => {
        setSelectedId(undefined);
        setMovie(undefined);
    }, [query])

    useEffect(() => {
        fetchMovies();
    }, [page])

    return (
        <FetchMoviesContext.Provider value={{
            page,
            setPage,
            query,
            setQuery,
            fetchMovies,
            movies,
            setMovies,
            selectedId,
            setSelectedId,
            movie,
            setMovie,
            resultNum,
            setResultNum,
            isLoading,
            setLoading,
            error,
            setError
        }}>
            {children}
        </FetchMoviesContext.Provider>
    )
}

const useMovies = () => {
    const context = useContext<IMoviesContext | undefined>(FetchMoviesContext);

    if (context === undefined) throw new Error('Fetch Movies query context is not avalible.')
    return context;
}

export { MoviesProvider, useMovies }
