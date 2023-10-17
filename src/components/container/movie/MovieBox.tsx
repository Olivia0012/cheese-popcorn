import { IWatched } from '../../../model/IMovie'
import Container from '../Container'
import Watched from '../watched/Watched'
import MovieDetail from '../detail/MovieDetail'
import { useLocalStorageState } from '../../../hooks/useLocalStorageState'
import { useMovies } from '../../../context/MoviesContext'
import { useActive } from '../../../context/ActiveContext'

const MovieBox = () => {
    const { selectedId, error, isLoading } = useMovies();
    const [watched, setWatched] = useLocalStorageState<IWatched>([], 'watched');
    const hasWatched = watched.find(watchedMovied => selectedId === watchedMovied.imdbID);
    const { active } = useActive();

    return (
        <Container type={'movie'} error={error} isLoading={isLoading}>
            {!selectedId && active === 'watched' &&
                <Watched
                    watched={watched}
                    setWatched={setWatched}
                />
            }
            {selectedId &&
                <MovieDetail
                    watched={watched}
                    setWatched={setWatched}
                    hasWatched={hasWatched}
                />
            }
        </Container>
    )
}

export default MovieBox;
