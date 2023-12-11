import React, { useEffect, useMemo } from 'react';
import { OrderSummaryWrapper } from './OrderSummery.styles';
import { Button, useMediaQuery } from '@mui/material';
import { groceryContext } from '../../../../AppTemplate/Template';
import { useContext } from 'react';
import { CheckoutContext } from '../ShoppingCart';

const OrderSummary = () => {
  // Get Cart Items from Context
  const { cartItemsState } = useContext(groceryContext);
  const [cartItems] = cartItemsState;
  const [isProceedToCheckout, setIsProceedToCheckout] = useContext(CheckoutContext);

  // Media Query
  const isMediumScreen = useMediaQuery('(max-width:1024px)');

  // Calculate Subtotal
  const subtotal = useMemo(() => {
    return Number.parseFloat(cartItems.reduce((total, item) => total + Number.parseFloat(item.Total), 0));
  }, [cartItems]);

  // Calculate Total
  const total = useMemo(() => subtotal + 4.99, [subtotal]);

  // Update session storage when cartItems or isProceedToCheckout changes
  useEffect(() => {
    sessionStorage.setItem('subtotal', subtotal.toFixed(2));
    sessionStorage.setItem('deliveryCharge', 4.99);
    sessionStorage.setItem('total', total.toFixed(2));
    
  }, [cartItems, isProceedToCheckout, subtotal, total]);

  return (
    <OrderSummaryWrapper isProceedToCheckout={isProceedToCheckout}>
      {/* Title */}
      <h3>Order Summary</h3>

      {/* Total Bill */}
      <table>
        <tbody>
          {/* Subtotal */}
          <tr>
            <td>Subtotal</td>
            <td>£ {subtotal.toFixed(2)} GBP</td>
          </tr>
          {/* Delivery Charge */}
          <tr>
            <td>Delivery charge</td>
            <td>£ 4.99 GBP</td>
          </tr>
          {/* Total */}
          <tr>
            <td>Total</td>
            <td>£ {total.toFixed(2)} GBP</td>
          </tr>
        </tbody>
      </table>

      {/* Proceed to checkout */}
      <Button
        fullWidth
        onClick={() => setIsProceedToCheckout(!isProceedToCheckout)}
        className="proceed-to-checkout-btn"
        variant="contained"
        size={isMediumScreen ? 'small' : 'medium'}
        color="success"
      >
        {"NEXT >>>"}
      </Button>
    </OrderSummaryWrapper>
  );
};

export default OrderSummary;