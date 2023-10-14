import React from 'react'
import './Watched.css'
import Button from '../../button/Button';
import { IWatched } from '../../../model/IMovie';
import Message from '../error/ErrorMessage';

function average(nums: number[]) {
    let sum = 0;
    nums.map((n: number) => {
        sum += n;
    });

    return sum / nums.length;
}

interface WatchedProps {
    watched: IWatched[];
    setWatched: React.Dispatch<React.SetStateAction<IWatched[]>>;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Watched: React.FC<WatchedProps> = ({ watched, setWatched, setSelectedId }) => {
    const avgRating = average(watched.map((el) => Number(el.rating))).toFixed(1);
    const avgIMDBRating = average(watched.map((el) => Number(el.rating))).toFixed(1);
    const avgRuntime = average(watched.map((el) => Number(el.runtime))).toFixed(0);
    const watchedNum = watched.length;

    const handleRemoveWatched = (movie: IWatched) => {
        setWatched([...watched.filter(w => w.imdbID !== movie.imdbID)])
    }

    return (
        <>
            <div className='cp-watched-header'>
                <h3>MOVIES WATCHED</h3>
                <div className='cp-watched-summary'>
                    <p><span>#️⃣ </span>{watchedNum} movies</p>
                    <p><span>⭐️  </span>{avgRating}</p>
                    <p><span>🌟  </span>{avgIMDBRating}</p>
                    <p><span>⏱ </span>{avgRuntime} movies</p>
                </div>
            </div>
            <div className='cp-watched-container'>
                {watched.length === 0 && <Message message={`No watched movie yet, please rate a movie.`} className='cp-no-watched-message' />}
                {watched.map((ele) =>
                    <div className='cp-watched-item' key={ele.imdbID} onClick={() => setSelectedId(ele.imdbID)}>
                        <img src={ele.poster} alt={ele.poster} className='cp-watched-img' />
                        <div className='cp-watched-text'>
                            <h4>{ele.title}</h4>
                            <div className='cp-watched-ratings-runtime '>
                                <p className='cp-movie-title'><span>⭐️ </span>{ele.rating}</p>
                                <p className='cp-movie-title'><span>🌟 </span>{ele.imdbRating}</p>
                                <p><span>⏱️ </span>{ele.runtime}</p>
                            </div>
                        </div>
                        <Button className='cp-watched-delete' text={'X'} onClick={(e) => { e?.stopPropagation(); handleRemoveWatched(ele) }} />
                    </div>)}
            </div>
        </>
    )
}

export default Watched


