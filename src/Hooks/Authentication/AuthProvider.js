import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);

        const { updated_at, email, picture} = user;

        sessionStorage.setItem('access_token', token);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('picture', picture);
        sessionStorage.setItem('last_seen', updated_at);
        // Schedule token refresh before it expires
        const { expires_in } = JSON.parse(atob(token.split('.')[1]));
        const refreshTimeout = expires_in * 1000 - 10000; // Refresh 10 seconds before expiration
        setTimeout(refreshAccessToken, refreshTimeout);

      } catch (error) {

        console.error('Error fetching access token:', error);
        
      }
    };

    if (isAuthenticated) {
      fetchToken();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleLogin = () => {
    loginWithRedirect({ redirect_uri: window.location.origin });
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    sessionStorage.clear();
    setAccessToken(null);
  };

  const refreshAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      setAccessToken(token);

      const { updated_at, email, picture} = user;
      
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('picture', picture);
      sessionStorage.setItem('last_seen', updated_at);

      sessionStorage.setItem('access_token', token);

      // Schedule the next token refresh
      const { expires_in } = JSON.parse(atob(token.split('.')[1]));
      const refreshTimeout = expires_in * 1000 - 10000; // Refresh 10 seconds before expiration
      setTimeout(refreshAccessToken, refreshTimeout);
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        accessToken,
        login: handleLogin,
        logout: handleLogout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;