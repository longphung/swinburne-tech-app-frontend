import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Editor from "@/components/Editor/Editor";

import { ServiceData } from "@/interfaces";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addItem, useCartDispatch } from "@/components/Providers/CartProvider";

const IndividualServicePage = () => {
  const dispatchCart = useCartDispatch();
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState("");
  const { data } = useOne({
    resource: "services",
    id,
  });

  const serviceData = data?.data as ServiceData;

  const handleAddToCart = () => {
    dispatchCart(addItem({ ...serviceData, note }));
    setNote("");
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!serviceData) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "2rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid container item xs={12} md={6} display="flex" justifyContent="center">
          <CardMedia
            component="img"
            image={serviceData.imageUrl}
            alt={serviceData.title}
            sx={{
              height: "100%",
              maxHeight: "32rem",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="div">
            {serviceData.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {serviceData.label}
          </Typography>
          <Typography variant="h6" component="div">
            Price: ${serviceData.price}
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Editor
              // @ts-expect-error This is a valid prop
              initialContent={serviceData.description}
              editable={false}
            />
          </Box>
          <TextField
            label="Notes"
            multiline
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ marginTop: "1rem" }}>
            <AddShoppingCartIcon sx={{ marginRight: "0.5rem" }} />
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IndividualServicePage;
