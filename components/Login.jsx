"use client";

import {
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

/**
 * @param {{
 *   title: string;
 * }} props
 * @returns {JSX.Element}
 */
const Login = (props) => {
  return (
    <Paper elevation={3} component="form">
      <Stack
        sx={{
          padding: "1rem",
        }}
        spacing={4}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {props.title}
        </Typography>
        <TextField label="Username" />
        <TextField label="Password" />
        <Link component={NextLink} href="/forgot">
          Forgot password?
        </Link>
        <Button variant="contained">Login</Button>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography>Don't have an account?</Typography>
          <Link component={NextLink} href="/register">
            Sign up
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Login;
