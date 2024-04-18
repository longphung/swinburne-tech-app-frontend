import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import {
  RegisterPageProps,
  useActiveAuthProvider,
  BaseRecord,
  HttpError,
  useRouterContext,
  useRouterType,
  useLink,
  useRegister,
} from "@refinedev/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
// import { USERS_ROLE } from "@/utils/authProvider";
export const USERS_ROLE = {
  ADMIN: "admin",
  TECHNICIAN: "technician",
  CUSTOMER: "customer",
};

type RegisterProps = RegisterPageProps<BoxProps, CardContentProps>;

/**
 * The register page will be used to register new users. You can use the following props for the <AuthPage> component when the type is "register".
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#register} for more details.
 */
// eslint-disable-next-line max-lines-per-function
const Register: React.FC<RegisterProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  hideForm,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<
    BaseRecord,
    HttpError,
    {
      username: string;
      email: string;
      address: string;
      phone: string;
      password: string;
      confirmPassword: string;
      name: string;
    }
  >({
    ...useFormProps,
  });

  const authProvider = useActiveAuthProvider();
  const { mutate: registerMutate, isLoading } = useRegister<{
    username: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    role: string;
    name: string;
  }>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        {!hideForm && (
          <Stack
            component="form"
            onSubmit={handleSubmit((data) => {
              if (onSubmit) {
                // @ts-expect-error This is a legacy prop
                return onSubmit(data);
              }
              const { confirmPassword, ...rest } = data;
              return registerMutate({
                role: USERS_ROLE.CUSTOMER,
                ...rest,
              });
            })}
            spacing={2}
          >
            <Grid container>
              <Grid xs={12} md={6} display="flex" justifyContent="center">
                <TextField
                  {...register("username", {
                    required: "Username is required",
                  })}
                  id="username"
                  margin="normal"
                  fullWidth
                  name="username"
                  label="Username"
                  helperText={
                    errors["username"] ? errors["username"].message : ""
                  }
                  error={!!errors.username}
                  type="text"
                  placeholder="Username"
                  autoComplete="username"
                  sx={{
                    margin: "1rem",
                  }}
                />
              </Grid>
              <Grid xs={12} md={6} display="flex" justifyContent="center">
                <TextField
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  id="email"
                  margin="normal"
                  fullWidth
                  label={"Email"}
                  error={!!errors.email}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  name="email"
                  autoComplete="email"
                  type="email"
                  sx={{
                    margin: "1rem",
                  }}
                />
              </Grid>
              <Grid xs={12} md={6} display="flex" justifyContent="center">
                <TextField
                  {...register("address", {
                    required: "Address is required",
                  })}
                  id="address"
                  margin="normal"
                  fullWidth
                  name="address"
                  label={"Address"}
                  helperText={
                    errors["address"] ? errors["address"].message : ""
                  }
                  error={!!errors.address}
                  type="text"
                  autoComplete="street-address"
                  sx={{
                    margin: "1rem",
                  }}
                />
              </Grid>
              <Grid xs={12} md={6} display="flex" justifyContent="center">
                <TextField
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                  id="phone"
                  margin="normal"
                  fullWidth
                  name="phone"
                  label={"Phone"}
                  helperText={errors["phone"] ? errors["phone"].message : ""}
                  error={!!errors.phone}
                  type="text"
                  autoComplete="tel-local"
                  sx={{
                    margin: "1rem",
                  }}
                />
              </Grid>
              <Grid xs={12} md={6} display="flex" justifyContent="center">
                <TextField
                  {...register("name", {
                    required: "Name is required",
                  })}
                  id="name"
                  margin="normal"
                  fullWidth
                  name="name"
                  label="Name"
                  helperText={errors["name"] ? errors["name"].message : ""}
                  error={!!errors.name}
                  type="text"
                  autoComplete="name"
                  sx={{
                    margin: "1rem",
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                sx={{
                  padding: "1rem",
                }}
              >
                <Typography>
                  Password must contain at least 8 characters, 1 uppercase
                  letter, 1 lowercase letter, and 1 number.
                </Typography>
              </Grid>
              <Grid xs={12} md={6} display="flex" justifyContent="center">
                <TextField
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: (value) => {
                      if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least 1 uppercase letter";
                      }
                      if (!/[a-z]/.test(value)) {
                        return "Password must contain at least 1 lowercase letter";
                      }
                      if (!/[0-9]/.test(value)) {
                        return "Password must contain at least 1 number";
                      }
                      return true;
                    },
                  })}
                  id="password"
                  margin="normal"
                  fullWidth
                  name="password"
                  label={"Password"}
                  helperText={
                    errors["password"] ? errors["password"].message : ""
                  }
                  error={!!errors.password}
                  type="password"
                  autoComplete="off"
                  sx={{
                    margin: "1rem",
                  }}
                />
              </Grid>
              <Grid xs={12} md={6} display="flex" justifyContent="center">
                <TextField
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => {
                      return (
                        watch("password") === value || "Passwords do not match"
                      );
                    },
                  })}
                  id="confirmPassword"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label={"Confirm Password"}
                  helperText={
                    errors["confirmPassword"]
                      ? errors["confirmPassword"].message
                      : ""
                  }
                  error={!!errors.confirmPassword}
                  type="password"
                  autoComplete="off"
                  sx={{
                    margin: "1rem",
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: "24px",
                width: "100%",
                maxWidth: "400px",
                alignSelf: "center",
              }}
            >
              {"Sign up"}
            </Button>
          </Stack>
        )}
        {loginLink ?? (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              mt: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" component="span" fontSize="12px">
              Have an account?
            </Typography>
            <MuiLink
              ml="4px"
              variant="body2"
              color="primary"
              component={ActiveLink}
              underline="none"
              to="/dashboard/login"
              fontSize="12px"
              fontWeight="bold"
            >
              Sign in
            </MuiLink>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box component="div" {...(wrapperProps ?? {})}>
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: hideForm ? "flex-start" : "center",
          alignItems: "center",
          minHeight: "100dvh",
          padding: "16px",
          width: "100%",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: hideForm ? "15dvh" : 0,
            gap: "2rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Create an account
          </Typography>
          {renderContent ? renderContent(Content, null) : <>{Content}</>}
        </Stack>
      </Container>
    </Box>
  );
};

export default Register;
