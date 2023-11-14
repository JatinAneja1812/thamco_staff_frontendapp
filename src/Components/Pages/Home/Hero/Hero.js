import React from "react";
import {
  HeroWrapper,
  sectionStyle,
  textContainerStyle,
  titleStyle,
  descriptionStyle,
  buttonStyle,
  imageContainerStyle,
  imageStyle,
} from "./Hero.styles";
import { Button, Container, useMediaQuery } from "@mui/material";
import hero_customer from "./../../../../Assets/Images/hero_customer.png";
import ful_kopi from "../../../../Assets/Icons/ful_kopi_icon.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  // Media Query
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();

  return (
    <HeroWrapper>
      <section style={sectionStyle} className="custom-hero-section">
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 0fr",
              gap: "5.25rem",
            }}
          >
            {/* Text */}
            <div style={textContainerStyle}>
              <div style={{ width: "11/12" }}>
                {/* title */}
                <h1 style={titleStyle}>
                  Make healthy life <br />
                  <div>
                    with <span style={{ color: "#00C853", fontSize: "50px" }}>fresh grocery</span>
                  </div>
                  products{" "}
                  <img
                    style={{ display: "inline", height: "40px" }}
                    src={ful_kopi}
                    alt="vegetable"
                  />
                </h1>
                {/* description */}
                <p style={descriptionStyle}>
                  Get the best quality and most delicious grocery food in the
                  world, you can get them on our website. Fresh grocery every
                  day to your family.
                </p>

                {/* Shop_now Btn */}
                <Button
                  onClick={() => navigate("/products")}
                  sx={buttonStyle}
                  variant="contained"
                  size={isMediumScreen ? "medium" : "large"}
                  color="success"
                >
                  Shop Now
                </Button>
              </div>
            </div>

            {/* Hero Img */}
            <div style={imageContainerStyle}>
              <img style={imageStyle} src={hero_customer} alt="hero_customer" />
            </div>
          </div>
        </Container>
      </section>
    </HeroWrapper>
  );
};

export default Hero;
