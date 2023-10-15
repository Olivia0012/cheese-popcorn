import React, { useEffect, useRef } from 'react'
import Input from '../input/Input'
import Button from '../button/Button'
import { useKey } from '../../hooks/useKey';
import { useActive } from '../../context/ActiveContext';
import { useFetchMovies } from '../../context/MoviesContext';
import { ActionType, IAction } from '../../reducer/Reducer';

interface SearchProps {
    text: string;
    dispatch: React.Dispatch<IAction>;
}

const Search: React.FC<SearchProps> = ({
    text,
    dispatch
}) => {
    const { setActive } = useActive();
    const { query, setQuery, page } = useFetchMovies();

    const handleClickSearch = (): void => {
        setActive('list');
        fetchMovies();
    }

    const fetchMovies = async () => {
        try {
            dispatch({ type: ActionType.LOADING })

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
                dispatch({ type: ActionType.ERROR, payload: { error: data.Error } })
                return;
            }

            dispatch({
                type: ActionType.MOVIES_RECEIVED,
                payload: {
                    movies: data.Search,
                    resultNum: Number(data.totalResults),
                    error: ''
                },
            })
        } catch (err: any) {
            dispatch({ type: ActionType.ERROR, payload: { error: err.message } })
        } finally {
            dispatch({
                type: ActionType.FINISHED,
            })
        }
    };

    const searchInput: React.Ref<HTMLInputElement> = useRef(null);

    useKey('Enter', function () {
        if (document.activeElement === searchInput.current!) return;

        searchInput.current?.focus();
        setQuery(pre => '');
    });

    useEffect(() => {
        fetchMovies();
    }, [page])

    return (
        <div className='cp-search'>
            <Input query={query} setQuery={setQuery} className='cp-search-input' searchInput={searchInput} />
            <Button text={text} onClick={handleClickSearch} className='cp-search-button' />
        </div>
    )
}

export default Search
