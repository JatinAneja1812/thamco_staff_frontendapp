import { Button } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";
import { CheckoutContext } from '../../Pages/Cart/ShoppingCart';
import { useContext } from 'react';

const ReturnButton = () => {
    const [isProceedToCheckout, setIsProceedToCheckout] = useContext(CheckoutContext);

    return (
        <Button
            color='success'
            onClick={() => setIsProceedToCheckout(!isProceedToCheckout)}
            size='small'
            sx={{textTransform: 'capitalize'}}
            variant='outlined'
            startIcon={<ArrowBack fontSize='inherit' />}>
            Go Back
        </Button>
    );
};

export default ReturnButton;