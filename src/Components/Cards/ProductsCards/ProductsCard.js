import React, { useContext, useState } from 'react';
import { Button, Card, CardActions, CardContent, Fade, Rating, Skeleton, useMediaQuery, IconButton } from '@mui/material';
import { Star } from '@mui/icons-material';
import  { InfoCircleOutlined } from '@ant-design/icons';
import { ProductsCard, ProductCardMedia, ProductCardContent, ProductTitle, ProductText, ProductRatingContainer, ProductCardWrapper} from "./ProductsCard.styles";
import ProductDetailsModal from '../../Modals/ProductsDetails/ProductDetailsModal';
import { useAuth0 } from '@auth0/auth0-react';
import { groceryContext } from '../../../AppTemplate/Template';
import handleSessionStorage from '../../../Utility/LibraryFunctions/HandleSessionStorage';
import SuccessAlert from '../../Snackbars/SuccessAlert';

const ProductCard = ({ product }) => {
  const { Img, ProductName, Price, Reviews, ReviewCount, Quantity, Unit } = product;
  const { isAuthenticated } = useAuth0();

  const ismediumscreen = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const issmallscreen = useMediaQuery('(max-width:768px)');

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

  const { cartItemsState } = useContext(groceryContext);
  const [cartItems, setCartItems] = cartItemsState;

  const handleAddToCartBtn = () => {
    console.log("clicked")
    let targetedProduct = product;
    let latestCartItems = cartItems;

    const isTargetedProductAlreadyExist = cartItems.find((item) => item.ProductId === product.ProductId);
    if (isTargetedProductAlreadyExist) {
      targetedProduct = {
        ...isTargetedProductAlreadyExist,
        Quantity: isTargetedProductAlreadyExist.Quantity + 1,
        total: (
          (isTargetedProductAlreadyExist.Quantity + 1) * isTargetedProductAlreadyExist.Price
        ).toFixed(2),
      };
      latestCartItems = cartItems.filter((item) => item.ProductId !== targetedProduct.ProductId);
    }
    setCartItems([targetedProduct, ...latestCartItems]);
    handleSessionStorage('set', 'cartItems', [targetedProduct, ...latestCartItems]);

    setOpenAlert(!openAlert);
  };

  return (
    <ProductCardWrapper>
      <SuccessAlert state={[openAlert, setOpenAlert]} massage={'Item is successfully added to your cart.'} />

      <Fade in={true}>
        <ProductsCard data-issmallscreen={issmallscreen}>
            {/* Product_img */}
            <ProductCardMedia
                component="img"
                height={issmallscreen ? 140 : 200}
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
                  onClick={handleAddToCartBtn}
                  size={ismediumscreen ? 'small' : 'medium'}
                  variant="outlined"
                  style={{
                      background: "green",
                      color: "white",
                      display: isAuthenticated === false? "none" : "flex" 
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