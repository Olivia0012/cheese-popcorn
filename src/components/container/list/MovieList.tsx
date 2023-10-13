import React from 'react'
import { IMovie } from '../../../model/IMovie'

interface MovieListProps {
    movies: IMovie[],
    onClick: (movie: IMovie) => void
}

const MovieList: React.FC<MovieListProps> = ({
    movies,
    onClick
}) => {

    return (
        <>
            {movies.map((ele) =>
                <div key={ele.imdbID} className='cp-movie-box' onClick={() => onClick(ele)}>
                    <div className='cp-movie-item'>
                        <img src={ele.Poster} alt={ele.Title} className='cp-movie-img' />
                        <div className='cp-movie-text'>
                            <p className='cp-movie-title'>{ele.Title}</p>
                            <p><span>📅 </span>{ele.Year}</p>
                        </div>
                    </div>
                    <div className='cp-movie-divider' />
                </div>)
            }
        </ >
    )
}

export default MovieList
