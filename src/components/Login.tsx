import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import { FormProvider } from "react-hook-form";
import {
  LoginPageProps,
  LoginFormTypes,
  useActiveAuthProvider,
  BaseRecord,
  HttpError,
  useLogin,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
  useNotification,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";
import { sendConfirmationEmail } from "@/api/backend";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

type LoginProps = LoginPageProps<BoxProps, CardContentProps>;

/**
 * login will be used as the default type of the <AuthPage> component. The login page will be used to log in to the system.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#login} for more details.
 */
// eslint-disable-next-line max-lines-per-function
const Login: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const { open } = useNotification();
  const [showDialog, setShowDialog] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const { onSubmit, ...useFormProps } = formProps || {};
  const methods = useForm<
    BaseRecord,
    HttpError,
    LoginFormTypes & {
      username: string;
    }
  >({
    ...useFormProps,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          fontSize: "20px",
        }}
      >
        {title ?? (
          <ThemedTitleV2
            collapsed={false}
            wrapperStyles={{
              gap: "8px",
            }}
          />
        )}
      </div>
    );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={1}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {providers.map((provider: any) => {
              return (
                <Button
                  key={provider.name}
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: "primary.light",
                    borderColor: "primary.light",
                    textTransform: "none",
                  }}
                  onClick={() => login({ providerName: provider.name })}
                  startIcon={provider.icon}
                >
                  {provider.label}
                </Button>
              );
            })}
          </Stack>
          {!hideForm && (
            <Divider
              sx={{
                fontSize: "12px",
                marginY: "16px",
              }}
            >
              {translate("pages.login.divider", "or")}
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="primary"
          fontWeight={700}
          sx={{
            mb: "1rem",
          }}
        >
          {translate("pages.login.title", "Sign in to your account")}
        </Typography>
        {renderProviders()}
        {!hideForm && (
          <Box
            component="form"
            onSubmit={handleSubmit((data) => {
              if (onSubmit) {
                // @ts-expect-error This is a valid check
                return onSubmit(data);
              }

              return login(data, {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSuccess: (result: any) => {
                  if (result.success) return;
                  if (result.error.message === "Email not verified") {
                    setShowDialog(true);
                  }
                },
              });
            })}
          >
            <TextField
              {...register("username", {
                required: true,
              })}
              id="username"
              margin="normal"
              fullWidth
              label="Username"
              error={!!errors.username}
              name="username"
              type="username"
              autoComplete="username"
              sx={{
                mt: 0,
              }}
            />
            <TextField
              {...register("password", {
                required: true,
              })}
              id="password"
              margin="normal"
              fullWidth
              name="password"
              label={translate("pages.login.fields.password", "Password")}
              helperText={errors?.password?.message}
              error={!!errors.password}
              type="password"
              placeholder="●●●●●●●●"
              autoComplete="current-password"
              sx={{
                mb: 0,
              }}
            />
            <Box
              component="div"
              sx={{
                mt: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {rememberMe ?? (
                <FormControlLabel
                  sx={{
                    span: {
                      fontSize: "14px",
                      color: "text.secondary",
                    },
                  }}
                  color="secondary"
                  control={
                    <Checkbox
                      size="small"
                      id="remember"
                      {...register("remember")}
                    />
                  }
                  label={translate(
                    "pages.login.buttons.rememberMe",
                    "Remember me",
                  )}
                />
              )}
              {forgotPasswordLink ?? (
                <MuiLink
                  variant="body2"
                  color="primary"
                  fontSize="12px"
                  component={ActiveLink}
                  underline="none"
                  to="/forgot-password"
                >
                  {translate(
                    "pages.login.buttons.forgotPassword",
                    "Forgot password?",
                  )}
                </MuiLink>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: "24px" }}
            >
              {translate("pages.login.signin", "Sign in")}
            </Button>
          </Box>
        )}
        {registerLink ?? (
          <Box
            sx={{
              mt: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              textAlign="center"
              variant="body2"
              component="span"
              fontSize="12px"
            >
              {translate(
                "pages.login.buttons.noAccount",
                "Don’t have an account?",
              )}
            </Typography>
            <MuiLink
              ml="4px"
              fontSize="12px"
              variant="body2"
              color="primary"
              component={ActiveLink}
              underline="none"
              to="/register"
              fontWeight="bold"
            >
              {translate("pages.login.signup", "Sign up")}
            </MuiLink>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <FormProvider {...methods}>
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
            {renderContent ? (
              renderContent(Content, PageTitle)
            ) : (
              <>
                {PageTitle}
                {Content}
              </>
            )}
          </Box>
        </Container>
      </Box>
      <Dialog
        open={showDialog}
        onClose={(_, reason) => {
          if (
            (reason === "backdropClick" || reason === "escapeKeyDown") &&
            sendingEmail
          )
            return;
          setShowDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Your account is not verified. Resend verification email?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please verify your email to login.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={sendingEmail} onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <LoadingButton
            loading={sendingEmail}
            onClick={async () => {
              try {
                setSendingEmail(true);
                await sendConfirmationEmail(methods.getValues("username"));
                open!({
                  message: "Confirmation email sent",
                  description: "Please confirm your email to login.",
                  type: "success",
                });
              } catch (e) {
                open!({
                  message: "Error",
                  description: (e as Error).message,
                  type: "error",
                });
              } finally {
                setSendingEmail(false);
                setShowDialog(false);
              }
            }}
            autoFocus
          >
            Ok
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default Login;
