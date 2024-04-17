"use client";

import { LoadingButton } from "@mui/lab";
import { Link, Paper, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { useForm } from "@refinedev/react-hook-form";
import { useSnackbar } from "notistack";

import FormInputText from "@/components/form-components/FormInputText";
import { useLogin } from "@refinedev/core";


/**
 * @param {{
 *   title: string;
 *   onLogin: (data: {
 *     idToken: string;
 *     accessToken: string;
 *     refreshToken: string;
 *     expiresIn: string;
 *   }) => void;
 * }} props
 * @returns {JSX.Element}
 */
const Login = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: login } = useLogin();
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
    const result = await login({
      username: data.username,
      password: data.password,
    });
    if (result.success) {
      props.onLogin && props.onLogin(result.data);
      enqueueSnackbar(result.successNotification.message, {
        variant: "success",
      })
      return;
    }
    enqueueSnackbar(result.error.message, {
      variant: "error",
    });
    setError("username", {
      type: "manual",
      message: result.error.message,
    });
    setError("password", {
      type: "manual",
      message: result.error.message,
    });
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
        <LoadingButton loading={isSubmitting} variant="contained" type="submit">
          Login
        </LoadingButton>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography>Don&apos;t have an account?</Typography>
          <Link component={NextLink} href="/register">
            Sign up
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Login;
