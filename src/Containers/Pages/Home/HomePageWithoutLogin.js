import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import { Link } from 'react-router-dom';

function HomePageWithoutLogin() {
    const { loginWithRedirect } = useAuth0();
  
    return (
      <div>
        <h1>Welcome to the public Home Page</h1>
        <button onClick={() => loginWithRedirect()}>Login</button>
      </div>
    );
  }
  
  export default HomePageWithoutLogin;
