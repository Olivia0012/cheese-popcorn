import { useReducer } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import ResultNum from './components/navbar/ResultNum';
import Search from './components/navbar/Search';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { StatusType, reducer } from './reducer/Reducer';
import { FetchMoviesProvider } from './context/MoviesContext';

const initialState = {
  status: StatusType.INIT,
  movies: [],
  isLoading: false,
  error: '',
  query: 'Spider man',
  page: '1',
  resultNum: 0
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const resultNum = state.resultNum || 0;


  return (
    <div className="App">
      <FetchMoviesProvider>
        <>
          <Navbar>
            <Search text={'Search'} dispatch={dispatch} />
            <ResultNum className='cp-result-num' num={resultNum} />
          </Navbar>

          <Main
            state={state}
            dispatch={dispatch}
          />
        </>
      </FetchMoviesProvider>
      <Footer />
    </div>
  );
}

export default App;
