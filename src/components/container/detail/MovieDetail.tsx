import { IMovie, IWatched } from '../../../model/IMovie'
import StarRating from '../../rating/StarRating'
import { BiArrowBack } from 'react-icons/bi'
import './MovieDetail.css'
import Button from '../../button/Button'
import Message from '../error/Message'
import { useKey } from '../../../hooks/useKey'
import { useActive } from '../../../context/ActiveContext'
import { useSelectedMovie } from '../../../context/SelectedMovieContext'

interface MovieDetailProps {
    rating: number;
    setRating: React.Dispatch<React.SetStateAction<number>>;
    watched: IWatched[];
    setWatched: React.Dispatch<React.SetStateAction<IWatched[]>>;
    hasWatched: IWatched | undefined;
    movie: IMovie,
}

interface DetailSummaryProps {
    movie: IMovie;
    handleCloseMovieDetail: () => void
}

interface CPRatingProps {
    hasWatched: IWatched | undefined,
    rating: number,
    setRating: React.Dispatch<React.SetStateAction<number>>;
    handleAddWatched: () => void
}

const DetailSummary = ({
    movie,
    handleCloseMovieDetail
}: DetailSummaryProps) => {
    return (
        <header>
            <button className='cp-movie-detail-back' onClick={handleCloseMovieDetail}><BiArrowBack style={{ marginTop: '5px' }} /></button>
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
    )
}

const CPRating = ({
    hasWatched,
    rating,
    setRating,
    handleAddWatched
}: CPRatingProps) => {
    return (
        <div className='cp-movie-rating-box'>
            <StarRating maxRating={10} className='cp-movie-detail-rating' initialRating={hasWatched?.rating} rating={rating} setRating={setRating} />
            {!hasWatched && <Button text={'+ ADD TO WATCHED'} onClick={handleAddWatched} className='cp-movie-detail-add-watched' />}
            {hasWatched && <Message message={'You have watched this movie.'} />}
        </div>
    )
}

const DetailContent = ({ movie }: { movie: IMovie }) => {
    return (
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
    )
}

const MovieDetail: React.FC<MovieDetailProps> = ({
    rating,
    setRating,
    hasWatched,
    watched,
    setWatched,
    movie,
}) => {
    const { setActive } = useActive();
    const { setSelectedId } = useSelectedMovie();

    const handleCloseMovieDetail = () => {
        setSelectedId(undefined);
        setActive('watched')
    }

    useKey('Escape', handleCloseMovieDetail);

    const handleAddWatched = () => {
        if (!movie) return;

        const newWatch: IWatched = {
            title: movie?.Title,
            rating: rating,
            runtime: Number(movie?.Runtime?.split(' ')[0]),
            poster: movie?.Poster,
            imdbRating: Number(movie?.imdbRating),
            imdbID: movie?.imdbID
        };
        setWatched([...watched, newWatch])
    }

    return (
        <div className="cp-movie-detail-container">
            <DetailSummary
                movie={movie}
                handleCloseMovieDetail={handleCloseMovieDetail}
            />

            <CPRating
                hasWatched={hasWatched}
                rating={rating}
                handleAddWatched={handleAddWatched}
                setRating={setRating}
            />

            <DetailContent movie={movie} />
        </div >
    )
}

export default MovieDetail;

