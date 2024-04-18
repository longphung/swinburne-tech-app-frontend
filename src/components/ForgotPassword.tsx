import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import {
  ForgotPasswordFormTypes,
  ForgotPasswordPageProps,
  BaseRecord,
  HttpError,
  useForgotPassword,
  useLink,
  useRouterContext,
  useRouterType,
  useTranslate,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";

type ForgotPasswordProps = ForgotPasswordPageProps<BoxProps, CardContentProps>;

/**
 * The forgotPassword type is a page that allows users to reset their passwords. You can use this page to reset your password.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#forgot-password} for more details.
 */
const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    BaseRecord,
    HttpError,
    ForgotPasswordFormTypes & {
      username: string;
    }
  >({
    ...useFormProps,
  });

  const { mutate, isLoading } = useForgotPassword<ForgotPasswordFormTypes>();
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
          marginBottom: "32px",
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
          {translate("pages.forgotPassword.title", "Forgot your password?")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              // @ts-expect-error onSubmit is a function
              return onSubmit(data);
            }

            return mutate(data);
          })}
        >
          <TextField
            {...register("username", {
              required: "Username is required",
            })}
            id="username"
            margin="normal"
            fullWidth
            label={translate("pages.forgotPassword.fields.username", "Username")}
            name="username"
            type="text"
            error={!!errors.username}
            autoComplete="email"
            sx={{
              m: 0,
            }}
          />
          {loginLink ?? (
            <Box textAlign="right" sx={{ mt: "24px" }}>
              <Typography variant="body2" component="span" fontSize="12px">
                {translate(
                  "pages.register.buttons.haveAccount",
                  "Have an account?",
                )}
              </Typography>{" "}
              <MuiLink
                variant="body2"
                component={ActiveLink}
                underline="none"
                to="/login"
                fontWeight="bold"
                fontSize="12px"
                color="primary.light"
              >
                {translate("pages.login.signin", "Sign in")}
              </MuiLink>
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: "24px" }}
            disabled={isLoading}
          >
            {translate(
              "pages.forgotPassword.buttons.submit",
              "Send reset instructions",
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box component="div" {...(wrapperProps ?? {})}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100dvh",
            padding: "16px",
            width: "100%",
            maxWidth: "400px",
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
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;
