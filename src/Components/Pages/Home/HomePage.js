import { useAuth0 } from "@auth0/auth0-react";
import { Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
// import banner1 from "../../../Assets/Banners/banner1.png";
// import banner2 from "../../../Assets/Banners/banner2.png";
// import banner3 from "../../../Assets/Banners/banner3.png";
// import banner4 from "../../../Assets/Banners/banner4.png";
import { openErrorNotification } from "../../../Hooks/Notification/GlobalNotification";
// import OffersBannerSlider from "../../Banners/OffersBanner";
import AboutStaff from "./About/AboutThAmCoStaff";
import CustomersReview from "./CustomerReviews/CustomersReview";
import Hero from "./Hero/Hero";
import ProductsCategories from "./ProductsCategories/ProductsCategories";
import ChartsDashboard from "./Charts/ChartsDashboard";
import CustomerComplaints from "./CustomerComplaints/CustomerComplaints";
import SatisfactionPieCharts from "./Charts/ChartsDashboardV2";

// const banners = [
//   { image: banner1 },
//   { image: banner2 },
//   { image: banner3 },
//   { image: banner4 },
// ];

function HomePage() {
  const { isAuthenticated } = useAuth0();

  const [userReviews, setUserReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        }
      );
      
      setIsLoading(false);
  };

  const getOrder = () => {
    console.log("Landing page");
    const accessToken = sessionStorage.getItem("access_token");
    console.log("Access Token:", accessToken);

    setIsLoading(true);

    fetch("https://localhost:7262/api/Order/GetAllOrders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
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
    getOrder();
    // getUsersReviews();
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
