import React from 'react';
import './Container.css'
import Loading from './loading/Loading';
import Message from './error/Message';

interface ContainerProps {
    children: React.ReactNode;
    type: 'list' | 'movie';
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
    const containerHeight = type === 'movie' && !height ? { height: 'fit-content' } : (type === 'list' && height && height > 0) ? { height: 'fit-content' } : { height: '100vh' }
    return (
        <div className={'cp-movie-container'} style={containerHeight}>
            {!error && !isLoading && children}
            {error && <Message message={error} />}
            {isLoading && <Loading />}
        </div>
    )
}

export default Container
