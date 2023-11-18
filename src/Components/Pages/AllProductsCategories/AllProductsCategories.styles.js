import styled from "styled-components";

const ProductsCategoriesContainerWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  margin-bottom: 9px;
`;

const PageTitle = styled.h1`
  padding-bottom: 0;
  font-size: 2xl;
  font-weight: bold;
  color: #4a5568;
  text-transform: capitalize;
`;

const CategoriesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export { ProductsCategoriesContainerWrapper, PageTitle, CategoriesContainer };
