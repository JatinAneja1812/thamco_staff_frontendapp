import React from "react";
import { StyledModal } from "../StyledModal";
import { CenteredContainer, CheckIcon, SuccessMessage, SuccessText } from "./SuccessCreationModal.styles";

export default function SuccessOrderCreationModal(props) {
  return (
    <StyledModal
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
        <CenteredContainer>
            <SuccessMessage>
                <CheckIcon>✓</CheckIcon>
                <SuccessText>Order Successfully Created</SuccessText>
            </SuccessMessage>
        </CenteredContainer>
    </StyledModal>
  );
}
