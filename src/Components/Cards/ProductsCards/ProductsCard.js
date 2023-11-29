import React, { useContext, useState } from 'react';
import { Button, Card, CardActions, CardContent, Fade, Rating, Skeleton, useMediaQuery, IconButton } from '@mui/material';
import { Star } from '@mui/icons-material';
import  { InfoCircleOutlined } from '@ant-design/icons';
import { ProductsCard, ProductCardMedia, ProductCardContent, ProductTitle, ProductText, ProductRatingContainer, ProductCardWrapper} from "./ProductsCard.styles";
import ProductDetailsModal from '../../Modals/ProductsDetails/ProductDetailsModal';
// import { groceryContext } from '../../Layout/Layout';
// import { handleSessionStorage } from '../../../utils/utils';
// import SuccessAlert from '../../SuccessAlert/SuccessAlert';



const ProductCard = ({ product }) => {
  const { Img, ProductName, Price, Reviews, ReviewCount, Quantity, Unit } = product;

  const isMediumScreen = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const [openAlert, setOpenAlert] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleInfomationOpen = (e) => {
    setOpenDetails(true)
    setSelectedProduct(product)
  }

  const handleInfomationClose = () => {
    setOpenDetails(false)
    setSelectedProduct([]);
  }

//   const { cartItemsState } = useContext(groceryContext);
//   const [cartItems, setCartItems] = cartItemsState;

//   const handleAddToCartBtn = () => {
//     let targetedProduct = product;
//     let latestCartItems = cartItems;

//     const isTargetedProductAlreadyExist = cartItems.find((item) => item.id === product.id);
//     if (isTargetedProductAlreadyExist) {
//       targetedProduct = {
//         ...isTargetedProductAlreadyExist,
//         quantity: isTargetedProductAlreadyExist.quantity + 1,
//         total: (
//           (isTargetedProductAlreadyExist.quantity + 1) * isTargetedProductAlreadyExist.price
//         ).toFixed(2),
//       };
//       latestCartItems = cartItems.filter((item) => item.id !== targetedProduct.id);
//     }
//     setCartItems([targetedProduct, ...latestCartItems]);
//     handleSessionStorage('set', 'cartItems', [targetedProduct, ...latestCartItems]);

//     setOpenAlert(!openAlert);
//   };

  return (
    <ProductCardWrapper>
      {/* <SuccessAlert state={[openAlert, setOpenAlert]} massage={'Item added successfully'} /> */}

      <Fade in={true}>
        <ProductsCard isSmallScreen={isSmallScreen}>
            {/* Product_img */}
            <ProductCardMedia
                component="img"
                height={isSmallScreen ? 140 : 200}
                image={Img}
                alt={ProductName}
            />
            {/* Product_details_icon */}
            <IconButton
                color="primary"
                aria-label="info"
                size="small"
                style={{
                    position: 'absolute',
                    marginLeft: "19.5vh",
                    marginTop: "11px"
                }}
                onClick={(e) => handleInfomationOpen(e)}
            >
                <InfoCircleOutlined style={{fontSize: "22px", color: "green"}} />
            </IconButton>

            {/* Product_content */}
            <ProductCardContent>
                {/* title */}
                <ProductTitle>{ProductName}</ProductTitle>
                <div className="space-y-2">
                <div className="flex justify-center space-x-5" style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "15px"
                }}>
                    {/* Amount */}
                    <ProductText>± {Quantity} {Unit}</ProductText>
                    {/* Price */}
                    <ProductText>£ {Price} GB</ProductText>
                </div>

                <div className="flex justify-center">
                    {/* Ratings */}
                    <ProductRatingContainer>
                    <Rating
                        size="small"
                        name="product_ratings"
                        value={Reviews}
                        readOnly
                        precision={0.5}
                        emptyIcon={<Star fontSize="inherit" />}
                    />
                    {/*Number of Reviews*/}
                    <ProductText>({ReviewCount} Reviews)</ProductText>
                    </ProductRatingContainer>
                </div>
                </div>
            </ProductCardContent>
          
            {/* Product_content */}
            <CardActions>
                <Button
                fullWidth
                className='addToCartButton'
                //   onClick={handleAddToCartBtn}
                size={isMediumScreen ? 'small' : 'medium'}
                variant="outlined"
                style={{
                    background: "green",
                    color: "white"
                }}
                >
                Add to cart
                </Button>
            </CardActions>
        </ProductsCard>
      </Fade>

      <ProductDetailsModal 
        handleInfomationClose={handleInfomationClose}
        open={openDetails}
        product={selectedProduct}
      />

    </ProductCardWrapper>
  );
};

export const ProductCardSkeleton = () => (
  <div>
    <Card sx={{ maxWidth: 308, mx: 'auto', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', backgroundColor: 'white' }}>
      {/* Product_img */}
      <Skeleton variant="rectangular" height={170} width={'100%'} />
      <CardContent className="px-1.5 pb-2" sx={{ pb: 1 }}>
        {/* title */}
        <Skeleton sx={{ mx: 'auto' }} variant="text" height={'3rem'} width={'55%'} />
        <div className="md:space-y-1.5 space-y-2 lg:space-y-2">
          <div className="flex justify-center space-x-5">
            {/* Amount */}
            <Skeleton variant="text" height={'1.3rem'} width={'30%'} />
            {/* Price */}
            <Skeleton variant="text" height={'1.3rem'} width={'25%'} />
          </div>
          <div className="flex justify-center">
            {/* Ratings */}
            <Skeleton variant="text" height={'1.6rem'} width={'80%'} />
          </div>
        </div>
      </CardContent>
      {/* Add To Cart Btn */}
      <CardActions sx={{ pt: 0 }}>
        <Skeleton variant="rounded" height={'1.9rem'} width={'100%'} />
      </CardActions>
    </Card>
  </div>
);

export default ProductCard;