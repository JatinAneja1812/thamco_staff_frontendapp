import { Button } from "@mui/material";
import styled from "styled-components";

export const ProductsCategoriesContainerWrapper = styled.div`
  .swiper-pagination-bullet-custom {
    width: 10px;
    height: 10px;
    background-color: #fff; /* Customize bullet color */
    opacity: 0.6;
    margin: 0 4px; /* Adjust spacing between bullets */
  }

  .swiper-pagination-bullet-active {
    background-color: #4caf50; /* Customize active bullet color */
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    color: #000; /* Arrow color */
    font-size: 2rem; /* Arrow size */
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 16px;
  height: 24vh;
`;

export const CategoryCardWrapper = styled.div`
  width: 100%;
  max-width: 19rem;
  margin: 0 auto;
`;

export const StyledButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  height: 50px;
  @media (min-width: 665px) {
    flex-direction: row;
  }
`;

export const HeaderTitle = styled.h1`
  position: relative;
  top: 19px;
  font-size: 28px;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
`;

export const SeeAllButton = styled(Button)`
  text-transform: capitalize;
  position: relative;
  top: 14px;
`;
