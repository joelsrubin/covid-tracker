import { useAuth0 } from '@auth0/auth0-react';
import covid from './covid.png';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='App'>
      <div className='tab-container'>
        <button className='tab' disabled>
          Home
        </button>
        <button className='tab' disabled>
          Graphs
        </button>
      </div>
      <header className='App-header-login'>
        <h1>Covid Winter Tracker</h1>
        <img src={covid} className='App-logo' />
        <button
          className='login'
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Log In
        </button>
      </header>
      <p>
        All data sourced from:{' '}
        <a href='https://github.com/nytimes/covid-19-data' target='_blank'>
          https://github.com/nytimes/covid-19-data
        </a>
      </p>
    </div>
  );
};

export default LoginButton;
