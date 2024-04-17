import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import {
  RegisterFormTypes,
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

type RegisterProps = RegisterPageProps<BoxProps, CardContentProps>;

/**
 * The register page will be used to register new users. You can use the following props for the <AuthPage> component when the type is "register".
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#register} for more details.
 */
// eslint-disable-next-line max-lines-per-function
export const Register: React.FC<RegisterProps> = ({
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
    }
  >({
    ...useFormProps,
  });

  const authProvider = useActiveAuthProvider();
  const { mutate: registerMutate, isLoading } = useRegister<RegisterFormTypes>({
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
                // @ts-ignore
                return onSubmit(data);
              }

              return registerMutate(data);
            })}
            spacing={2}
          >
            <TextField
              {...register("username", {
                required: true,
              })}
              id="username"
              margin="normal"
              fullWidth
              name="username"
              label="Username"
              helperText={errors["username"] ? errors["username"].message : ""}
              error={!!errors.username}
              type="text"
              placeholder="Username"
              autoComplete="username"
              sx={{
                mb: 0,
              }}
            />
            <TextField
              {...register("email", {
                required: true,
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
              sx={{
                mt: 0,
              }}
            />
            <TextField
              {...register("address", {
                required: true,
              })}
              id="address"
              margin="normal"
              fullWidth
              name="address"
              label={"Address"}
              helperText={errors["address"] ? errors["address"].message : ""}
              error={!!errors.address}
              type="text"
              autoComplete="street-address"
              sx={{
                mb: 0,
              }}
            />
            <TextField
              {...register("phone", {
                required: true,
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
                mb: 0,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: "24px",
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
              to="/login"
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
          maxWidth: "400px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            paddingTop: hideForm ? "15dvh" : 0,
          }}
        >
          {renderContent ? renderContent(Content, null) : <>{Content}</>}
        </Box>
      </Container>
    </Box>
  );
};
