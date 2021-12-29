import { useEffect, useState } from 'react';
import Graphs from './Graphs';
import Landing from './Landing';
import './App.css';
import Message from './Message';

const INITIAL = 806336;

function App() {
  const [latest, setLatest] = useState<Latest>({
    count: 0,
    average: 0,
  });
  const [page, setPage] = useState('landing');
  const [sent, setSent] = useState(false);
  const { count, average } = latest;
  const total = Number(count) - INITIAL;
  const projectedTotal = Number(average) * 90;

  // Load latest data to display on the landing page
  const loadData = async () => {
    const res = await fetch('/.netlify/functions/data');
    const { count, average } = await res.json();

    setLatest({ count, average });
  };

  // handle state change for submission
  const sentHandler = () => {
    setSent(!sent);
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
            {total.toLocaleString('en-US')}
          </span>
        );
    }
  };

  // Render Landing or Graphs page depending on page state
  const renderPage = () => {
    switch (page) {
      case 'Graphs':
        return <Graphs />;
      case 'Cash Out':
        return <Message sentHandler={sentHandler} sent={sent} />;
      case 'Home':
      default:
        return (
          <Landing renderInfo={renderInfo} projectedTotal={projectedTotal} />
        );
    }
  };

  // Handle page changing via tabs
  const pageHandler = ({ target }: any) => {
    let selection: Page = target.innerText;
    setPage(selection);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='App'>
      <div className='tab-container'>
        <button
          className={page === 'Home' ? 'tab-selected' : 'tab'}
          onClick={pageHandler}
        >
          Home
        </button>
        <button
          className={page === 'Graphs' ? 'tab-selected' : 'tab'}
          onClick={pageHandler}
        >
          Graphs
        </button>
        <button
          className={page === 'Cash Out' ? 'tab-selected' : 'tab'}
          onClick={pageHandler}
        >
          Cash Out
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
