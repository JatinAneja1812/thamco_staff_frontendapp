import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "../../../Components/Pages/Home/HomePage";
import LandingPage from "../../../Components/Pages/Home/LandingPage";
import EmailVerificationPage from "../../../Hooks/Authentication/EmailVerificationPage";


export default function HomePageContainer() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = () => {
      // Check if the user is authenticated
      if (isAuthenticated && !isLoading) {
        // If the email is verified, navigate to the home page
        if (user && user.email_verified) {
          navigate("/home");
        } else {
          // If the email is not verified, navigate to the email verification page
          navigate("/email-verification");
        }
      }
    };

    handleRedirect();
  }, [isAuthenticated, user, isLoading, navigate]);

  return isAuthenticated ? (
    user && user.email_verified ? <HomePage /> : <EmailVerificationPage />
  ) : (
    <LandingPage />
  );
}