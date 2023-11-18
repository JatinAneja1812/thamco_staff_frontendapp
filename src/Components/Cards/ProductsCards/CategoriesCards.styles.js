import styled from "styled-components";
import { CardActionArea } from "@mui/material";
export const StyledCategoryCard = styled(CardActionArea)`
  max-width: 19rem;
  margin: auto;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Adjusted shadow with more opacity on hover */
    transform: scale(0.9);
  }

  .category-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1); /* Lighter shadow by default */
    background-color: #7CBB5270; /* Reduced opacity background color */
    border-radius: 8px; /* Add border-radius for rounded corners */
  }

  .category-image {
    height: 5rem;
    width: auto;
    position: relative;
    top: 15px;
    max-width: 100%;
  }

  .category-details {
    text-align: center;
    margin-top: 1rem;
  }

  .category-name {
    font-size: 1.25rem;
    color: #4a5568;
    font-weight: bold;
  }

  .category-item-count {
    font-size: 0.75rem;
    color: #718096;
  }
`;