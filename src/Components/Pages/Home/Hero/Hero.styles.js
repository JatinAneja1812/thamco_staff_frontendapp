import styled from "styled-components";
import Hero_bg from "../../../../Assets/Backgrounds/1_bg.png";

const HeroWrapper = styled.div``;

const sectionStyle = {
  backgroundImage: `url(${Hero_bg})`,
  backgroundSize: "cover",
  backgroundColor: "rgb(233 246 235)",
  paddingTop: "0rem", // You can adjust the value based on your design
};

const textContainerStyle = {
  gridColumn: "1",
  paddingTop: "0.875rem", // Adjust as needed
  display: "flex",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "50px",
  fontWeight: "bold",
  textTransform: "capitalize",
  letterSpacing: "wide",
};

const descriptionStyle = {
  fontSize: "15px",
};

const buttonStyle = {
  textTransform: "capitalize",
};

const imageContainerStyle = {
  gridColumn: "2",
};

const imageStyle = {
  height: "24rem", // Adjust as needed
  margin: "auto",
};

export {
  HeroWrapper,
  sectionStyle,
  textContainerStyle,
  titleStyle,
  descriptionStyle,
  buttonStyle,
  imageContainerStyle,
  imageStyle,
};