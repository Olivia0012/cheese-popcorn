import React, { Dispatch, SetStateAction } from 'react'
import Input from '../input/Input'
import Button from '../button/Button'

interface SearchProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    text: string;
    onClick: () => void;
    searchInput: React.Ref<HTMLInputElement>
}

const Search: React.FC<SearchProps> = ({
    query,
    setQuery,
    text,
    onClick,
    searchInput
}) => {
    return (
        <div className='cp-search'>
            <Input query={query} setQuery={setQuery} className='cp-search-input' searchInput={searchInput} />
            <Button text={text} onClick={onClick} className='cp-search-button' />
        </div>
    )
}

export default Search
