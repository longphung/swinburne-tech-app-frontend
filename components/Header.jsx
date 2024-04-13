"use client";

import NextLink from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import styled from "@emotion/styled";
import { Box, Stack, Link, AppBar } from "@mui/material";

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
      <NextLink href="/">
        <Image src={logo} alt="TechAway Logo" width={277} height={57} />
      </NextLink>
      <Box component="nav">
        <Stack
          component="ul"
          direction="row"
          gap="3rem"
          sx={{ fontWeight: "bold" }}
        >
          <Item>
            <Link
              component={NextLink}
              sx={{
                textUnderlineOffset: 4,
                textDecorationThickness: 2,
              }}
              color="black"
              underline="hover"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </Item>
          <Item>
            <Link
              component={NextLink}
              sx={{
                textUnderlineOffset: 4,
                textDecorationThickness: 2,
              }}
              color="black"
              underline="hover"
              href="/schedule"
            >
              Schedule
            </Link>
          </Item>
          <Item>
            <Link
              component={NextLink}
              sx={{
                textUnderlineOffset: 4,
                textDecorationThickness: 2,
              }}
              color="black"
              underline="hover"
              href="/tickets"
            >
              Tickets
            </Link>
          </Item>
          <Item>
            <Link
              component={NextLink}
              sx={{
                textUnderlineOffset: 4,
                textDecorationThickness: 2,
              }}
              color="black"
              underline="hover"
              href="/shop"
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
