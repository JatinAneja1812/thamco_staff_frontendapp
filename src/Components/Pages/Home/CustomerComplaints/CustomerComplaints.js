import { InfoCircleOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import React from "react";
import {
    CombinedContainer,
    ComplaintsContainer,
    ContactLink,
    Container3D,
    Item,
    ItemList,
    ProductDetails,
    ProductInfo,
    ReorderButton,
    StockInfo,
    Title,
} from "./CustomerComplaints.styles";

const CustomerComplaints = () => {
  const complaints = [
    {
      id: 1,
      name: "Late Delivery",
      details: "The order was delivered two days later than the expected date.",
      rating: 2,
    },
    {
      id: 2,
      name: "Incorrect Product",
      details: "Received the wrong product. Ordered a laptop, got a toaster.",
      rating: 1,
    },
    {
      id: 3,
      name: "Poor Customer Service",
      details: "Tried to contact support multiple times, but no response.",
      rating: 3,
    },
  ];

  const products = [
    {
      id: "ADV-001",
      name: "Organic Quinoa",
      stockLeft: 15,
      lastOrderDate: "2023-01-10",
    },
    {
      id: "AD3-0202",
      name: "Avocado Oil",
      stockLeft: 8,
      lastOrderDate: "2023-02-05",
    },
    {
      id: "VGDV-0e2",
      name: "Chia Seeds",
      stockLeft: 5,
      lastOrderDate: "2023-02-15",
    },
    {
      id: "AYU-302",
      name: "Almond Butter",
      stockLeft: 10,
      lastOrderDate: "2023-01-28",
    },
  ];

  return (
    <CombinedContainer>
      <ComplaintsContainer>
        <Title>Recent Customer Complaints</Title>
        <InfoCircleOutlined className="ComplaintIcon" />
        <ItemList>
          {complaints.map((complaint) => (
            <Item key={complaint.id}>
              <ProductDetails>{complaint.name}</ProductDetails>
              <ProductDetails>{complaint.details}</ProductDetails>
              <div>
                <ProductDetails>Rating:</ProductDetails>
                <Rate disabled defaultValue={complaint.rating} />
              </div>
              <ContactLink>Contact Customer Support</ContactLink>
            </Item>
          ))}
        </ItemList>
      </ComplaintsContainer>
      <Container3D>
        <Title>Out of Stock Products</Title>
        <ItemList>
          {products.map((product) => (
            <Item key={product.id} style={{height:"23vh"}}>
              <ProductInfo>
                <ProductDetails>{product.name}</ProductDetails>
                <ReorderButton type="primary">Reorder</ReorderButton>
              </ProductInfo>
              <ProductDetails>
                Last Order Date: {product.lastOrderDate}
              </ProductDetails>
              <StockInfo>Stock Left: {product.stockLeft}</StockInfo>
            </Item>
          ))}
        </ItemList>
      </Container3D>
    </CombinedContainer>
  );
};

export default CustomerComplaints;