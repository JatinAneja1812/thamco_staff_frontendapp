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
  height: 100vh;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  animation: ${checkAnimation} 0.5s ease-in-out;
`;

const CheckIcon = styled.span`
  font-size: 24px;
`;

const SuccessText = styled.p`
  margin: 0;
`;

export {CenteredContainer, SuccessMessage, CheckIcon, SuccessText}