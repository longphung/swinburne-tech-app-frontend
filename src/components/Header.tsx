import styled from "@emotion/styled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Stack, Link, AppBar, Badge } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";

import logo from "../assets/logo.png";
import { useGetIdentity } from "@refinedev/core";
import Button from "@mui/material/Button";
import { useCart } from "@/components/Providers/CartProvider";
import { UserData } from "@/interfaces";

const Item = styled.li`
  list-style-type: none;
`;

const Header = () => {
  const { data: userData } = useGetIdentity<UserData>();
  const cart = useCart();
  const numberOfItemsInCart = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Stack
      component={AppBar}
      sx={{
        bgcolor: "white",
        justifyContent: "space-between",
        padding: "1rem 8rem",
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
        <img src={logo} alt="TechAway Logo" style={{ cursor: "pointer", maxWidth: "12.5rem" }} />
      </RouteLink>
      <Box
        component="nav"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack component="ul" direction="row" gap="3rem" sx={{ fontWeight: "bold" }}>
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
        <Button
          startIcon={
            <Badge badgeContent={numberOfItemsInCart} color="error">
              <ShoppingCartIcon />
            </Badge>
          }
          variant="text"
          sx={{ ml: "2rem", mr: "-2rem" }}
          component={RouteLink}
          to="/cart"
        >
          Cart
        </Button>
      </Box>
    </Stack>
  );
};

export default Header;
