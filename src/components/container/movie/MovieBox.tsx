import { IWatched } from '../../../model/IMovie'
import { useEffect, useReducer, useState } from 'react'
import { ActionType, IAction, StatusType, fetchMovieReducer } from '../../../reducer/Reducer'
import Container from '../Container'
import Watched from '../watched/Watched'
import { useKey } from '../../../hooks/useKey'
import MovieDetail from '../detail/MovieDetail'
import { useActive } from '../../../context/ActiveContext'
import { useSelectedMovie } from '../../../context/SelectedMovieContext'

interface MovieDetailProps {
    watched: IWatched[];
    setWatched: React.Dispatch<React.SetStateAction<IWatched[]>>;
    activeDispatch: React.Dispatch<IAction>;
}

const initialState = {
    status: StatusType.INIT,
    movie: undefined,
    isLoading: false,
    error: ''
}

const MovieBox: React.FC<MovieDetailProps> = ({
    activeDispatch,
    watched,
    setWatched,
}) => {
    const [rating, setRating] = useState(0);
    const { selectedId, setSelectedId, setMovie } = useSelectedMovie();
    const hasWatched = watched.find(watchedMovied => selectedId === watchedMovied.imdbID);
    const [{ movie, error, isLoading }, dispatch] = useReducer(fetchMovieReducer, initialState);
    const { active, setActive } = useActive();

    const fetchMovie = async (movieId: string) => {
        try {
            dispatch({ type: ActionType.LOADING });

            const res = await fetch(`https://www.omdbapi.com/?apikey=7ad09941&i=${movieId}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error('Error occurs when fetching movie.')
            }

            if (data.Response === 'False') {
                dispatch({ type: ActionType.ERROR, payload: { error: data.Error } });
                return;
            }

            dispatch({
                type: ActionType.MOVIE_RECEIVED,
                payload: {
                    movie: data,
                    error: ''
                },
            })
        } catch (err: any) {
            dispatch({ type: ActionType.ERROR, payload: { error: err.message } })
        } finally {
            dispatch({
                type: ActionType.FINISHED,
            })
        }
    }

    const handleCloseMovieDetail = () => {
        setSelectedId(undefined);
        setMovie(undefined);
        setActive('watched');
    }

    useKey('Escape', handleCloseMovieDetail);

    useEffect(() => {
        if (!selectedId) return;
        fetchMovie(selectedId);
        setActive('detail');
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
                    hasWatched={hasWatched}
                    movie={movie}
                />
            }
        </Container>
    )
}

export default MovieBox;
