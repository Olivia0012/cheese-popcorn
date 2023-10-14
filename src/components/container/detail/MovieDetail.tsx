import { IMovie, IWatched } from '../../../model/IMovie'
import StarRating from '../../rating/StarRating'
import { BiArrowBack } from 'react-icons/bi'
import './MovieDetail.css'
import Button from '../../button/Button'
import { useState } from 'react'
import Message from '../error/ErrorMessage'

interface MovieDetailProps {
    movie: IMovie;
    watched: IWatched[];
    setWatched: React.Dispatch<React.SetStateAction<IWatched[]>>;
    onClose: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onClose, watched, setWatched }) => {
    const [rating, setRating] = useState(0);
    const hasWatched = watched.find(watchedMovied => movie.imdbID === watchedMovied.imdbID);

    const handleAddWatched = () => {
        const newWatch: IWatched = {
            title: movie.Title,
            rating: rating,
            runtime: Number(movie.Runtime?.split(' ')[0]),
            poster: movie.Poster,
            imdbRating: Number(movie.imdbRating),
            imdbID: movie.imdbID
        };

        setWatched([...watched, newWatch])
    }
    return (
        <div className="cp-movie-detail-container">
            <header>
                <button className='cp-movie-detail-back' onClick={onClose}><BiArrowBack style={{ marginTop: '5px' }} /></button>
                <img src={movie.Poster} alt={movie.Title} className="cp-movie-detial-img" />
                <div className="cp-movie-detail-overview">
                    <h2>{movie.Title}</h2>
                    <p>{movie.Released} &bull; {movie.Runtime}</p>
                    <p>{movie.Genre}</p>
                    <p>
                        <span>⭐️  </span>
                        {movie.imdbRating}   IMDB Rating
                    </p>
                </div>
            </header>
            <div className='cp-movie-rating-box'>
                <StarRating maxRating={10} className='cp-movie-detail-rating' initialRating={hasWatched?.rating} rating={rating} setRating={setRating} />
                {!hasWatched && <Button text={'+ ADD TO WATCHED'} onClick={handleAddWatched} className='cp-movie-detail-add-watched' />}
                {hasWatched && <Message message={'You have watched this movie.'} />}
            </div>
            <section>
                <p><em>{movie.Plot}</em></p>
                <p><strong>Actors: </strong>{movie.Actors}</p>
                <p><strong>Directed by: </strong>{movie.Director}</p>
                <p><strong>Awards: </strong>{movie.Awards}</p>
                <p><strong>Country: </strong>{movie.Country}</p>
                <p><strong>Rated: </strong>{movie.Rated}</p>
                <div>
                    <strong>Ratings: </strong>
                    <ul>
                        {movie.Ratings?.map((m) =>
                            <li key={m.Source}>
                                <p>
                                    <strong>{m.Source}: </strong>
                                    {m.Value}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        </div >
    )
}

export default MovieDetail;

