import { ActiveType, IWatched } from '../../../model/IMovie'
import { useEffect, useReducer, useState } from 'react'
import { ActionType, IAction, StatusType, fetchMovieReducer } from '../../../reducer/Reducer'
import Container from '../Container'
import Watched from '../watched/Watched'
import { useKey } from '../../../hooks/useKey'
import MovieDetail from '../detail/MovieDetail'

interface MovieDetailProps {
    selectedId?: string;
    watched: IWatched[];
    setWatched: React.Dispatch<React.SetStateAction<IWatched[]>>;
    activeDispatch: React.Dispatch<IAction>;
    active: ActiveType;
}

const initialState = {
    status: StatusType.INIT,
    movie: undefined,
    isLoading: false,
    error: ''
}

const MovieBox: React.FC<MovieDetailProps> = ({
    activeDispatch,
    selectedId,
    watched,
    setWatched,
    active
}) => {
    const [rating, setRating] = useState(0);
    const hasWatched = watched.find(watchedMovied => selectedId === watchedMovied.imdbID);
    const [{ movie, error, isLoading }, dispatch] = useReducer(fetchMovieReducer, initialState)

    const fetchMovie = async (movieId: string) => {
        try {
            dispatch({ type: ActionType.LOADING });

            const res = await fetch(`https://www.omdbapi.com/?apikey=7ad09941&i=${movieId}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error('Error occurs when fetching movie.')
            }

            if (data.Response === 'False') {
                dispatch({ type: ActionType.ERROR, error: data.Error });
                return;
            }

            dispatch({
                type: ActionType.MOVIE_RECEIVED,
                payload: {
                    movie: data,
                },
                error: ''
            })
        } catch (err: any) {
            dispatch({ type: ActionType.ERROR, error: err.message })
        } finally {
            dispatch({
                type: ActionType.FINISHED,
            })
        }
    }

    const handleCloseMovieDetail = () => {
        activeDispatch({ type: ActionType.RESET_MOVIE, active: 'watched' })
    }

    useKey('Escape', handleCloseMovieDetail);

    useEffect(() => {
        console.log(selectedId)
        if (!selectedId) return;
        fetchMovie(selectedId);
        activeDispatch({ type: ActionType.SET_ACTIVE, active: 'detail' })
    }, [selectedId])

    return (
        <Container type={'movie'} error={error} isLoading={isLoading}>
            {!selectedId && active === 'watched' &&
                <Watched
                    watched={watched}
                    setWatched={setWatched}
                    activeDispatch={activeDispatch}
                />
            }
            {selectedId && movie &&
                <MovieDetail
                    rating={rating}
                    setRating={setRating}
                    watched={watched}
                    setWatched={setWatched}
                    activeDispatch={activeDispatch}
                    hasWatched={hasWatched}
                    movie={movie}
                />
            }
        </Container>
    )
}

export default MovieBox;
