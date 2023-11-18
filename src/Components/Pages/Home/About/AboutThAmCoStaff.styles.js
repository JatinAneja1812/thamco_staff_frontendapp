import styled from "styled-components";

const AboutSection = styled.section`
  background-color: #ffffffdb;
  padding: 30px;
  display: flex;
  justify-content: space-around; /* Adjust as needed for spacing */
  align-items: center;
  text-align: center; /* Center text on small screens */
  flex-wrap: wrap; /* Allow items to wrap on small screens */
`;

const AboutContent = styled.div`
  max-width: 600px;
  margin: 0 20px; /* Adjust as needed for spacing */
`;

const AboutHeading = styled.h2`
  right: 10vh;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  position: relative;
`;

const AboutText = styled.p`
  font-size: 20px;
  left: 27px;
  text-align: justify;
  color: #555;
  margin-bottom: 20px;
  position: relative;
`;

const AboutImage = styled.img`
  max-width: 100%;
  height: 50vh;
  left: -10vh;
  justify-content: center;
  align-items: center;
  position: relative;
  display: flex;
`;

export { AboutSection, AboutContent, AboutHeading, AboutText, AboutImage };
