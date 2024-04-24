import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useGetIdentity } from "@refinedev/core";
import { UserData, USERS_ROLE } from "@/interfaces";

const UsersCreate = () => {
  const {
    saveButtonProps,
    handleSubmit,
    register,
    control,
    formState: { errors },
    refineCore: { onFinish },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: USERS_ROLE.CUSTOMER,
      name: "",
      phone: "",
      address: "",
      emailVerified: false,
      username: "",
    },
    refineCoreProps: {
      resource: "users",
      action: "create",
    },
  });
  const { data: userData } = useGetIdentity<UserData>();

  const breadCrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Dashboard
      </Link>
      <Link underline="hover" color="inherit" href="/dashboard/users">
        Users
      </Link>
      <Typography color="text.primary">Breadcrumbs</Typography>
    </Breadcrumbs>
  );

  const onSubmit = handleSubmit((data) => {
    onFinish(data);
  });

  return (
    (<Create
      resource="users"
      breadcrumb={breadCrumb}
      saveButtonProps={saveButtonProps}
      title={
        <Typography variant="h5">Create User</Typography>
      }
    >
      <Stack component="form" onSubmit={onSubmit} spacing={2}>
        <Grid container>
          {userData?.role.includes(USERS_ROLE.ADMIN) && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="emailVerified"
                    control={control}
                    render={({ field: props }) => (
                      <Checkbox
                        {...props}
                        // eslint-disable-next-line react/prop-types
                        checked={props.value}
                        // eslint-disable-next-line react/prop-types
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
    </Create>)
  );
};

export default UsersCreate;
