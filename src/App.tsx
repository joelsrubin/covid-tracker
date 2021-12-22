import { useEffect, useState } from 'react';
import Graphs from './Graphs';
import Landing from './Landing';
import './App.css';
import { getNumberOfDays } from './utils';

const INITIAL = 806336;
const DATE = '2021-12-21';

type Latest = {
  date: string;
  latest: number;
};

function App() {
  const [latest, setLatest] = useState<Latest>({ date: '', latest: 0 });
  const [page, setPage] = useState('landing');
  const total = Number(latest.latest) - INITIAL;
  const numberOfDays = getNumberOfDays(DATE, latest.date);
  const projectedTotal = (total / numberOfDays) * 90;

  // Load latest data to display on the landing page
  const loadData = async () => {
    const res = await fetch('/.netlify/functions/data');
    const { date, latest } = await res.json();
    setLatest({ date, latest });
  };

  // Render latest data
  const renderInfo = () => {
    switch (latest.latest) {
      case 0:
        return <span>{latest.latest}</span>;
      default:
        return (
          <span
            style={total >= 50000 ? { color: 'red' } : { color: 'oldlace' }}
          >
            {total}
          </span>
        );
    }
  };

  // Render Landing or Graphs page depending on page state
  const renderPage = () => {
    switch (page) {
      case 'graphs':
        return <Graphs INITIAL={INITIAL} />;
      case 'landing':
      default:
        return (
          <Landing renderInfo={renderInfo} projectedTotal={projectedTotal} />
        );
    }
  };

  // Handle page changing via tabs
  const pageHandler = () => {
    if (page === 'landing') {
      setPage('graphs');
    } else {
      setPage('landing');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='App'>
      <div className='tab-container'>
        <button
          className={page === 'landing' ? 'tab-selected' : 'tab'}
          onClick={pageHandler}
        >
          Home
        </button>
        <button
          className={page === 'graphs' ? 'tab-selected' : 'tab'}
          onClick={pageHandler}
        >
          Graphs
        </button>
      </div>
      {renderPage()}
      <p>
        All data sourced from:{' '}
        <a href='https://github.com/nytimes/covid-19-data' target='_blank'>
          https://github.com/nytimes/covid-19-data
        </a>
      </p>
    </div>
  );
}

export default App;
