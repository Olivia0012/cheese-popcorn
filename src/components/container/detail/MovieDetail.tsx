import { IMovie } from '../../../model/IMovie'
import StarRating from '../../rating/StarRating'
import { BiArrowBack } from 'react-icons/bi'
import './MovieDetail.css'

const MovieDetail = ({ movie, onClose }: { movie: IMovie, onClose: () => void }) => {
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
                <StarRating maxRating={10} className='cp-movie-detail-rating' initialRating={Number(movie.imdbRating)} />
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

export default MovieDetail
