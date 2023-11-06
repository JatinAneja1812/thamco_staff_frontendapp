import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function PrivateRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Route {...rest} element={element} />;
  } else {
    // Redirect to the root URL if the user is not authenticated
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;