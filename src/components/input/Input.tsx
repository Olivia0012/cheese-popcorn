import React from 'react'

interface InputProps {
    className?: string;
    query?: string;
    setQuery: (e: string) => void;
    searchInput?: React.Ref<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({
    className,
    query,
    setQuery,
    searchInput
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.currentTarget.value);
    }

    return (
        <input type='text' aria-label="generic-input" value={query} onChange={handleChange} className={className} ref={searchInput} />
    )
}

export default Input
