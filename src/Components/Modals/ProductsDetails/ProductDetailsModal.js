import { StyledModal, ProductDetailsWrapper } from "../StyledModal";
import React from "react";
import { Rate } from "antd";

export default function ProductDetailsModal(props) {
    const {
        Img,
        ProductName,
        BrandName,
        NutritionalInformation,
        Description,
        Price,
        Unit,
        UserComments
    } = props.product;

  return (
    <StyledModal
      title={"Product Details"}
      open={props.open}
      closable={false}
      width={"128vh"}
      centered
      okButtonProps={{ style: { display: "none" } }} // Hide the OK button
      cancelButtonProps={{ style: { display: "none" } }} // Hide the Cancel button
      onCancel={() => {
        props.handleInfomationClose();
      }}
    >
      <ProductDetailsWrapper>
        <img src={Img} alt={ProductName} />

        <div className="details">
          <h2>{ProductName}</h2>
          <p><strong>Brand:</strong> {BrandName}</p>
          <p><strong>Nutritional Information:</strong> {NutritionalInformation}</p>
          <p><strong>Description:</strong> {Description}</p>
          <p className="price">Price: £ {Price} / {Unit}</p>
          <div className="reviews">
            <h3 className="reviewTitle">Customer Reviews</h3>
            {UserComments && UserComments.length > 0 ? (
              UserComments.map((comment, index) => (
                <div className="review-item" key={index}>
                  <p >{comment.UserName}</p>
                  <Rate
                    className="star-rating"
                    allowHalf
                    defaultValue={comment.Rating}
                    disabled
                  />
                  <p className="reviewtext">{comment.Comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </ProductDetailsWrapper>
    </StyledModal>
  );
}
