import React from 'react';
import './Container.css'
import ErrorMessage from './error/ErrorMessage';
import Loading from './loading/Loading';

interface ContainerProps {
    children: React.ReactNode;
    type: 'list' | 'detail';
    height?: number;
    error?: string;
    isLoading: boolean
}

const Container: React.FC<ContainerProps> = ({
    children,
    type,
    height,
    error,
    isLoading
}) => {
    const containerHeight = type === 'detail' && !height ? { height: 'fit-content' } : (type === 'list' && height && height > 0) ? { height: 'fit-content' } : { height: '100vh' }
    return (
        <div className={'cp-movie-container'} style={containerHeight}>
            {children}
            {error && <ErrorMessage message={error} />}
            {isLoading && <Loading />}
        </div>
    )
}

export default Container
