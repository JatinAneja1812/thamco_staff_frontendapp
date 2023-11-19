import { ArrowForward } from "@mui/icons-material";
import { Container, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FreeMode, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "../../../Cards/ProductsCategoryCards/CategoriesCards";
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
import allCategories from "../../../../Utility/Categores/CategoriesList";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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

  const randomCategories = shuffleArray([...allCategories]).slice(0, 4);

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
          bulletClass: "swiper-pagination-bullet-custom", // Add a custom class for styling
        }}
      >
        {randomCategories.map((category, index) => (
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
