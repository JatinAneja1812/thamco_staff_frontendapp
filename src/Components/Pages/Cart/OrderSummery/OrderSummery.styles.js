import styled from 'styled-components';

const OrderSummaryWrapper = styled.div`
  display: flex;
  margin-left: 24vh;
  margin-right: -44vh;
  flex-direction: column;
  column-gap: 3rem;

  @media (max-width: 1024px) {
    column-gap: 0;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    tracking: wide;
    text-align: center;
  }

  table {
    width: 100%;
    margin-bottom: 45px;
    font-size: 19px;
    text-align: left;
    margin-top: 1rem;

    tr {
      font-weight: 700;
      color: #6b7280;

      td:last-child {
        color: green;
        font-weight: bold;
      }
    }
  }

  .proceed-to-checkout-btn {
    text-transform: capitalize;
    transition: display 1000s ease-in-out;
    display: ${({ isProceedToCheckout }) => (isProceedToCheckout ? 'none' : 'block')};
  }
`;

export { OrderSummaryWrapper }; 