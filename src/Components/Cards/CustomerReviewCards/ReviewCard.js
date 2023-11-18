import { Avatar, Skeleton } from '@mui/material';
import {
    CardContainer,
    UserInfoContainer,
    UserName,
    HappyCustomerText,
    RatingContainer,
    RatingStar,
    ReviewText,
    ContentContainer
  } from './ReviewCard.styles';

  const ReviewCard = ({ userReview }) => {
    const { UserId, Firstname, Lastname, Title, Review, Rating, AvatarURL } = userReview;
  
    return (
      <CardContainer>
        <UserInfoContainer>
          <Avatar alt={UserId} src={AvatarURL} />
          <UserName>{Title}. {Firstname} {Lastname}</UserName>
          <HappyCustomerText>Happy Customer</HappyCustomerText>
        </UserInfoContainer>
        <ContentContainer>
          <ReviewText>{Review}</ReviewText>
          <RatingContainer>
            {Array.from({ length: Rating }, (_, index) => (
              <RatingStar key={index} />
            ))}
          </RatingContainer>
        </ContentContainer>
      </CardContainer>
    );
  };
  
  // Review Card Skeleton
  export const ReviewCardSkeleton = () => (
    <CardContainer>
      <UserInfoContainer>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={80} height={20} />
        <HappyCustomerText>
          <Skeleton variant="text" width={100} height={12} />
        </HappyCustomerText>
        <RatingContainer>
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} variant="rectangular" width={16} height={16} />
          ))}
        </RatingContainer>
      </UserInfoContainer>
      <ReviewText>
        <Skeleton variant="text" width="100%" height={80} />
      </ReviewText>
    </CardContainer>
  );
  
  export default ReviewCard;