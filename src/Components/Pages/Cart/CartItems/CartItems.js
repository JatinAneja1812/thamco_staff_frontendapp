import React, { useContext } from "react";
import { CartItemsWrapper } from "./CartItemsWrapper.styles";
import CartItemCard from "../../../Cards/CartItemsCard/CartItemCard";
import { groceryContext } from "../../../../AppTemplate/Template";

const CartItems = () => {
  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext);
  const [cartItems] = cartItemsState;

  return (
    <>
      {/* Title */}
      <h2 style={{ marginTop: "-10px", fontSize: "4vh"}}>Selected Items</h2>
      <CartItemsWrapper>
        {/* Items Card list */}
        <div>
          {cartItems.map((cartItem) => (
            <CartItemCard item={cartItem} key={cartItem.id} />
          ))}
        </div>
      </CartItemsWrapper>
    </>
  );
};

export default CartItems;
