import { useAuth0 } from "@auth0/auth0-react";
import { Fade } from "@mui/material";
import React from "react";
import CustomersReview from "./CustomerReviews/CustomersReview";
import Hero from "./Hero/Hero";

export default function LandingPage(props) {
  const { isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Fade in={true}>
        <main className="min-h-screen space-y-5 mb-9">
          <Hero />
          <CustomersReview
            userReviews={props.userReviews}
            isLoading={props.isLoading}
          />
          <h1> Public page </h1>
        </main>
      </Fade>
    )
  );
}
