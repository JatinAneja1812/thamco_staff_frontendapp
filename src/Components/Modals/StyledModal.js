import styled from "styled-components";
import { Modal } from "antd";

const StyledModal = styled(Modal)`
  width: 128vh;
  .ant-btn-default {
    float: left;
  }
`;

const ProductDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & img {
    max-width: 50%;
    border-radius: 8px;
  }

  .reviewtext{
    font-size: 1.3rem !important;
    margin-top: 2px;
  }
  .reviewTitle {
    font-size: 1.2rem !important;
  }

  & .details {
    max-width: 45%;
    padding: 20px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.8);

    & h2 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    & p {
      font-size: 22px;
      font-weight: 400;
      margin-bottom: 10px;
    }

    & .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #4caf50;
    }

    & .reviews {
      margin-top: 20px;
    }

    & .review-item {
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    & .star-rating {
      color: #ffc107;
      font-size: 1.2rem;
      margin-right: 5px;
    }
  }
`;

export { StyledModal, ProductDetailsWrapper };
