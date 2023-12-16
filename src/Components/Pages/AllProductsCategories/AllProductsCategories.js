import React, { useEffect } from "react";
import { Button, Container, Fade } from "@mui/material";
import CategoryCard from "../../Cards/ProductsCategoryCards/CategoriesCards";
import allCategories from "../../../Utility/Categores/CategoriesList";
import {
  ProductsCategoriesContainerWrapper,
  PageTitle,
  CategoriesContainer,
} from "./AllProductsCategories.styles";
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from "../../../Hooks/Authentication/AuthProvider";
import HomeIcon from '@mui/icons-material/Home';

const AllProductsCategories = () => {

  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const handleReturn = () => {
    if(!isAuthenticated){
      navigate("/");
    }
    else{
      navigate("/home");
    }
  }

  return (
    <ProductsCategoriesContainerWrapper>
      <Fade in={true}>
        <Container>
          <Button startIcon={<ArrowBackIcon />} onClick={() => handleReturn()} style={{backgroundColor: "#437046", color: "#fff"}} endIcon={<HomeIcon/>} ></Button>
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
