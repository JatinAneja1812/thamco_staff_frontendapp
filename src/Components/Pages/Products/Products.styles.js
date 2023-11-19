import styled from "styled-components";

const ProductsContainerWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  margin-bottom: 9px;
`;

const ProductsPageTitle = styled.h1`
  padding-bottom: 0;
  font-size: 2xl;
  font-weight: bold;
  color: #4a5568;
  text-transform: capitalize;
`;

const TitleAndButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchAndFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const ProductsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;


export {
  ProductsContainerWrapper,
  ProductsPageTitle,
  SearchAndFilterContainer,
  SearchInput,
  ProductsContainer,
  TitleAndButtonContainer
};
