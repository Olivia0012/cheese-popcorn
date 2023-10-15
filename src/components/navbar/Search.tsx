import React, { Dispatch, SetStateAction, useRef } from 'react'
import Input from '../input/Input'
import Button from '../button/Button'
import { useKey } from '../../hooks/useKey';

interface SearchProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    text: string;
    onClick: () => void;
}

const Search: React.FC<SearchProps> = ({
    query,
    setQuery,
    text,
    onClick,
}) => {
    const searchInput: React.Ref<HTMLInputElement> = useRef(null);

    useKey('Enter', function () {
        if (document.activeElement === searchInput.current!) return;

        searchInput.current?.focus();
        setQuery(pre => '');
    });

    return (
        <div className='cp-search'>
            <Input query={query} setQuery={setQuery} className='cp-search-input' searchInput={searchInput} />
            <Button text={text} onClick={onClick} className='cp-search-button' />
        </div>
    )
}

export default Search
