import React, {useEffect} from 'react';
import { Button, Container, Fade } from "@mui/material";
import {
  ProductsContainerWrapper,
  ProductsPageTitle,
  ProductsContainer,
} from "./Products.styles";
import ProductCard, { ProductCardSkeleton } from '../../Cards/ProductsCards/ProductsCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CategoricalProducts(props) {
  
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const handleReturn = () => {
    window.history.back();
  }

  return (
    <ProductsContainerWrapper>
      <Fade in={true}>
        <Container>
          {/* Title */}
          <Button startIcon={<ArrowBackIcon />} onClick={() => handleReturn()} style={{backgroundColor: "#437046", color: "#fff"}} >Go Back</Button>
          <ProductsPageTitle>{props.categoryName}</ProductsPageTitle>
          {/* All Category Cards */}
          <ProductsContainer>
            {
                !props.isLoading ?
                    props.products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product} />
                    ))
                    : Array.from({ length: 17 }).map((pd, i) => {
                        return <ProductCardSkeleton key={i} />
                    })
            }
          </ProductsContainer>
        </Container>
      </Fade>
    </ProductsContainerWrapper>
  );
}
