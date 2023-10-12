import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Logo from './components/navbar/Logo';
import ResultNum from './components/navbar/ResultNum';
import Input from './components/input/Input';

function App() {
  const [query, setQuery] = useState('');
  const [resultNum] = useState(0);

  return (
    <div className="App">
      <Navbar>
        <Logo />
        <Input query={query} setQuery={setQuery} className='cp-search' />
        <ResultNum className='cp-result-num' num={resultNum} />
      </Navbar>
      Hello from App
    </div>
  );
}

export default App;
