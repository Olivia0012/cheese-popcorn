import MovieList from '../container/list/MovieList'
import { IWatched } from '../../model/IMovie'
import { useLocalStorageState } from '../../hooks/useLocalStorageState'
import MovieBox from '../container/movie/MovieBox'
import { IAction, IState } from '../../reducer/Reducer'
import { SelectedMovieProvider } from '../../context/SelectedMovieContext'

interface MainProps {
    dispatch: React.Dispatch<IAction>;
    state: IState;
}

const Main: React.FC<MainProps> = ({
    dispatch,
    state
}) => {
    const [watched, setWatched] = useLocalStorageState<IWatched>([], 'watched');

    return (
        <SelectedMovieProvider>
            <div className='cp-movie-main-container'>
                <MovieList state={state} dispatch={dispatch} />
                {<MovieBox watched={watched} setWatched={setWatched} activeDispatch={dispatch} />}
            </div>
        </SelectedMovieProvider>
    )
}

export default Main
