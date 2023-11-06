import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function HomePage() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div>
      <h1>Welcome to the authenticated Home Page</h1>
      {isAuthenticated ? (
        <div>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : null}
    </div>
  );
}

export default HomePage;