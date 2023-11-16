import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledCategoryCard } from "./CategoriesCards.styles.js";
import { Fade } from "@mui/material";
import shadows from '@mui/material/styles/shadows';

const CategoryCard = ({ category  }) => {
    const navigate = useNavigate();
  
    return (
      <StyledCategoryCard
        onClick={() => navigate(`/categories/${category.name.toLowerCase()}`)}
        bgColor={category.bgColor}
        style={{boxShadow: shadows ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none'}}
      >
        <div className="category-content">
          <Fade in={true}>
            <img
              className="category-image"
              src={category.img}
              loading="lazy"
              alt={category.name}
            />
          </Fade>
  
          <div className="category-details">
            <h3 className="category-name">{category.name}</h3>
            {/* <p className="category-item-count">{`${category.items.length} Items`}</p> */}
          </div>
        </div>
      </StyledCategoryCard>
    );
  };
  
  export default CategoryCard;
