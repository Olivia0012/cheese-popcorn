import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Logo from './components/navbar/Logo';
import ResultNum from './components/navbar/ResultNum';
import MovieList from './components/container/list/MovieList';
import Search from './components/navbar/Search';
import Footer from './components/footer/Footer';
import Container from './components/container/Container';
import MovieDetail from './components/container/detail/MovieDetail';
import { IMovie, IWatched } from './model/IMovie';
import Watched from './components/container/watched/Watched';

function App() {
  const [query, setQuery] = useState('Spider man');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movieError, setMovieError] = useState('');
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [resultNum, setResultNum] = useState(0);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [watched, setWatched] = useState<IWatched[]>(() => {
    const localWatched = localStorage.getItem('watched');
    return localWatched ? JSON.parse(localWatched) : [];
  });

  const fetchMovies = async () => {
    try {
      setMovies([]);
      setError('');
      setIsLoading(true);

      if (query.length < 4) {
        return;
      }

      const res = await fetch(`https://www.omdbapi.com/?apikey=7ad09941&s=${query}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error('Error occurs when fetching movies.')
      }

      if (data.Response === 'False') {
        setError(data.Error);
        return;
      }

      setMovies(data.Search);
      setError('');
      setResultNum(data.totalResults);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchMovie = async (movieId: string) => {
    try {
      setSelectedId(null);
      setMovieError('');
      setIsMovieLoading(true);

      const res = await fetch(`https://www.omdbapi.com/?apikey=7ad09941&i=${movieId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error('Error occurs when fetching movie.')
      }

      if (data.Response === 'False') {
        setMovieError(data.Error);
        return;
      }
      setMovie(data);
    } catch (err: any) {
      setMovieError(err.message);
    } finally {
      setIsMovieLoading(false);
    }
  }

  const handleClick = (): void => {
    fetchMovies();
  }

  const handleClickMovie = (movie: IMovie): void => {
    setSelectedId(movie.imdbID)
  }

  const handleCloseMovieDetail = () => {
    setMovie(null);
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  useEffect(() => {
    handleCloseMovieDetail();
  }, [query])

  useEffect(() => {
    if (!selectedId) return;
    fetchMovie(selectedId);
  }, [selectedId])

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])

  return (
    <div className="App">
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} text={'Search'} onClick={handleClick} />
        <ResultNum className='cp-result-num' num={resultNum} />
      </Navbar>

      <div className='cp-movie-main-container'>
        <Container type={'list'} height={movies.length} error={error} isLoading={isLoading} >
          <MovieList movies={movies} key={query} onClick={handleClickMovie} />
        </Container>
        <Container type={'detail'} error={movieError} isLoading={isMovieLoading}>
          {!movie && <Watched watched={watched} setWatched={setWatched} setSelectedId={setSelectedId} />}
          {movie && <MovieDetail movie={movie} onClose={handleCloseMovieDetail} watched={watched} setWatched={setWatched} />}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default App;
