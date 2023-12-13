import styled, { keyframes } from 'styled-components';

// Keyframes for the checkmark animation
const checkAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled components
const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: transparent;
  font-weight: 700;
  color: black;
  border-radius: 8px;
  width: 45vh;
  animation: ${checkAnimation} 0.5s ease-in-out;
  justify-content: center;
`;

const CheckIcon = styled.span`
  font-size: 27px;
`;

const SuccessText = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`;

export {CenteredContainer, SuccessMessage, CheckIcon, SuccessText}