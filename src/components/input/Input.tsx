import React, { useState } from 'react'

interface InputProps {
    className?: string;
    query?: string;
    setQuery: (e: string) => void;
}

const Input: React.FC<InputProps> = ({
    className,
    query,
    setQuery
}) => {
    const [value, setValue] = useState(query);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setValue(e.currentTarget.value);
        setQuery(e.currentTarget.value);
    }

    return (
        <input type='text' aria-label="generic-input" value={value} onChange={handleChange} className={className} />
    )
}

export default Input
