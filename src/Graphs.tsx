import { useQuery } from 'react-query';
import LineGraph from './LineGraph';
import Loading from './Loading';
import { fetchGraphs } from './Utils';

const Graphs = () => {
  const { isLoading, data } = useQuery('graphs', fetchGraphs);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <header className='App-header'>
          <h2>Change Over Time</h2>
          <div className='container-chart'>
            <LineGraph data={data || []} />
          </div>
        </header>
      )}
    </>
  );
};

export default Graphs;
