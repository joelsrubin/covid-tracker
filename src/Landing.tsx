import covid from './covid.png';
import { useQuery } from 'react-query';

const Landing: React.FC = () => {
  const { data } = useQuery('landing', () =>
    fetch('/.netlify/functions/data').then((res) => res.json())
  );
  const { total, projectedTotal } = data;
  return (
    <header className='App-header'>
      <h1>Official NYT Covid Tracker</h1>
      <h2>
        Since December 21, 2021:{' '}
        <span style={total >= 50000 ? { color: 'red' } : { color: 'oldlace' }}>
          {total.toLocaleString('en-US')}
        </span>
      </h2>
      <h2>
        Projected Total:{' '}
        {Math.floor(projectedTotal).toLocaleString('en-US') || 0}{' '}
      </h2>
      <img src={covid} className='App-logo' />
    </header>
  );
};

export default Landing;
