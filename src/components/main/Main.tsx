import MovieList from '../container/list/MovieList'
import MovieBox from '../container/movie/MovieBox'

const Main = () => {
    return (
        <div className='cp-movie-main-container'>
            <MovieList />
            {<MovieBox />}
        </div>

    )
}

export default Main
