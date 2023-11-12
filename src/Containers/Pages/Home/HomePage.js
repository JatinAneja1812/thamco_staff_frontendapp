import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function HomePage() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <h1>Welcome to the authenticated Home Page</h1>
        <button onClick={() => logout()}>Sign Out</button>
      </div>
    )
  );
}

export default HomePage;
