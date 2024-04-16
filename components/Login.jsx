"use client";

import { LoadingButton } from "@mui/lab";
import { Link, Paper, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { useForm } from "@refinedev/react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";

import FormInputText from "@/components/form-components/FormInputText";

/**
 * @param {{
 *   title: string;
 * }} props
 * @returns {JSX.Element}
 */
const Login = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("/api/auth/login/password", data);
    } catch (e) {
      console.error(e);
      if (e.response.status === 401) {
        const message = "Invalid username or password.";
        enqueueSnackbar(message, {
          variant: "error",
        });
        setError("username", {
          type: "manual",
          message,
        });
        setError("password", {
          type: "manual",
          message,
        });
      }
    }
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
        <LoadingButton
          loading={isSubmitting}
          loadingPosition="start"
          variant="contained"
          type="submit"
        >
          Login
        </LoadingButton>
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
