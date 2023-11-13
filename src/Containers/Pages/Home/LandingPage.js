import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /home if the user is authenticated
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    !isAuthenticated && (
      <div>
        <h1>Welcome to the public Home Page</h1>
        <button onClick={() => loginWithRedirect({ redirect_uri: 'http://localhost:3000' })}>Sign In</button>
      </div>
    )
  );
};