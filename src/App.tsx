import { useReducer, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import ResultNum from './components/navbar/ResultNum';
import Search from './components/navbar/Search';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { ActionType, StatusType, reducer } from './reducer/Reducer';
import { ActiveType } from './model/IMovie';

const initialState = {
  status: StatusType.INIT,
  movies: [],
  isLoading: false,
  error: '',
  query: 'Spider man',
  page: '1',
  active: 'list' as ActiveType,
  resultNum: 0
}

function App() {
  const [query, setQuery] = useState('Spider man');
  const [page, setPage] = useState('1');
  const [state, dispatch] = useReducer(reducer, initialState);
  const resultNum = state.resultNum || 0;

  const handleClickSearch = (): void => {
    dispatch({ type: ActionType.SEARCH_MOVIES, query: query, page: page, active: 'list' })
  }

  return (
    <div className="App">
      <Navbar>
        <Search query={query} setQuery={setQuery} text={'Search'} onClick={handleClickSearch} />
        <ResultNum className='cp-result-num' num={resultNum} />
      </Navbar>

      <Main
        state={state}
        dispatch={dispatch}
        setPage={setPage}
      />

      <Footer />
    </div>
  );
}

export default App;
