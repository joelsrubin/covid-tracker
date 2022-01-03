import covid from './covid.png';
import type { FC } from 'react';

type LandingProps = {
  renderInfo: () => React.ReactElement;
  projectedTotal: number;
};

const Landing: FC<LandingProps> = ({ renderInfo, projectedTotal }) => {
  return (
    <header className='App-header'>
      <h1>Official NYT Covid Tracker</h1>
      <h2>Since December 21, 2021: {renderInfo()} </h2>
      <h2>
        Projected Total:{' '}
        {isNaN(projectedTotal)
          ? 0
          : Math.floor(projectedTotal).toLocaleString('en-US')}{' '}
      </h2>
      <img src={covid} className='App-logo' />
    </header>
  );
};

export default Landing;
