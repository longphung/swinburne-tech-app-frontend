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
      <RouteLink to="/">
        <img src={logo} alt="TechAway Logo" style={{ cursor: "pointer" }} />
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
              to="/dashboard"
            >
              Dashboard
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
              to="/schedule"
            >
              Schedule
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
              to="/tickets"
            >
              Tickets
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
              to="/shop"
            >
              Shop
            </Link>
          </Item>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Header;
