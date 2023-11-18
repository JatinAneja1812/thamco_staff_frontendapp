import React, { useEffect } from "react";
import { Container, Fade } from "@mui/material";
import CategoryCard from "../../Cards/ProductsCards/CategoriesCards";
import allCategories from "../../../Utility/Categores/CategoriesList";
import {
  ProductsCategoriesContainerWrapper,
  PageTitle,
  CategoriesContainer,
} from "./AllProductsCategories.styles";

const AllProductsCategories = () => {
  // Scrolling Bug Fixed
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  return (
    <ProductsCategoriesContainerWrapper>
      <Fade in={true}>
        <Container>
          {/* Title */}
          <PageTitle>All Categories</PageTitle>
          {/* All Category Cards */}
          <CategoriesContainer>
            {allCategories.map((category) => (
              <CategoryCard
                key={category.id}
                shadow={true}
                category={category}
              />
            ))}
          </CategoriesContainer>
        </Container>
      </Fade>
    </ProductsCategoriesContainerWrapper>
  );
};

export default AllProductsCategories;
