import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [latest, setLatest] = useState(0);
  const INITIAL = 804916;

  const loadData = async () => {
    const res = await fetch('/.netlify/functions/data');
    const info = await res.json();
    setLatest(Number(info[2]));
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderInfo = () => {
    switch (latest) {
      case 0:
        return <span>Loading...</span>;
      default:
        return <span style={{ color: 'red' }}>{latest - INITIAL}</span>;
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Official NYT Covid Tracker</h1>
        <h2>Deaths since December 21, 2021: {renderInfo()} </h2>
      </header>
    </div>
  );
}

export default App;
