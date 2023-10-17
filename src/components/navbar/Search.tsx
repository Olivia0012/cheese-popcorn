import React, { useRef } from 'react'
import Input from '../input/Input'
import Button from '../button/Button'
import { useKey } from '../../hooks/useKey';
import { useActive } from '../../context/ActiveContext';
import { useMovies } from '../../context/MoviesContext';

interface SearchProps {
    text: string;
}

const Search: React.FC<SearchProps> = ({
    text,
}) => {
    const { setActive } = useActive();
    const { query, setQuery, fetchMovies } = useMovies();

    const handleClickSearch = (): void => {
        setActive('list');
        fetchMovies();
    }

    const searchInput: React.Ref<HTMLInputElement> = useRef(null);

    useKey('Enter', function () {
        if (document.activeElement === searchInput.current!) return setQuery('');
        searchInput.current?.focus();
    });

    return (
        <div className='cp-search'>
            <Input query={query} setQuery={setQuery} className='cp-search-input' searchInput={searchInput} />
            <Button text={text} onClick={handleClickSearch} className='cp-search-button' />
        </div>
    )
}

export default Search
