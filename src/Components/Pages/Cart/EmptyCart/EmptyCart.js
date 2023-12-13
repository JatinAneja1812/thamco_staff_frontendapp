import React from 'react';
import { Container, Fade, Button, Typography } from '@mui/material';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const theme = {
  typography: {
    pxToRem: (value) => `${value / 16}rem`, // Your custom implementation for pxToRem
  },
  palette: {
    text: {
      secondary: '#000000', // Your secondary text color
    },
  },
  spacing: (value) => `${value * 8}px`, // Your custom implementation for spacing
};

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TextContainer = styled.div`
  text-align: center;

  & .text-sm {
    font-size: ${(props) => props.theme.typography.pxToRem(14)};
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

const StyledButton = styled(Button)`
  text-transform: capitalize;
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <StyledThemeProvider theme={theme}>
      <Fade in={true}>
        <StyledContainer>
          <TextContainer>
            <Typography variant="subtitle1" className="text-sm">
              There are no items in this cart
            </Typography>
            <StyledButton
              onClick={() => navigate('/products')}
              size='large'
              color='success'
              variant='outlined'>
              Continue Shopping
            </StyledButton>
          </TextContainer>
        </StyledContainer>
      </Fade>
    </StyledThemeProvider>
  );
};

export default EmptyCart;