import { ArrowForward } from "@mui/icons-material";
import { Container, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FreeMode, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import dairy from "../../../../Assets/Categories/dairy.png";
import fruits from "../../../../Assets/Categories/fruits.png";
import grains from "../../../../Assets/Categories/grains.png";
import meat from "../../../../Assets/Categories/meat.png";
import vegetables from "../../../../Assets/Categories/vagetable.png"; // Fix the typo
import CategoryCard from "../../../Cards/ProductsCards/CategoriesCards";
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
    { name: "Meat", img: meat, bgColor: "#FF5733" },
    { name: "Vegetables", img: vegetables, bgColor: "#7CBB52" },
    { name: "Fruits", img: fruits, bgColor: "#FFD700" },
    { name: "Dairy", img: dairy, bgColor: "#FF91A4" },
    { name: "Grains", img: grains, bgColor: "#965B51" },
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
