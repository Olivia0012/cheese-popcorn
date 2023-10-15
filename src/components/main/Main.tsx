import MovieList from '../container/list/MovieList'
import { IWatched } from '../../model/IMovie'
import { useLocalStorageState } from '../../hooks/useLocalStorageState'
import MovieBox from '../container/movie/MovieBox'
import { IAction, IState } from '../../reducer/Reducer'



interface MainProps {
    dispatch: React.Dispatch<IAction>;
    state: IState;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

const Main: React.FC<MainProps> = ({
    setPage,
    dispatch,
    state
}) => {
    const [watched, setWatched] = useLocalStorageState<IWatched>([], 'watched');

    return (
        <div className='cp-movie-main-container'>
            <MovieList state={state} setPage={setPage} dispatch={dispatch} />
            {<MovieBox selectedId={state.selectedId} watched={watched} setWatched={setWatched} activeDispatch={dispatch} active={state.active!} />}
        </div>
    )
}

export default Main
