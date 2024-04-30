import styled from "@emotion/styled";
import Drawer from "@mui/material/Drawer";
import { MouseEventHandler, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Badge, Box, IconButton, Link, Popper, Stack, Theme, useMediaQuery } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import { useGetIdentity } from "@refinedev/core";
import Button from "@mui/material/Button";

import logoIcon from "@/assets/logo-icon.png";
import logo from "../assets/logo.png";
import { useCart } from "@/components/Providers/CartProvider";
import { UserData } from "@/interfaces";
import CartPopup from "@/components/CartPopup";

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
        <CartPopup onClose={handleCartClose} />
      </Popper>
    </Stack>
  );
};

export default Header;
