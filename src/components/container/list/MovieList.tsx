import React, { useEffect } from 'react'
import { IMovie } from '../../../model/IMovie'
import Button from '../../button/Button'
import Container from '../Container';
import { useWindowWide } from '../../../hooks/useWindowWidth';
import { IAction, IState, StatusType } from '../../../reducer/Reducer';
import { useActive } from '../../../context/ActiveContext';
import { useSelectedMovie } from '../../../context/SelectedMovieContext';
import { useFetchMovies } from '../../../context/MoviesContext';

interface MovieListProps {
    dispatch: React.Dispatch<IAction>;
    state: IState;
}

interface MovieListHeaderProps {
    resultNum: number;
}

const MovieListHeader = ({
    resultNum,
}: MovieListHeaderProps) => {
    const { setActive } = useActive();
    const totalPage = Math.ceil(resultNum / 10);
    const { page, setPage } = useFetchMovies();

    const handleChangePage = (e: any, inc: boolean) => {
        e?.stopPropagation();
        let newPage = '';

        if (!inc && Number(page) > 1) {
            newPage = Number(page) - 1 + '';
        } else if (inc && Number(page) <= totalPage - 1) {
            newPage = Number(page) + 1 + '';
        }
        setPage(newPage);
    }

    return (
        <div className='cp-movie-list-header'>
            <div className='cp-movie-list-page'>
                <Button className='cp-button-page' text={'<'} onClick={(e) => handleChangePage(e, false)} />
                <span><input value={page} onChange={(e) => setPage(e.currentTarget.value)} className='cp-movie-list-page-input' /> / {totalPage}</span>
                <Button className='cp-button-page' text={'>'} onClick={(e) => handleChangePage(e, true)} />
            </div>
            <Button className='cp-button-back' text={'-'} onClick={(e) => { e?.stopPropagation(); setActive('watched') }} />
        </div>
    )
}

const Movies = ({
    movies,
}: {
    movies: IMovie[],
    dispatch: React.Dispatch<IAction>;
}) => {
    const { setActive } = useActive();
    const { setSelectedId } = useSelectedMovie();
    return (
        <>
            {movies.map((movie: IMovie) => (
                <div key={movie.imdbID} className='cp-movie-box' onClick={() => { setSelectedId(movie.imdbID); setActive('detail') }}>
                    <div className='cp-movie-item'>
                        <img src={movie.Poster} alt={movie.Title} className='cp-movie-img' />
                        <div className='cp-movie-text'>
                            <p className='cp-movie-title'>{movie.Title}</p>
                            <p><span>📅 </span>{movie.Year}</p>
                        </div>
                    </div>
                    <div className='cp-movie-divider' />
                </div>
            ))}
        </>
    )
}

const MovieList: React.FC<MovieListProps> = ({
    dispatch,
    state,
}) => {
    const { movies, error, isLoading, status, resultNum } = state;
    const movieNumber = resultNum || 0;
    const { active } = useActive();
    const { setSelectedId, setMovie } = useSelectedMovie();
    const { query } = useFetchMovies();

    useEffect(() => {
        setSelectedId(undefined);
        setMovie(undefined);
    }, [query])

    return (
        <Container type={'list'} height={movies?.length} error={error} isLoading={isLoading} >
            {(useWindowWide() > 800 || active === 'list') && status === StatusType.READY &&
                <>
                    <MovieListHeader
                        resultNum={movieNumber}
                    />

                    {movies && <Movies
                        movies={movies}
                        dispatch={dispatch} />
                    }
                </>
            }
        </Container >
    )
}

export default MovieList
