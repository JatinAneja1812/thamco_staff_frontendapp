import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CartButton = styled(Link)`
  position: relative;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;

  .basket-icon {
    /* Add your basket icon styles here */
    width: 24px;
    height: 24px;
    background-color: #3498db;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
  }

  .item-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #e74c3c;
    color: #fff;
    font-size: 12px;
    padding: 4px;
    border-radius: 50%;
  }
`;

export default CartButton;