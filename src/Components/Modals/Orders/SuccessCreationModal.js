import React from "react";
import { StyledModal } from "../StyledModal";
import { CenteredContainer, CheckIcon, SuccessMessage, SuccessText } from "./SuccessCreationModal.styles";
import { useNavigate } from "react-router-dom";

export default function SuccessOrderCreationModal(props) {

  const navigate = useNavigate();

  const handleInfomationClose = () => {
    navigate("/orders");
  }

  return (
    <StyledModal
      open={props.open}
      closable={false}
      centered
      okText={"Proceed to Orders"}
      cancelButtonProps={{ style: { display: "none" } }} // Hide the Cancel button
      onOk={() => {
        handleInfomationClose();
      }}
    >
        <CenteredContainer>
            <SuccessMessage>
                <CheckIcon>✓</CheckIcon>
                <SuccessText>Order Successfully Created</SuccessText>
            </SuccessMessage>
        </CenteredContainer>
    </StyledModal>
  );
}
