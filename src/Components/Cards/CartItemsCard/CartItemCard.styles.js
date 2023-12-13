import styled from 'styled-components';

const CartItemCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  background-color: #ffffffc4;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  height: 17vh;
  width: 66vh;
`;

const ProductImage = styled.div`
  img {
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
    border-radius: 0.375rem;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem; /* Adjust the margin as needed for spacing between image and details */

  h3 {
    font-weight: 600;
    color: #4a5568;
    font-size: 26px;
    margin-top: -5px;
    margin-bottom: -1.5rem;
  }

  h5 {
    text-align: justify;
    font-size: 13px;
    color: #4a5568;
    margin-bottom: 1rem;
  }
`;


const ProductPriceAndRemove = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ProductPrice = styled.h3`
  font-weight: 600;
  white-space: nowrap;
  font-size: 19px;
  font-weight: 700;
  margin-top: 0vh;
  color: #38a169;
  margin-bottom: 1rem;
`;

const RemoveButtonWrapper = styled.div`
  position: relative;
`;

const QuantityControllerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -22px;
  
  .quantity-btn {
    margin-right: 10px; /* Adjust the right margin for spacing between buttons */
    color: inherit;
    opacity: 0.7;
    font-size: inherit;
  }
`;

export {CartItemCardWrapper, QuantityControllerWrapper, ProductImage, ProductDetails, ProductPriceAndRemove, ProductPrice, RemoveButtonWrapper}

