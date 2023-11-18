import { ArrowForward } from "@mui/icons-material";
import { Container, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FreeMode, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import dairy from "../../../../Assets/Categories/dairy.png";
import fruits from "../../../../Assets/Categories/fruits.png";
import grains from "../../../../Assets/Categories/grains.png";
import meat from "../../../../Assets/Categories/meat.png";
import petfood from "../../../../Assets/Categories/petfoods.png";
import beverages from "../../../../Assets/Categories/beverages.png";
import snacks from "../../../../Assets/Categories/snacks.png";
import chocolates from "../../../../Assets/Categories/chocolates.png";
import icecreams from "../../../../Assets/Categories/icecreams.png";
import cereal from "../../../../Assets/Categories/cereals.png";
import vegetables from "../../../../Assets/Categories/vagetable.png"; // Fix the typo
import CategoryCard from "../../../Cards/ProductsCards/CategoriesCards";
// import './swiper.css';
import {
  CategoryCardWrapper,
  CategoryContainer,
  HeaderSection,
  HeaderTitle,
  ProductsCategoriesContainerWrapper,
  SeeAllButton,
  StyledButtonWrapper,
} from "./ProductsCategories.style";

const ProductsCategories = () => {
  const isExtraSmallScreen = useMediaQuery("(max-width: 664px)");
  const navigate = useNavigate();

  return (
    <Container>
      <ProductsCategoriesContainerWrapper>
        <HeaderSection>
          <HeaderTitle>Popular Categories</HeaderTitle>
          <StyledButtonWrapper>
            <SeeAllButton
              size={isExtraSmallScreen ? "small" : "medium"}
              color="success"
              variant="outlined"
              onClick={() => navigate("/categories")}
              endIcon={<ArrowForward fontSize="large" />}
            >
              See All
            </SeeAllButton>
          </StyledButtonWrapper>
        </HeaderSection>

        <Categories />
      </ProductsCategoriesContainerWrapper>
    </Container>
  );
};

const Categories = () => {
  const categoryData = [
    { name: "Meat", img: meat },
    { name: "Vegetables", img: vegetables },
    { name: "Fruits", img: fruits },
    { name: "Dairy", img: dairy },
    { name: "Grains", img: grains },
    { name: "Beverages", img: beverages },
    { name: "Pet Supplies", img: petfood },
    { name: "Snacks", img: snacks },
    { name: "Chocolates", img: chocolates },
    { name: "Ice-creams", img: icecreams },
    { name: "Breakfast food", img: cereal },
  ];

  return (
    <CategoryContainer>
     <Swiper
        {...FreeMode}
        {...Navigation}
        {...Pagination}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
        }}
        pagination={{
          clickable: true, // Enable clickable bullets
          bulletClass: 'swiper-pagination-bullet-custom', // Add a custom class for styling
        }}
      >
        {categoryData.map((category, index) => (
          <SwiperSlide key={index}>
            <CategoryCardWrapper>
              <CategoryCard category={category} shadow={true} />
            </CategoryCardWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </CategoryContainer>
  );
};

export default ProductsCategories;
