import './App.css';
import Navbar from './components/navbar/Navbar';
import ResultNum from './components/navbar/ResultNum';
import Search from './components/navbar/Search';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { useMovies } from './context/MoviesContext';

function App() {
  const { resultNum } = useMovies();

  return (
    <div className="App">
      <Navbar>
        <Search text={'Search'} />
        <ResultNum className='cp-result-num' num={resultNum} />
      </Navbar>

      <Main />
      <Footer />
    </div>
  );
}

export default App;
