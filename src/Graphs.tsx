import { useQuery } from 'react-query';
import LineGraph from './LineGraph';
import Loading from './Loading';

const Graphs = () => {
  const { isLoading, data } = useQuery('graphs', () =>
    fetch('/.netlify/functions/graphData').then((res) => res.json())
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <header className='App-header'>
          <h1>Line Chart</h1>
          <div className='container-chart'>
            <LineGraph data={data} />
          </div>
        </header>
      )}
    </>
  );
};

export default Graphs;
