import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "../../../Components/Pages/Home/HomePage";
import LandingPage from "../../../Components/Pages/Home/LandingPage";

export default function HomePageContainer() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /home if the user is authenticated
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <HomePage /> : <LandingPage />;
}
