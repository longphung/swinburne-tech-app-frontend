/* eslint-disable react/prop-types */
import React, { FC } from "react";
import { Edit } from "@refinedev/mui";
import Typography from "@mui/material/Typography";
import { useForm } from "@refinedev/react-hook-form";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { UserData, USERS_ROLE } from "@/utils/authProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";

interface Props {
  titleText?: string;
  userData: UserData;
}

const EditUser: FC<Props> = (props) => {
  const { userData, titleText = "User Edit" } = props;
  const {
    saveButtonProps,
    refineCore: { onFinish, autoSaveProps },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: userData.address,
      email: userData.email,
      emailVerified: userData.emailVerified,
      name: userData.name,
      phone: userData.phone,
      username: userData.username,
    },
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
      resource: "users",
      id: userData.id,
      action: "edit",
      onMutationSuccess: ({ data }) => {
        // set new id token
        localStorage.setItem("idToken", data as unknown as string);
      },
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (userData.role !== USERS_ROLE.ADMIN) {
      // @ts-expect-error - regular users cannot edit emailVerified
      delete data.emailVerified;
    }
    onFinish(data);
  });
  return (
    <Edit
      resource="users"
      recordItemId={userData.id}
      autoSaveProps={autoSaveProps}
      title={<Typography variant="h5">{titleText}</Typography>}
      canDelete={
        userData.role.includes(USERS_ROLE.ADMIN) ||
        userData.role.includes(USERS_ROLE.CUSTOMER)
      }
      goBack={null}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: onSubmit,
      }}
    >
      <Stack component="form" onSubmit={onSubmit} spacing={2}>
        <Grid container>
          {userData.role.includes(USERS_ROLE.ADMIN) && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="emailVerified"
                    control={control}
                    render={({ field: props }) => (
                      <Checkbox
                        {...props}
                        checked={props.value}
                        onChange={(e) => props.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label="Email Verified"
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6} display="flex" justifyContent="center">
            <TextField
              {...register("username", {
                required: "Username is required",
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
                margin: "1rem",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
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
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <TextField
              {...register("address", {
                required: "Address is required",
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
                margin: "1rem",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
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
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
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
        </Grid>
      </Stack>
    </Edit>
  );
};

export default EditUser;
