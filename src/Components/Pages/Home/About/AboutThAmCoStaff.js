import React from "react";
import aboutAnimation from "../../../../Assets/Animations/aboutUsAnimation.gif";
import {
  AboutContent,
  AboutHeading,
  AboutImage,
  AboutSection,
  AboutText,
} from "./AboutThAmCoStaff.styles";

const AboutStaff = () => {
  return (
    <AboutSection>
      <AboutContent>
        <AboutHeading>About Our Staff Portal</AboutHeading>
        <AboutText>
          Welcome to our staff portal! Our mission is to provide a seamless and
          efficient platform for our staff to manage daily operations, enhance
          collaboration, and contribute to the success of our food e-commerce
          business.
        </AboutText>
        <AboutText>
          This portal is designed to streamline processes such as order
          management, inventory control, and customer interactions. We believe
          that a well-informed and empowered staff is key to delivering
          exceptional service to our customers.
        </AboutText>
      </AboutContent>
      <AboutImage src={aboutAnimation} alt="About Our Staff Portal" />
    </AboutSection>
  );
};

export default AboutStaff;
