import styled from "@emotion/styled";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import { MouseEventHandler, useState } from "react";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Stack, Link, AppBar, Badge, useMediaQuery, IconButton, Theme, Popper, Paper } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import { useGetIdentity } from "@refinedev/core";
import Button from "@mui/material/Button";

import logoIcon from "@/assets/logo-icon.png";
import logo from "../assets/logo.png";
import { removeItem, useCart, useCartDispatch } from "@/components/Providers/CartProvider";
import { UserData } from "@/interfaces";

const Item = styled.li`
  list-style-type: none;
`;

const HeaderLinks = (props: { userData?: UserData }) => {
  const { userData } = props;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return (
    <Stack
      component="ul"
      direction={isMobile ? "column" : "row"}
      gap="3rem"
      sx={{ fontWeight: "bold", paddingRight: isMobile ? "3rem" : 0 }}
    >
      <Item>
        <Link
          component={RouteLink}
          sx={{
            textUnderlineOffset: 4,
            textDecorationThickness: 2,
          }}
          color="black"
          underline="hover"
          to="/"
        >
          Home
        </Link>
      </Item>
      <Item>
        <Link
          component={RouteLink}
          sx={{
            textUnderlineOffset: 4,
            textDecorationThickness: 2,
          }}
          color="black"
          underline="hover"
          to="/services"
        >
          Services
        </Link>
      </Item>
      <Item>
        <Link
          component={RouteLink}
          sx={{
            textUnderlineOffset: 4,
            textDecorationThickness: 2,
          }}
          color="black"
          underline="hover"
          to="/about"
        >
          About
        </Link>
      </Item>
      {userData?.id ? (
        <Item>
          <Link
            component={RouteLink}
            sx={{
              textUnderlineOffset: 4,
              textDecorationThickness: 2,
            }}
            color="black"
            underline="hover"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </Item>
      ) : (
        <Item>
          <Link
            component={RouteLink}
            sx={{
              textUnderlineOffset: 4,
              textDecorationThickness: 2,
            }}
            color="black"
            underline="hover"
            to="/login"
          >
            Login
          </Link>
        </Item>
      )}
    </Stack>
  );
};

const Header = () => {
  const { data: userData } = useGetIdentity<UserData>();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const cart = useCart();
  const dispatchCart = useCartDispatch();
  const numberOfItemsInCart = cart.items.length;

  const handleMenu = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      component={AppBar}
      sx={{
        backgroundColor: "white",
        justifyContent: "space-between",
        // dynamic padding when in mobile view
        padding: isMobile ? "1rem 2rem" : "1rem 8rem",
      }}
      direction="row"
      position="sticky"
    >
      <RouteLink
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {isMobile ? (
          <img src={logoIcon} alt="TechAway Logo" style={{ cursor: "pointer", height: "2rem" }} />
        ) : (
          <img src={logo} alt="TechAway Logo" style={{ cursor: "pointer", maxWidth: "12.5rem" }} />
        )}
      </RouteLink>
      <Box
        component="nav"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {isMobile ? (
          <>
            <Button
              startIcon={
                <Badge badgeContent={numberOfItemsInCart} color="error">
                  <ShoppingCartIcon />
                </Badge>
              }
              variant="text"
              sx={{ ml: "2rem" }}
              onClick={handleCart}
            >
              Cart
            </Button>
            <IconButton aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={handleClose}>
              <HeaderLinks userData={userData} />
            </Drawer>
          </>
        ) : (
          <>
            <HeaderLinks userData={userData} />
            <Button
              startIcon={
                <Badge badgeContent={numberOfItemsInCart} color="error">
                  <ShoppingCartIcon />
                </Badge>
              }
              variant="text"
              sx={{ ml: "2rem" }}
              onClick={handleCart}
            >
              Cart
            </Button>
          </>
        )}
      </Box>
      <Popper
        id="shopping-cart-popper"
        open={!!anchorEl}
        anchorEl={anchorEl}
        placement="bottom-end"
        sx={{
          zIndex: 5000,
        }}
      >
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
              <Box key={item.id} sx={{ marginBottom: "1rem" }}>
                <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
                  <Grid item xs={12} md={9}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2">Due: {format(item.priorityDueDate, "Do MMM yyyy")}</Typography>
                    <Typography variant="body2">{item.note || ""}</Typography>
                    <Typography variant="body1">Price: ${item.price}</Typography>
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
                onClick={handleCartClose}
              >
                Go to Checkout <ShoppingCartCheckoutIcon sx={{ ml: "0.5rem" }} />
              </Button>
            )}
          </Box>
        </Paper>
      </Popper>
    </Stack>
  );
};

export default Header;
