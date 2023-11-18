import React from 'react';
import { Auth0Provider as ReactAuth0Provider } from '@auth0/auth0-react';

const DOMAIN = process.env.REACT_APP_THAMCO_AUTH0_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_THAMCO_AUTH0_CLIENT_ID;

const Auth0Provider = ({ children }) => {
  return (
    <ReactAuth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      redirectUri={window.location.origin}
    >
      {children}
    </ReactAuth0Provider>
  );
};

export default Auth0Provider;