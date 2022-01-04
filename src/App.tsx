import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Graphs from './Graphs';
import Landing from './Landing';
import './App.css';
import Loading from './Loading';
import { fetchGraphs, fetchLanding } from './Utils';

function App() {
  const [page, setPage] = useState('landing');
  const { isLoading } = useQuery('landing', fetchLanding);
  useQuery('graphs', fetchGraphs);

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
