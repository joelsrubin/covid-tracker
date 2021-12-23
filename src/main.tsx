import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginButton from './Login';

ReactDOM.render(
  <Auth0Provider
    domain=''
    clientId=''
    redirectUri={`${window.location.origin}/loggedIn`}
  >
    <BrowserRouter>
      <Routes>
        <Route path='/loggedIn' element={<App />} />
        <Route path='/' element={<LoginButton />} />
      </Routes>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);
