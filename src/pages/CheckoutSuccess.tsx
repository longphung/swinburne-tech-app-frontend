import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const CheckoutSuccess: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
      <CheckCircleIcon sx={{ fontSize: 100, color: "#4CAF50", margin: "auto", display: "block" }} />
      <Typography variant="h3" align="center" gutterBottom>
        Thank you for your purchase!
      </Typography>
      <Typography variant="h5" align="center">
        Your order has been successfully processed.
      </Typography>
    </Container>
  );
};

export default CheckoutSuccess;
