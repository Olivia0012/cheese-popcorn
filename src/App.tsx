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
import { ActiveType, IMovie, IWatched } from './model/IMovie';
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
  const [page, setPage] = useState('1');
  const [watched, setWatched] = useState<IWatched[]>(() => {
    const localWatched = localStorage.getItem('watched');
    return localWatched ? JSON.parse(localWatched) : [];
  });

  const [active, setActive] = useState<ActiveType>('list');


  const fetchMovies = async () => {
    try {
      setMovies([]);
      setError('');
      setIsLoading(true);

      if (query.length < 4) {
        return;
      }

      const res = await fetch(`https://www.omdbapi.com/?apikey=7ad09941&s=${query}&page=${page}`);
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
    setActive('list')
  }

  const handleClickMovie = (movie: IMovie): void => {
    setSelectedId(movie.imdbID)
  }

  const handleCloseMovieDetail = () => {
    setMovie(null);
    setActive('watched')
  }

  useEffect(() => {
    fetchMovies();
    setActive('list')
  }, [])

  useEffect(() => {
    setMovie(null);
  }, [query])

  useEffect(() => {
    if (!selectedId) return;
    fetchMovie(selectedId);
    setActive('detail')
  }, [selectedId])

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])

  const useWindowWide = () => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth)
      }

      window.addEventListener("resize", handleResize)

      handleResize()

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [setWidth])

    return width
  }

  return (
    <div className="App">
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} text={'Search'} onClick={handleClick} />
        <ResultNum className='cp-result-num' num={resultNum} />
      </Navbar>

      <div className='cp-movie-main-container'>
        <Container type={'list'} height={movies.length} error={error} isLoading={isLoading} >
          {(useWindowWide() > 800 || active === 'list') && < MovieList movies={movies} key={query} onClick={handleClickMovie} setActive={setActive} setPage={setPage} page={page} resultNum={resultNum} />}
        </Container>
        <Container type={'detail'} error={movieError} isLoading={isMovieLoading}>
          {!movie && active === 'watched' && <Watched watched={watched} setWatched={setWatched} setSelectedId={setSelectedId} setActive={setActive} />}
          {movie && <MovieDetail movie={movie} onClose={handleCloseMovieDetail} watched={watched} setWatched={setWatched} />}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default App;
