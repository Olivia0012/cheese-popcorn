import React, { createContext, useContext, useState } from 'react';
import { IMovie } from '../model/IMovie';

interface ISelectedMovieContext {
    selectedId?: string,
    setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>,
    movie?: IMovie,
    setMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>,
}

const SelectedMovieContext = createContext<ISelectedMovieContext | undefined>(undefined);

function SelectedMovieProvider({ children }: { children: React.ReactElement }) {
    const [selectedId, setSelectedId] = useState<string>();
    const [movie, setMovie] = useState<IMovie>();

    return (
        <SelectedMovieContext.Provider value={{ selectedId, setSelectedId, movie, setMovie }}>
            {children}
        </SelectedMovieContext.Provider>
    );
}

const useSelectedMovie = () => {
    const context = useContext(SelectedMovieContext);

    if (context === undefined) throw new Error('Selected Movie context is not avalible.')
    return context;
}

export { SelectedMovieProvider, useSelectedMovie };
