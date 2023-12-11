import { Button } from "@mui/material";
import { Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { groceryContext } from "../../../../AppTemplate/Template";
import handleSessionStorage from "../../../../Utility/LibraryFunctions/HandleSessionStorage";
import ReturnButton from "../../../Buttons/ReturnButton/ReturnButton";
import SuccessOrderCreationModal from "../../../Modals/Orders/SuccessCreationModal";

const { Option } = Select;

export default function CustomerList(props) {
  const { cartItemsState } = useContext(groceryContext);
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = cartItemsState;
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerList, setCustomerList] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);

  const fetchData = async () => {
    try {
      const httpResponse = await fetch(
        //CHANGE HERE
        "https://localhost:7276/api/UserProfiles/GetAllCustomers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        }
      );

      if (httpResponse.status === 500) {
        const errorMessage = await httpResponse.text();
        throw new Error(errorMessage);
      }

      if (!httpResponse.ok) {
        throw new Error("Failed to get data.");
      }

      const result = await httpResponse.text();
      setCustomerList(JSON.parse(result));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleCustomerChange = (customerId) => {
    const customer = customerList.find(
      (c) => c.userId === customerId
    );
    setSelectedCustomer(customer);
    setOpenDetails(true);
    form.setFields([
      {
        name: 'customerId',
        value: customer.userId,
      },
      {
        name: 'customerName',
        value: `${customer.firstName} ${customer.lastName}`,
      },
      {
        name: 'customerEmailAddress',
        value: customer.email,
      },
      {
        name: 'customerContactNumber',
        value: customer.phoneNumber,
      },
      {
        name: 'houseNumber',
        value: customer.locationNumber,
      },
      {
        name: 'street',
        value: customer.street,
      },
      {
        name: 'city',
        value: customer.city,
      },
      {
        name: 'country',
        value: customer.state,
      },
      {
        name: 'postalCode',
        value: customer.postalCode,
      },
      {
        name: 'availableFunds',
        value: customer.availableFunds,
      },
    ]);
  }

  const onSubmit = (data) => {

    const {
      customerId,
      customerName,
      customerEmailAddress,
      customerContactNumber,
      availableFunds,
      houseNumber,
      street,
      city,
      country,
      postalCode,
      orderNotes,
    } = data;

    // Create Address DTO
    const addressDTO = {
      houseNumber,
      street,
      city,
      country,
      postalCode,
    };
    // Create Customer DTO
    const customerDTO = {
      customerId,
      customerName,
      customerEmailAddress,
      customerContactNumber,
      availableFunds: parseFloat(availableFunds).toFixed(2)
      
    };
    // Create OrderItems DTO (Assuming you have an array of order items in cartItems)
    const orderItemsDTO = cartItems.map((item) => ({
      productId: item.ProductId,
      productName: item.ProductName,
      img: item.Img,
      totalQuantity: item.Quantity,
      unit: item.Unit,
      totalPrice: parseFloat(item.Total).toFixed(2),
      brandName: item.BrandName,
    }));
  
      // Create the final Order DTO
    const orderDTO = {
      orderCreationDate: new Date().toISOString(),
      createdBy: sessionStorage.getItem("staffName"), // You may replace this with the actual user information
      orderNotes,
      customerId,
      subtotal: sessionStorage.getItem("subtotal"),
      deliveryCharge: sessionStorage.getItem("deliveryCharge"),
      total: sessionStorage.getItem("total"),
      address: addressDTO,
      status: null,
      billingAddress: null,
      customer: customerDTO,
      orderedItems: orderItemsDTO,
    };
    
    props.addNewOrder(orderDTO);
    // Perform actions when submitting the form (e.g., handleSessionStorage, setCartItems, navigate)
    handleSessionStorage("remove", "cartItems");
    sessionStorage.removeItem("total");
    sessionStorage.removeItem("subtotal");
    sessionStorage.removeItem("deliveryCharge");
    setCartItems([]);
    navigate("/orders");
  };

  return (
    <>
      <SuccessOrderCreationModal open={props.alertOpen}  />
      <ReturnButton />
      <div>
        <h1
          style={{
            fontSize: "28px", // You can adjust the font size as needed
            fontWeight: "700",
            color: "#000",
            marginBottom: "1rem",
          }}
        >
          Select Customer
        </h1>

        <Select
          showSearch
          placeholder="Select a customer"
          optionFilterProp="children"
          onChange={handleCustomerChange}
          style={{width: "32vh"}}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {customerList.map((customer) => (
            <Option key={customer.userId} value={customer.userId}>
              {`${customer.firstName} ${customer.lastName}`}
            </Option>
          ))}
        </Select>

        {openDetails && (
          <Form form={form} layout="vertical" onFinish={onSubmit} style={{marginTop: "30px"}}>
            {/* Form fields for selected customer */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="CustomerID" name="customerId">
                  <Input disabled style={{ color: "black", background:"transparent" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Name" name="customerName">
                  <Input disabled style={{ color: "black",  background:"transparent" }} />
                </Form.Item>
              </Col>
            </Row>
           
            <Form.Item label="Email" name="customerEmailAddress">
              <Input style={{ color: "black" }} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="PhoneNumber" name="customerContactNumber">
                  <Input style={{ color: "black" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Funds" name="availableFunds">
                  <Input
                    disabled
                    style={{ color: "black" }}
                    placeholder="Available Funds"
                    prefix="£"
                  />
                </Form.Item>
              </Col>
            </Row>
            <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "1rem" }}>Address</h4>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="houseNumber">
                  <Input style={{ color: "black" }} placeholder="House Number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="street">
                  <Input style={{ color: "black" }} placeholder="Street" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="city">
                  <Input style={{ color: "black" }} placeholder="City" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="country">
                  <Input style={{ color: "black" }} placeholder="Country" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="postalCode">
              <Input style={{ color: "black" }} placeholder="Postal Code" />
            </Form.Item>

            <Form.Item label="Order Notes" name="orderNotes">
              <TextArea
                showCount
                maxLength={100}
                placeholder="Add order notes"
                allowClear
                style={{ color: "black" }}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                disabled={selectedCustomer.availableFunds < 50 ? true : false} 
                style={{backgroundColor: selectedCustomer.availableFunds < 50 ? "rgb(90 94 90 / 84%)" : "rgb(20 75 16 / 84%)", color: "#fff"}}  
                type="primary" htmlType="submit"
              >
                Place Order
              </Button>
              {selectedCustomer.availableFunds < 50 && (
                <span style={{ marginLeft: '8px', color: 'red', fontSize: "20px", fontWeight: 600 }}>
                  Insufficient funds. Please add more funds to your account.
                </span>
              )}
            </Form.Item>
          </Form>
        )}
      </div>
    </>
  );
}
