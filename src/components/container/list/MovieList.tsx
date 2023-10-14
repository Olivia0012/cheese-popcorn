import React from 'react'
import { ActiveType, IMovie } from '../../../model/IMovie'
import Button from '../../button/Button'

interface MovieListProps {
    movies: IMovie[],
    onClick: (movie: IMovie) => void;
    setActive: React.Dispatch<React.SetStateAction<ActiveType>>;
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    resultNum: number;
}

const MovieList: React.FC<MovieListProps> = ({
    movies,
    onClick,
    setActive,
    page,
    setPage,
    resultNum
}) => {
    const totalPage = Math.ceil(resultNum / 10);

    const handleChangePage = (e: any, inc: boolean) => {
        e?.stopPropagation();

        if (!inc && Number(page) > 1) {
            setPage(pre => Number(pre) - 1 + '')
        } else if (inc && Number(page) <= totalPage - 1) {
            setPage(pre => Number(pre) + 1 + '')
        }
    }

    return (
        <>
            <div className='cp-movie-list-header'>
                <div className='cp-movie-list-page'>
                    <Button className='cp-button-page' text={'<'} onClick={(e) => handleChangePage(e, false)} />
                    <span><input value={page} onChange={(e) => setPage(e.currentTarget.value)} className='cp-movie-list-page-input' /> / {totalPage}</span>
                    <Button className='cp-button-page' text={'>'} onClick={(e) => handleChangePage(e, true)} />
                </div>
                <Button className='cp-button-back' text={'-'} onClick={(e) => { e?.stopPropagation(); setActive('watched') }} />
            </div>
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
