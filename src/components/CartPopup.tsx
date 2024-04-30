import { Box, IconButton, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link as RouteLink } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { CartItem } from "@/interfaces";
import { removeItem, useCart, useCartDispatch } from "@/components/Providers/CartProvider";

const CartPopupItem = (props: { item: CartItem }) => {
  const { item } = props;
  const dispatchCart = useCartDispatch();

  const slaData = item.modifiers || [];

  return (
    <Box sx={{ marginBottom: "1rem" }}>
      <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
        <Grid item xs={12} md={9}>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2">{item.note || ""}</Typography>
          <Typography variant="caption">
            {slaData.length ? "Base Price" : "Price"}: ${item.basePrice}
            <br />
          </Typography>
          {slaData.map((sla) => (
            <Typography key={sla.id} variant="caption">
              {sla.type[0].toUpperCase() + sla.type.slice(1)}: {sla.dueWithinDays} days - x{sla.priceModifier}
              <br />
            </Typography>
          ))}
          {slaData.length ? <Typography variant="caption">Price: ${item.finalPrice}</Typography> : ""}
        </Grid>
        <Grid item xs={12} md={3}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => {
              dispatchCart(removeItem(item.id));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ mx: "-1rem" }} />
    </Box>
  );
};

const CartPopup = (props: { onClose: () => void }) => {
  const cart = useCart();

  return (
    <Paper elevation={3}>
      <Box
        sx={{
          border: 1,
          padding: "1rem",
          backgroundColor: "white",
          minWidth: "15rem",
          maxWidth: "30rem",
          borderRadius: "5px",
        }}
      >
        {cart.items.map((item) => (
          <CartPopupItem key={item.id} item={item} />
        ))}
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          Total: ${cart.total}
        </Typography>
        {cart.items.length === 0 && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={RouteLink}
            to="/checkout"
            onClick={props.onClose}
          >
            Go to Checkout <ShoppingCartCheckoutIcon sx={{ ml: "0.5rem" }} />
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default CartPopup;
