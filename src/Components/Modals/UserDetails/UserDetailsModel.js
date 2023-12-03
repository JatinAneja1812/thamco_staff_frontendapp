import { StyledModal } from "../StyledModal";
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';

export default function UserDetailsModal(props) {
  const { firstName, lastName, username, email, userId, phoneNumber } =
    props.details;

  return (
    <StyledModal
      title={"User Details"}
      open={props.open}
      closable={false}
      width={"59vh"}
      style={{ top: 80, right: 10, position: 'fixed' }}
      okButtonProps={{ style: { display: "none" } }} // Hide the OK button
      cancelButtonProps={{ style: { display: "none" } }} // Hide the Cancel button
      onCancel={() => {
        props.closeModal();
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: 20, maxWidth: 400, margin: "auto", marginTop: 10 }}
      >
        <Typography variant="h5" gutterBottom>
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Username: {username}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Email: {email}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Staff ID (User ID): {userId}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Phone Number: {phoneNumber}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          style={{ marginTop: 20 }}
          disabled
        >
          Edit Number
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          style={{ marginTop: 20, marginLeft: 10 }}
          disabled
        >
          Edit Address
        </Button>
      </Paper>
    </StyledModal>
  );
}
