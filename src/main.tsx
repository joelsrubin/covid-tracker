import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginButton from './Login';

ReactDOM.render(
  <Auth0Provider
    domain={
      //  @ts-ignore
      import.meta.env.PROD ? process.env.DOMAIN : import.meta.env.VITE_DOMAIN
    }
    clientId={
      //  @ts-ignore
      import.meta.env.PROD
        ? //  @ts-ignore
          process.env.CLIENT_ID
        : //  @ts-ignore
          import.meta.env.VITE_CLIENT_ID
    }
    redirectUri={`${window.location.origin}/home`}
  >
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<App />} />
        <Route path='/' element={<LoginButton />} />
      </Routes>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);
