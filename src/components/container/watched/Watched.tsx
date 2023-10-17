import React from 'react'
import './Watched.css'
import Button from '../../button/Button';
import { IWatched } from '../../../model/IMovie';
import Message from '../error/Message';
import { useActive } from '../../../context/ActiveContext';
import { useMovies } from '../../../context/MoviesContext';

interface WatchedListProps {
    watched: IWatched[];
    setWatched: React.Dispatch<React.SetStateAction<IWatched[]>>;
}

interface WatchedSummaryProps {
    watchedNum: number;
    avgRating: string;
    avgIMDBRating: string;
    avgRuntime: string;
}

interface WatchedMoviePros {
    watchedMovie: IWatched,
    handleRemoveWatched: (watchedMovie: IWatched) => void,
}

function average(nums: number[]) {
    const sum = nums.reduce((acc: number, n: number) => acc += n);
    return sum / nums.length;
}

const WatchedSummary = ({
    watchedNum,
    avgRating,
    avgIMDBRating,
    avgRuntime,
}: WatchedSummaryProps) => {
    const { setActive } = useActive();
    return (
        <div className='cp-watched-header'>
            <div className='cp-watched-header-title'>
                <h3>MOVIES WATCHED </h3>
                <Button className='cp-button-back' text={'-'} onClick={(e) => { e?.stopPropagation(); setActive('list') }} />
            </div>
            <div className='cp-watched-summary'>
                <p><span>#️⃣ </span>{watchedNum} movies</p>
                <p><span>⭐️  </span>{avgRating}</p>
                <p><span>🌟  </span>{avgIMDBRating}</p>
                <p><span>⏱ </span>{avgRuntime} mins</p>
            </div>
        </div>
    )
}

const WatchedMovie = ({
    watchedMovie,
    handleRemoveWatched
}: WatchedMoviePros) => {
    const { setSelectedId } = useMovies();
    const { setActive } = useActive();

    return (
        <div className='cp-watched-item' key={watchedMovie.imdbID} onClick={() => { setSelectedId(watchedMovie.imdbID); setActive('detail') }}>
            <img src={watchedMovie.poster} alt={watchedMovie.poster} className='cp-watched-img' />
            <div className='cp-watched-text'>
                <h4>{watchedMovie.title}</h4>
                <div className='cp-watched-ratings-runtime '>
                    <p className='cp-movie-title'><span>⭐️ </span>{watchedMovie.rating}</p>
                    <p className='cp-movie-title'><span>🌟 </span>{watchedMovie.imdbRating}</p>
                    <p><span>⏱️ </span>{watchedMovie.runtime}</p>
                </div>
            </div>
            <Button className='cp-watched-delete' text={'X'} onClick={(e) => { e?.stopPropagation(); handleRemoveWatched(watchedMovie) }} />
        </div >
    )
}

const WatchedList = ({
    watched,
    setWatched
}: WatchedListProps) => {
    const handleRemoveWatched = (movie: IWatched) => {
        setWatched([...watched.filter(w => w.imdbID !== movie.imdbID)])
    }

    return (
        <div className='cp-watched-container'>
            {watched.length === 0 && <Message message={`No watched movie yet, please rate a movie.`} className='cp-no-watched-message' />}
            {watched.map((ele) =>
                <WatchedMovie key={ele.imdbID} watchedMovie={ele} handleRemoveWatched={handleRemoveWatched} />
            )}
        </div>
    )
}

const Watched: React.FC<WatchedListProps> = ({
    watched,
    setWatched,
}) => {
    const avgRating = average(watched.map((el) => Number(el.rating))).toFixed(1);
    const avgIMDBRating = average(watched.map((el) => Number(el.imdbRating))).toFixed(1);
    const avgRuntime = average(watched.map((el) => Number(el.runtime))).toFixed(0);
    const watchedNum = watched.length;
    return (
        <>
            <WatchedSummary
                watchedNum={watchedNum}
                avgRating={avgRating}
                avgIMDBRating={avgIMDBRating}
                avgRuntime={avgRuntime}
            />
            <WatchedList
                watched={watched}
                setWatched={setWatched}
            />
        </ >
    )
}

export default Watched


