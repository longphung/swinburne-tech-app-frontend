/* eslint-disable react/prop-types */
import { useGetIdentity, useInvalidate } from "@refinedev/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { FC } from "react";
import { Edit } from "@refinedev/mui";
import Typography from "@mui/material/Typography";
import { useForm } from "@refinedev/react-hook-form";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { UserData, USERS_ROLE } from "@/interfaces";

interface Props {
  titleText?: string;
  userData: UserData;
}

const EditUser: FC<Props> = (props) => {
  const { userData, titleText = "User Edit" } = props;
  const invalidate = useInvalidate();
  const { data: currUser, refetch } = useGetIdentity<UserData>();
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
      role: [userData.role],
    },
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
      resource: "users",
      id: userData.id,
      action: "edit",
      onMutationSuccess: ({ data }) => {
        if (userData.id === currUser?.id) {
          localStorage.setItem("idToken", data.token as unknown as string);
          refetch();
        }
        invalidate({
          resource: "users",
          id: userData.id,
          invalidates: ["resourceAll"],
        });
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
        currUser?.role.includes(USERS_ROLE.ADMIN) ||
        currUser?.role.includes(USERS_ROLE.CUSTOMER)
      }
      goBack={null}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: onSubmit,
      }}
    >
      <Stack component="form" onSubmit={onSubmit} spacing={2}>
        <Grid container>
          {currUser?.role.includes(USERS_ROLE.ADMIN) && (
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
          {currUser?.role.includes(USERS_ROLE.ADMIN) && (
            <Grid item xs={12} md={6} display="flex" justifyContent="center">
              <FormControl
                fullWidth
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem",
                }}
              >
                <InputLabel id="role">Role</InputLabel>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="role"
                      id="role"
                      multiple
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {Object.values([
                        USERS_ROLE.ADMIN,
                        USERS_ROLE.CUSTOMER,
                        USERS_ROLE.TECHNICIAN,
                      ]).map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  name="role"
                />
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Edit>
  );
};

export default EditUser;
