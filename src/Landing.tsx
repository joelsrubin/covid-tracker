import covid from './covid.png';
import type { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Landing: FC<LandingProps> = ({ renderInfo, projectedTotal }) => {
  const { user, isAuthenticated } = useAuth0<any>();
  console.log(useAuth0());

  const displayName =
    isAuthenticated && !user.name.includes('@')
      ? `${user.name}'s`
      : 'NYT Official';
  return (
    <header className='App-header'>
      <h1>{displayName} Covid Tracker</h1>
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
