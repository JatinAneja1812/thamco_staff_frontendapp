import styled from "styled-components";

const BannerSliderContainer = styled.div`
  width: 67%;
  height: 61vh;
  top: -15px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const BannerWrapper = styled.div`
  background-color: #ffffffdb;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  margin: auto; /* Center the image */
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out; /* Adjust the transition duration as needed */
  z-index: ${({ isActive }) => (isActive ? 1 : 0)};
`;

const BannerHeader = styled.h2`
  position: relative;
  font-size: 28px;
  left: -31vw;
  top: 10px;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 15px;
`;

export { BannerSliderContainer, BannerImage, BannerHeader, BannerWrapper };
