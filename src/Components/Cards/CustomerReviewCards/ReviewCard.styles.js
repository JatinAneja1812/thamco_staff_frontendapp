import styled from 'styled-components';
import { Star } from '@mui/icons-material';

const CardContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  width: 40vh;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
`;

const HappyCustomerText = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 4px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const RatingStar = styled(Star)`
  color: #fdd835; /* yellow */
  margin-right: 4px;
`;

const ReviewText = styled.div`
  flex: 1;
`;

const TruckIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 16px; // Adjust the margin as needed
`;

export { CardContainer, UserInfoContainer, UserName, HappyCustomerText, RatingContainer, RatingStar, ReviewText, TruckIcon, ContentContainer}