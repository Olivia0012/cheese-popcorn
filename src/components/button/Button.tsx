import React from 'react';
import './Button.css'

interface ButtonProps {
    className?: string;
    text: string;
    onClick: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({
    className,
    text,
    onClick,
}) => {
    return (
        <button className={className} onClick={onClick}>{text}</button>
    )
}

export default Button
