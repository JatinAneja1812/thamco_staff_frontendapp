import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "../../../Components/Pages/Home/LandingPage";
import HomePage from "../../../Components/Pages/Home/HomePage";
import { openErrorNotification } from "../../../Hooks/Notification/GlobalNotification";

export default function HomePageContainer() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    // Redirect to /home if the user is authenticated
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);


  const getUsersReviews = () => {
    console.log("Landing page");

    setIsLoading(true);

    fetch("https://localhost:7262/api/Customers/GetAllReviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: user.authToken,
        // Username: user.username,
      },
    })
      .then(async (httpResponse) => {
        if (httpResponse.status === 500) {
          var errorMessage = await httpResponse.text();
          throw new Error(errorMessage);
        }

        if (!httpResponse.ok) {
          throw new Error("Failed to get data.");
        }

        return httpResponse.text();
      })
      .then(
        (result) => {
          setUserReviews(JSON.parse(result));
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setIsLoading(false);
        }
      );
  };

  useEffect(() => {
    getUsersReviews();
  }, []);

  return isAuthenticated ? (
    <HomePage userReviews={userReviews} isLoading={isLoading}/>
  ) : (
    <LandingPage userReviews={userReviews} isLoading={isLoading} />
  );
}
