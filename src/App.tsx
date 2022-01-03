import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Graphs from './Graphs';
import Landing from './Landing';
import './App.css';
import Loading from './Loading';

function App() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState('landing');
  const { isLoading, data } = useQuery('repoData', () =>
    fetch('/.netlify/functions/data').then((res) => res.json())
  );
  // Render latest data
  const renderInfo = () => {
    const { count, total } = data;
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
    const { projectedTotal } = data;
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

  const handleGraphsPrefetch = async () => {
    await queryClient.prefetchQuery(
      'graph',
      () => fetch('/.netlify/functions/graphData').then((res) => res.json()),
      {
        staleTime: 10 * 1000, // only prefetch if older than 10 seconds
      }
    );
  };

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
          onMouseEnter={handleGraphsPrefetch}
          onTouchStart={handleGraphsPrefetch}
        >
          Graphs
        </button>
      </div>
      {isLoading ? <Loading /> : renderPage()}
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
