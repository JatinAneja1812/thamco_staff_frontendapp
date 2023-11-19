import React, {useEffect} from 'react';
import { Container, Fade } from "@mui/material";
import {
  ProductsContainerWrapper,
  ProductsPageTitle,
  ProductsContainer,
} from "./Products.styles";
import ProductCard, { ProductCardSkeleton } from '../../Cards/ProductsCards/ProductsCard';

export default function CategoricalProducts(props) {
  
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  return (
    <ProductsContainerWrapper>
      <Fade in={true}>
        <Container>
          {/* Title */}
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
