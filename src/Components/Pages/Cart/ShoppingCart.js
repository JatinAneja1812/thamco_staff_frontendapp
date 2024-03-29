import { Container } from "@mui/material";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { groceryContext } from "../../../AppTemplate/Template";
import { openErrorNotification } from "../../../Hooks/Notification/GlobalNotification";
import CartItems from "./CartItems/CartItems";
import CustomerList from "./CustomersList/CustomerList";
import EmptyCart from "./EmptyCart/EmptyCart";
import OrderSummary from "./OrderSummery/OrderSummery";
import SuccessOrderCreationModal from "../../Modals/Orders/SuccessCreationModal";

export const CheckoutContext = React.createContext();

const CartContainer = styled(Container)`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const CartGrid = styled.section`
  display: grid;
  gap-x: 5px;
  gap-y: 8px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ShoppingCart = () => {
  // Scrolling Bug Fixed
  window.scroll({ top: 0 });

  const [alertOpen, setAlertOpen] = useState(false);
  const REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL = process.env.REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL;   // Production Base API
  
  const addNewOrder = (addNewOrderDTO) => {

    // Orders API:  "https://localhost:7262/api/Order/AddOrderByStaff"
    // BFF (Local): https://localhost:7259/api/OrderManager/AddNewOrderByStaff

    fetch(`${REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL}/api/OrderManager/AddNewOrderByStaff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      body: JSON.stringify(addNewOrderDTO)
    })
      .then(async (httpResponse) => {
        if (httpResponse.status === 500) {
          var errorMessage = await httpResponse.text();
          throw new Error(errorMessage);
        }
  
        if (!httpResponse.ok) {
          throw new Error("Failed to get data.");
        }
  
        return httpResponse.text();
      })
      .then(
        () => {
          setAlertOpen(true);
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
        }
      )
  };

  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext);
  const [cartItems, setCartItems] = cartItemsState;

  const [isProceedToCheckout, setIsProceedToCheckout] = useState(false);

  return (
    <>
    <SuccessOrderCreationModal open={alertOpen}  />
   
    <CheckoutContext.Provider value={[isProceedToCheckout, setIsProceedToCheckout]}>
      <div>
        {cartItems.length > 0 ? (
          <CartContainer>
            <CartGrid>
              <div>
                {!isProceedToCheckout ? (
                  <CartItems />
                ) : (
                  <CustomerList addNewOrder={addNewOrder} alertOpen={alertOpen} />
                )}
              </div>
              <OrderSummary />
            </CartGrid>
          </CartContainer>
        ) : (
          <EmptyCart />
        )}
      </div>
    </CheckoutContext.Provider>
    </>
  );
};

export default ShoppingCart;