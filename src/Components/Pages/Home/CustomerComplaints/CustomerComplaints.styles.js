import styled from "styled-components";
import { Button } from "antd";

export const CombinedContainer = styled.div`
  display: flex;
  margin-top: -38px;
  justify-content: space-around;
  margin: 0px auto;
  width: 80%;
  background: #fff;

  .ComplaintIcon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ff4d4f;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const Container3D = styled.div`
  width: 45%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

export const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Item = styled.li`
  margin-bottom: 20px;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-direction: column;
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductDetails = styled.p`
  font-size: 21px;
  color: #333;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  margin: 20px 0 20px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

export const ReorderButton = styled(Button)`
  margin-top: 10px;
`;

export const ContactLink = styled.a`
  font-size: 18px;
  color: #ff4d4f;
  cursor: pointer;
`;

export const ComplaintsContainer = styled(Container3D)`
  position: relative;
`;

export const StockInfo = styled.p`
  font-size: 18px;
  color: red;
  font-weight: 400;
`;
