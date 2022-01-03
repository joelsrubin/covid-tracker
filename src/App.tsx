import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Graphs from './Graphs';
import Landing from './Landing';
import './App.css';
import Loading from './Loading';

function App() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState('landing');
  const { isLoading } = useQuery('repoData', () =>
    fetch('/.netlify/functions/data').then((res) => res.json())
  );

  // Render Landing or Graphs page depending on page state
  const renderPage: PageRender = () => {
    switch (page) {
      case 'graphs':
        return <Graphs />;
      case 'landing':
      default:
        return <Landing />;
    }
  };

  // Handle page changing via tabs
  const pageHandler: SetPageState = () => {
    if (page === 'landing') {
      setPage('graphs');
    } else {
      setPage('landing');
    }
  };

  // Function to handle prefetching data -> only for Graphs currently
  const handlePrefetch: PrefetchFunc = async (query, endpoint) => {
    await queryClient.prefetchQuery(
      query,
      () => fetch(`/.netlify/functions/${endpoint}`).then((res) => res.json()),
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
          onMouseEnter={() => handlePrefetch('graphs', 'graphData')}
          onTouchStart={() => handlePrefetch('graphs', 'graphData')}
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
