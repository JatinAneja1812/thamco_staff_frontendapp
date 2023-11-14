import { Container } from '@mui/material';
import SwiperCore, { Autoplay, FreeMode, Pagination } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard, { ReviewCardSkeleton } from '../../../Cards/CustomerReviewCards/ReviewCard';

// Initialize Swiper modules
SwiperCore.use([Pagination, Autoplay, FreeMode]);

const CustomersReview = (props) => {

  return (
    <Container>
      <section className="sm:space-y-10 space-y-8">
        {/* Title */}
        <h1 className="pb-0 md:text-2xl tracking-wide text-xl font-semibold capitalize">
          What people say
        </h1>

        {/* Reviews */}
        <Swiper
          style={{ minHeight: '14rem' }}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            // Extra_Small Screen
            0: {
              slidesPerView: 1,
            },
            // Small Screen
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // Large Screen
            1060: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          speed={700}
          freeMode={true}
          className="mySwiper"
        >
          {props.isLoading
            ? props.userReviews.map((userReview, i) => (
                <SwiperSlide key={i}>
                  <ReviewCard userReview={userReview} />
                </SwiperSlide>
              ))
            : [...Array(9)].map((_, i) => (
                <SwiperSlide key={i}>
                  <ReviewCardSkeleton />
                </SwiperSlide>
              ))}
        </Swiper>
      </section>
    </Container>
  );
};

export default CustomersReview;