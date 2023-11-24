import { Container, Fade, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import ProductCard, { ProductCardSkeleton } from '../../Cards/ProductsCards/ProductsCard';
import {
    ProductsContainer,
    ProductsContainerWrapper,
    ProductsPageTitle,
    SearchAndFilterContainer,
    SearchInput,
    TitleAndButtonContainer
} from './Products.styles';
import { useNavigate } from "react-router";

export default function AllProducts(props) {

    const navigate = useNavigate();

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      window.scroll({ top: 0 });
      setFilteredProducts(props.products);
    }, [props.products]);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredAndSearchedProducts = filteredProducts.filter(product =>
      product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <ProductsContainerWrapper>
        <Fade in={true}>
          <Container>
            {/*Title */}
            <TitleAndButtonContainer>
                <ProductsPageTitle>All Products</ProductsPageTitle>
                <Button variant="contained" color="success" style={{opacity : 0.8}} onClick={() => navigate("/categories")} >
                    All Categoires
                </Button>
            </TitleAndButtonContainer>
  
            {/* Search and Filter Container */}
            <SearchAndFilterContainer>
              <SearchInput
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </SearchAndFilterContainer>
  
            {/* All Category Cards */}
            <ProductsContainer>
              {!props.isLoading ?
                filteredAndSearchedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product} />
                ))
                : Array.from({ length: 17 }).map((pd, i) => {
                  return <ProductCardSkeleton key={i} />
                })}
            </ProductsContainer>
          </Container>
        </Fade>
      </ProductsContainerWrapper>
    );
  }
