import styled from 'styled-components';

const CartItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0rem;
  max-height: 550px; /* Set your desired max height */
  overflow-y: auto;

  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px; /* Set the width of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #38a169; /* Set the color of the thumb */
    border-radius: 4px; /* Round the corners of the thumb */
  }

  ::-webkit-scrollbar-track {
    background-color: #ddd; /* Set the color of the track */
  }
`;

export { CartItemsWrapper };