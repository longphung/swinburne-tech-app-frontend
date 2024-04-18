import styled from "@emotion/styled";
import { Box, Stack, Link, AppBar } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";

import logo from "../assets/logo.png";

const Item = styled.li`
  list-style-type: none;
`;

const Header = () => {
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
      <RouteLink to="/" style={{
        display: "flex",
        alignItems: "center",
      }}>
        <img
          src={logo}
          alt="TechAway Logo"
          style={{ cursor: "pointer", maxWidth: "12.5rem" }}
        />
      </RouteLink>
      <Box
        component="nav"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          component="ul"
          direction="row"
          gap="3rem"
          sx={{ fontWeight: "bold" }}
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
          <Item>
            <Link
              component={RouteLink}
              sx={{
                textUnderlineOffset: 4,
                textDecorationThickness: 2,
              }}
              color="black"
              underline="hover"
              to="/Login"
            >
              Login
            </Link>
          </Item>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Header;
