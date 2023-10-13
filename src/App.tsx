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
import { IMovie } from './model/IMovie';

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

  const fetchMovies = async () => {
    try {
      setMovies([]);
      setError('');
      setIsLoading(true);

      if (query.length < 4) {
        return;
      }

      const res = await fetch(`http://www.omdbapi.com/?apikey=320f6ab2&s=${query}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
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

  useEffect(() => {
    fetchMovies();
  }, [])

  useEffect(() => {
    if (!selectedId) return;
    fetchMovie(selectedId);
  }, [selectedId])

  const fetchMovie = async (movieId: string) => {
    try {
      setSelectedId(null);
      setMovieError('');
      setIsMovieLoading(true);

      const res = await fetch(`http://www.omdbapi.com/?apikey=320f6ab2&i=${movieId}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
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

  return (
    <div className="App">
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} text={'Search'} onClick={handleClick} />
        <ResultNum className='cp-result-num' num={resultNum} />
      </Navbar>

      <div className='cp-movie-main-container'>
        <Container type={'list'} height={movies.length} error={error} isLoading={isLoading} >
          {!error && !isLoading && <MovieList movies={movies} key={query} onClick={handleClickMovie} />}
        </Container>
        <Container type={'detail'} error={movieError} isLoading={isMovieLoading}>
          {!movieError && !isMovieLoading && movie && <MovieDetail movie={movie} onClose={handleCloseMovieDetail} />}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default App;
