import React,{useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Fade } from "@mui/material";
import Hero from "./Hero/Hero";
import CustomersReview from "./CustomerReviews/CustomersReview";
import { openErrorNotification } from "../../../Hooks/Notification/GlobalNotification";
import ProductsCategories from "./ProductsCategories/ProductsCategories";
import banner1  from "../../../Assets/Banners/banner1.png";
import banner2  from "../../../Assets/Banners/banner2.png";
import OffersBannerSlider from "../../Banners/OffersBanner";
import AboutStaff from "./About/AboutThAmCoStaff";

const banners = [
  { image: banner1 },
  { image: banner2 },
];

function HomePage() {
  const { isAuthenticated } = useAuth0();

  const [userReviews, setUserReviews] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

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

  return (
    isAuthenticated && (
      <Fade in={true}>
        <main className='min-h-screen space-y-5 mb-9'>
          <Hero />
          <ProductsCategories />
          <OffersBannerSlider banners={banners}/>
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
