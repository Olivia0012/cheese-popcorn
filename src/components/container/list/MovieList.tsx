import React, { useEffect } from 'react'
import { IMovie } from '../../../model/IMovie'
import Button from '../../button/Button'
import Container from '../Container';
import { useWindowWide } from '../../../hooks/useWindowWidth';
import { ActionType, IAction, IState, StatusType } from '../../../reducer/Reducer';

interface MovieListProps {
    dispatch: React.Dispatch<IAction>;
    state: IState;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

interface MovieListHeaderProps {
    page: string | undefined;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    resultNum: number;
    dispatch: React.Dispatch<IAction>;
}

const MovieListHeader = ({
    page,
    setPage,
    resultNum,
    dispatch
}: MovieListHeaderProps) => {
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
        <div className='cp-movie-list-header'>
            <div className='cp-movie-list-page'>
                <Button className='cp-button-page' text={'<'} onClick={(e) => handleChangePage(e, false)} />
                <span><input value={page} onChange={(e) => setPage(e.currentTarget.value)} className='cp-movie-list-page-input' /> / {totalPage}</span>
                <Button className='cp-button-page' text={'>'} onClick={(e) => handleChangePage(e, true)} />
            </div>
            <Button className='cp-button-back' text={'-'} onClick={(e) => { e?.stopPropagation(); dispatch({ type: ActionType.SET_ACTIVE, active: 'watched' }) }} />
        </div>
    )
}

const Movies = ({
    movies,
    dispatch
}: {
    movies: IMovie[],
    dispatch: React.Dispatch<IAction>;
}) => {
    return (
        <>
            {movies.map((movie: IMovie) => (
                <div key={movie.imdbID} className='cp-movie-box' onClick={() => dispatch({ type: ActionType.FETCH_MOVIE, selectedId: movie.imdbID, active: 'detail' })}>
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
    setPage,
    dispatch,
    state
}) => {
    const { movies, error, isLoading, status, query, page, active, resultNum } = state;
    const movieNumber = resultNum || 0;

    const fetchMovies = async () => {
        try {
            dispatch({ type: ActionType.LOADING })

            if (query!.length < 4) {
                return;
            }

            const res = await fetch(
                `https://www.omdbapi.com/?apikey=7ad09941&s=${query}&page=${page}`
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error('Error occurs when fetching movies.');
            }

            if (data.Response === 'False') {
                dispatch({ type: ActionType.ERROR, error: data.Error })
                return;
            }
            console.log(data.totalResults)
            dispatch({
                type: ActionType.MOVIES_RECEIVED,
                resultNum: Number(data.totalResults),
                payload: {
                    movies: data.Search,
                },
                active: 'list',
                error: ''
            })
        } catch (err: any) {
            dispatch({ type: ActionType.ERROR, error: err.message })
        } finally {
            dispatch({
                type: ActionType.FINISHED,
            })
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [page])

    useEffect(() => {
        dispatch({ type: ActionType.RESET_MOVIE })
    }, [query])

    return (
        <Container type={'list'} height={movies?.length} error={error} isLoading={isLoading} >
            {(useWindowWide() > 800 || active === 'list') && status === StatusType.READY &&
                <>
                    <MovieListHeader
                        page={page}
                        setPage={setPage}
                        resultNum={movieNumber}
                        dispatch={dispatch}
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
