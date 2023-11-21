import { Card, CardContent, CardMedia } from '@mui/material';
import styled from 'styled-components';


const ProductCardWrapper = styled.div`

  .addToCartButton
  {
    text-transform: capitalize;
    margin: auto;
  }

  .addToCartButton:hover {
    background-color: #2e7d32;
    color: white;
    transition: all 235ms ease-in-out;
  }

`;

const ProductsCard = styled(Card)`
  max-width: ${({ isSmallScreen }) => (isSmallScreen ? '275px' : '295px')};
  margin: 0 auto;
  postion: relative;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
  background-color: white;
`;

const ProductCardMedia = styled(CardMedia)`
  height: ${({ isSmallScreen }) => (isSmallScreen ? '140px' : '200px')};
`;

const ProductCardContent = styled(CardContent)`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const ProductText = styled.span`
  display: block;
  font-size: 0.875rem;
  color: #333;
`;

const ProductRatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


export { ProductCardContent, ProductCardMedia, ProductCardWrapper, ProductRatingContainer, ProductText, ProductTitle, ProductsCard };
