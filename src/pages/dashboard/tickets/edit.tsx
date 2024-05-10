import React from "react";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Link as RouterLink, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Breadcrumbs, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import UsersSelect from "@/components/UsersSelect";
import { USERS_ROLE } from "@/interfaces";

const TicketsEdit = () => {
  const { id } = useParams();
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      action: "edit",
      resource: "tickets",
      id,
    },
  });

  const breadcrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
        Dashboard
      </Link>
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard/tickets">
        Tickets
      </Link>
      <Typography color="text.primary">Edit</Typography>
    </Breadcrumbs>
  );

  return (
    <Edit breadcrumb={breadcrumb} title={<Typography variant="h5">Edit Ticket</Typography>}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <UsersSelect name="customerId" control={control as never} label="Customer" resource={USERS_ROLE.CUSTOMER} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <UsersSelect
            name="assignedTo"
            control={control as never}
            label="Service Engineer"
            resource={USERS_ROLE.TECHNICIAN}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField {...register("status", { required: true })} label="Status" error={Boolean(errors.status)} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField {...register("serviceId", { required: true })} label="Service" error={Boolean(errors.serviceId)} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField {...register("urgency", { required: true })} label="Urgency" error={Boolean(errors.urgency)} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField {...register("location", { required: true })} label="Location" error={Boolean(errors.location)} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField {...register("note", { required: true })} label="Notes" error={Boolean(errors.note)} />
        </Grid>
      </Grid>
    </Edit>
  );
};

export default TicketsEdit;
