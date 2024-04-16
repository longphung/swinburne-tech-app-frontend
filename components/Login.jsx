"use client";

import { Button, Link, Paper, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { useForm } from "@refinedev/react-hook-form";
import FormInputText from "@/components/form-components/FormInputText";
import axios from "axios";

/**
 * @param {{
 *   title: string;
 * }} props
 * @returns {JSX.Element}
 */
const Login = (props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await axios.post("/api/auth/login/password", data);
    console.log(result);
  };

  return (
    <Paper elevation={3} component="form" onSubmit={handleSubmit(onSubmit)}>
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
        <FormInputText
          name="username"
          control={control}
          label="Username"
          rules={{
            required: "Please enter your username.",
          }}
        />
        <FormInputText
          name="password"
          control={control}
          label="Password"
          rules={{
            required: "Please enter your password.",
          }}
          type="password"
        />
        <Link component={NextLink} href="/forgot">
          Forgot password?
        </Link>
        <Button variant="contained" type="submit">
          Login
        </Button>
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
