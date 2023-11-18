import React, { useState, useEffect } from "react";
import {
  BannerHeader,
  BannerImage,
  BannerSliderContainer,
  BannerWrapper
} from "./OffersBanner.styles";

const OffersBannerSlider = ({ banners }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <BannerWrapper>
      <BannerHeader>Offers</BannerHeader>
      <BannerSliderContainer>
        {banners.map((banner, index) => (
          <BannerImage
            key={index}
            src={banner.image}
            alt={`Banner ${index + 1}`}
            isActive={index === currentBanner}
          />
        ))}
      </BannerSliderContainer>
    </BannerWrapper>
  );
};

export default OffersBannerSlider;
