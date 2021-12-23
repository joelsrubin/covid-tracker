import { useEffect, useState } from 'react';
import Graphs from './Graphs';
import Landing from './Landing';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

const INITIAL = 806336;

function App() {
  const [latest, setLatest] = useState<Latest>({
    count: 0,
    average: 0,
  });
  const [page, setPage] = useState('landing');
  const [loggedIn, setLoggedIn] = useState(false);
  const { count, average } = latest;
  const total = Number(count) - INITIAL;
  const projectedTotal = Number(average) * 90;

  // Load latest data to display on the landing page
  const loadData = async () => {
    const res = await fetch('/.netlify/functions/data');
    const { count, average } = await res.json();

    setLatest({ count, average });
  };

  // Render latest data
  const renderInfo = () => {
    switch (count) {
      case 0:
        return <span>{count}</span>;
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
        return <Graphs />;
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

  useEffect(() => {
    if (loggedIn) {
      setPage('landing');
    }
  }, [loggedIn]);
  const { logout } = useAuth0();
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
        <button
          className='tab'
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
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
