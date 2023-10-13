import React, { Dispatch, SetStateAction } from 'react'
import Input from '../input/Input'
import Button from '../button/Button'

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
    onClick
}) => {
    return (
        <div className='cp-search'>
            <Input query={query} setQuery={setQuery} className='cp-search-input' />
            <Button text={text} onClick={onClick} className='cp-search-button' />
        </div>
    )
}

export default Search
