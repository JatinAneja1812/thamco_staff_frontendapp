import { useAuth0 } from "@auth0/auth0-react";
import { Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import { openErrorNotification } from "../../../Hooks/Notification/GlobalNotification";
import AboutStaff from "./About/AboutThAmCoStaff";
import CustomersReview from "./CustomerReviews/CustomersReview";
import Hero from "./Hero/Hero";
import ProductsCategories from "./ProductsCategories/ProductsCategories";
import ChartsDashboard from "./Charts/ChartsDashboard";
import CustomerComplaints from "./CustomerComplaints/CustomerComplaints";
import SatisfactionPieCharts from "./Charts/ChartsDashboardV2";

function HomePage() {
  const { isAuthenticated } = useAuth0();

  const [userReviews, setUserReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsersReviews = () => {
 
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
        }
      );
      
      setIsLoading(false);
  };

  useEffect(() => {
    getUsersReviews();
  }, []);

  return (
    isAuthenticated && (
      <Fade in={true}>
        <main className='min-h-screen space-y-5 mb-9'>
          <Hero />
          <ProductsCategories />
          <ChartsDashboard />
          <SatisfactionPieCharts />
          <CustomerComplaints />
          <CustomersReview 
            userReviews={userReviews}
            isLoading={isLoading}
          />
          <AboutStaff />
        </main>
      </Fade>
    )
  );
}

export default HomePage;
