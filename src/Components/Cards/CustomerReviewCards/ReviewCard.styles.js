import styled from "styled-components";
import { Star } from "@mui/icons-material";

const CardContainer = styled.div`
  background-color: #ffffffb3;
  border-radius: 8px;
  padding: 23px;
  width: 35vh;
  height: 19vh;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  position: relative;
  top: 0px;
  display: inline-table;
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
  justify-content: center;
  margin-left: -3vh;
`;

const RatingStar = styled(Star)`
  color: #fdd835; /* yellow */
  margin-right: 4px;
`;

const ReviewText = styled.div`
  flex: 1;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 16px; /* Adjust the margin as needed */
`;

export {
  CardContainer,
  UserInfoContainer,
  UserName,
  HappyCustomerText,
  RatingContainer,
  RatingStar,
  ReviewText,
  ContentContainer,
};
