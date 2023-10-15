import { useContext, useState, createContext } from 'react'

interface IMoviesContext {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const FetchMoviesContext = createContext<IMoviesContext | undefined>(undefined);

const FetchMoviesProvider = ({ children }: { children: React.ReactElement }) => {
    const [query, setQuery] = useState('Spider man');
    const [page, setPage] = useState('1');

    return (
        <FetchMoviesContext.Provider value={{ page, setPage, query, setQuery }}>
            {children}
        </FetchMoviesContext.Provider>
    )
}

const useFetchMovies = () => {
    const context = useContext<IMoviesContext | undefined>(FetchMoviesContext);

    if (context === undefined) throw new Error('Fetch Movies query context is not avalible.')
    return context;
}

export { FetchMoviesProvider, useFetchMovies }
