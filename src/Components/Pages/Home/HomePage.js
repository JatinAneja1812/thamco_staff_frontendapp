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
  const REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL = process.env.REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL;   // Production Base API

  const getUsersReviews = () => {
 
    setIsLoading(true);
    
    // BFF (Local): https://localhost:7259/api/UserReviews/GetAllReviews

    fetch(`${REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL}/api/UserReviews/GetAllReviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

  const getStaffUser = () => {

    //UserProfiles API: "https://localhost:7276/api/UserProfiles/GetStaffDetails"
    // BFF (Local): https://localhost:7259/api/Users/GetStaffUser

    fetch(`${REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL}/api/Users/GetStaffUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        Email: sessionStorage.getItem("email"),
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
          let staff = JSON.parse(result);
          sessionStorage.setItem("staffName", `${staff.firstName} ${staff.lastName}`);
          sessionStorage.setItem("staffUserName", `${staff.username}`);
        },
        (error) => {
          console.error("Error fetching data:", error.message);
        }
      )
  };
  
  useEffect(() => {
    getUsersReviews();
    getStaffUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isAuthenticated && (
      <Fade in={true}>
        <main className='min-h-screen space-y-5 mb-9'>
          <Hero />
          
          <ChartsDashboard />
          <SatisfactionPieCharts />
          <CustomerComplaints />
          <ProductsCategories />
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
