import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import {
  UpdatePasswordFormTypes,
  UpdatePasswordPageProps,
  useActiveAuthProvider,
  BaseRecord,
  HttpError,
  useTranslate,
  useUpdatePassword,
} from "@refinedev/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";

type UpdatePasswordProps = UpdatePasswordPageProps<BoxProps, CardContentProps>;

/**
 * The updatePassword type is the page used to update the password of the user.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#update-password} for more details.
 */
const UpdatePassword: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
    ...useFormProps,
  });

  const authProvider = useActiveAuthProvider();
  const { mutate: update, isLoading } =
    useUpdatePassword<UpdatePasswordFormTypes>({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

  const translate = useTranslate();

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: "1rem",
          }}
        >
          Password Reset
        </Typography>
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
        >
          {translate("pages.updatePassword.title", "Set New Password")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              // @ts-expect-error This is a legacy prop
              return onSubmit(data);
            }
            return update({
              password: data.confirmPassword,
            });
          })}
        >
          <Typography
            sx={{
              my: "1rem",
            }}
          >
            Password must contain at least 8 characters, 1 uppercase letter, 1
            lowercase letter, and 1 number.
          </Typography>
          <TextField
            {...register("password", {
              required: true,
              validate: (value) => {
                if (!value) return "Password is required";
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
            label={translate(
              "pages.updatePassword.fields.password",
              "New Password",
            )}
            helperText={errors?.password?.message}
            error={!!errors?.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-password"
            sx={{
              m: 0,
            }}
          />

          <TextField
            {...register("confirmPassword", {
              required: true,
              validate: (value?: string) => {
                if (watch("password") !== value) {
                  return translate(
                    "pages.updatePassword.errors.confirmPasswordNotMatch",
                    "Passwords do not match",
                  );
                }
                return true;
              },
            })}
            id="confirmPassword"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label={translate(
              "pages.updatePassword.fields.confirmPassword",
              "Confirm New Password",
            )}
            helperText={errors?.confirmPassword?.message}
            error={!!errors?.confirmPassword}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-confirm-password"
            sx={{
              mb: 0,
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: "24px",
            }}
            disabled={isLoading}
          >
            {translate("pages.updatePassword.buttons.submit", "Update")}
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

export default UpdatePassword;
