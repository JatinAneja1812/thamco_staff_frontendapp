import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Fade } from "@mui/material";
import Hero from "./Hero/Hero";

function HomePage() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Fade in={true}>
        <main className='min-h-screen space-y-5 mb-9'>
          <Hero />
          <h1> Authenicated page </h1>
        </main>
      </Fade>
    )
  );
}

export default HomePage;
