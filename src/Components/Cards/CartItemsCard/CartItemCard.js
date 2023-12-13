import React, { useContext, useEffect, useState } from "react";

import { Add, Remove } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fade, IconButton } from "@mui/material";
import { groceryContext } from "../../../AppTemplate/Template";
import handleSessionStorage from "../../../Utility/LibraryFunctions/HandleSessionStorage";
import {
    CartItemCardWrapper,
    ProductDetails,
    ProductImage,
    ProductPrice,
    ProductPriceAndRemove,
    QuantityControllerWrapper,
    RemoveButtonWrapper,
} from "./CartItemCard.styles";
import { Popconfirm } from "antd";
// import PopUpDialog from '../../PopUpDialog/PopUpDialog';

const CartItemCard = ({ item }) => {
  const { ProductId, ProductName, Img, Total } = item;

  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext);
  const [cartItems, setCartItems] = cartItemsState;

  // Remove Item Handler
  const handleRemoveItem = () => {
    const trimmedCart = cartItems.filter(
      (item) => item.ProductId !== ProductId
    );
    setCartItems(trimmedCart);
    handleSessionStorage("set", "cartItems", trimmedCart);
  };

  return (
    <>
      <Fade in={true}>
        <CartItemCardWrapper>
            <ProductImage>
              <img src={Img} alt={ProductName} />
            </ProductImage>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ProductDetails>
              <h3>{ProductName}</h3>
              <h5>Best Quality</h5>
            </ProductDetails>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ProductPriceAndRemove>
              <RemoveButtonWrapper>
                <Popconfirm
                    title="Want to remove this item?"
                    okText={"Yes"}
                    cancelText={"No"}
                    onConfirm={() => handleRemoveItem() }
                >
                    <IconButton
                    color="inherit"
                    size="small"
                    >
                    <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Popconfirm>
              </RemoveButtonWrapper>
              <ProductPrice>${Total}</ProductPrice>
            </ProductPriceAndRemove>

            <QuantityControllerWrapper>
              <QuantityController item={item} />
            </QuantityControllerWrapper>
          </div>
        </CartItemCardWrapper>
      </Fade>
    </>
  );
};

// Quantity Controller

const QuantityController = ({ item }) => {
  const { Unit, Quantity, Price, ProductId } = item;
  const [productQuantity, setProductQuantity] = useState(Quantity);

  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext);
  const [cartItems, setCartItems] = cartItemsState;

  // Event Handlers
  const handleReduce = () => {
    productQuantity > 1 && setProductQuantity(productQuantity - 1);
  };
  const handleIncrement = () => {
    setProductQuantity(productQuantity + 1);
  };

  // Update Cart
  useEffect(() => {
    const updatedCart = cartItems.map((item) => {
      if (item.ProductId === ProductId) {
        return {
          ...item,
          Quantity: productQuantity,
          Total: (productQuantity * Price).toFixed(2),
        };
      } else {
        return item;
      }
    });
    setCartItems(updatedCart);
    handleSessionStorage("set", "cartItems", updatedCart);
  }, [Price, ProductId, cartItems, productQuantity, setCartItems]);

  return (
    <QuantityControllerWrapper className="quantity-controller">
      {/* Reduce Quantity */}
      <IconButton
        className="quantity-btn"
        size="small"
        disabled={productQuantity < 2}
        onClick={handleReduce}
      >
        <Remove fontSize="inherit" />
      </IconButton>

      {/* Current Quantity*/}
      <h1 className="my-auto lg:text-xl lg:font-medium font-semibold text-gray-700 whitespace-nowrap">
        {productQuantity}
        <span className="lg:text-sm text-xs"> {Unit}</span>
      </h1>

      {/* Increase Quantity */}
      <IconButton
        className="quantity-btn"
        size="small"
        onClick={handleIncrement}
        color="success"
      >
        <Add fontSize="inherit" />
      </IconButton>
    </QuantityControllerWrapper>
  );
};

export default CartItemCard;
