import React from "react";
import { Controller } from "react-hook-form";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Link as RouterLink, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Breadcrumbs, FormControl, InputLabel, Link, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import UsersSelect from "@/components/UsersSelect";
import { Ticket, URGENCY, USERS_ROLE } from "@/interfaces";

const TicketsEdit = () => {
  const { id } = useParams();
  const {
    refineCore: { queryResult, onFinish },
    handleSubmit,
    register,
    saveButtonProps,
    control,
    formState: { errors },
  } = useForm<Ticket>({
    defaultValues: {
      status: "NOT_STARTED",
      urgency: "",
    },
    refineCoreProps: {
      action: "edit",
      resource: "tickets",
      id,
    },
  });

  const ticketData = queryResult?.data?.data || ({} as Ticket);

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

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
    // onFinish(data);
  });

  return (
    <Edit
      saveButtonProps={{
        ...saveButtonProps,
        onClick: onSubmit,
      }}
      breadcrumb={breadcrumb}
      title={<Typography variant="h5">Edit Ticket</Typography>}
    >
      <Grid container spacing={2} component="form" onSubmit={onSubmit}>
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
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  id="status-select"
                  value={field.value}
                  label="Status"
                  onChange={(e) => {
                    if (e.target.value === "") {
                      field.onChange(null);
                      return;
                    }
                    field.onChange(e.target.value);
                  }}
                  ref={field.ref}
                >
                  <MenuItem key="none" value="">
                    None
                  </MenuItem>
                  {[
                    {
                      label: "Not Started",
                      id: "NOT_STARTED",
                    },
                    {
                      label: "Open",
                      id: "OPEN",
                    },
                    {
                      label: "Queries Client",
                      id: "QUERIES_CLIENT",
                    },
                    {
                      label: "Queries External",
                      id: "QUERIES_EXTERNAL",
                    },
                    {
                      label: "Complete",
                      id: "COMPLETE",
                    },
                  ].map((x) => (
                    <MenuItem key={x.id} value={x.id}>
                      {x.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Service:
          </Typography>
          <Typography variant="body1">{ticketData.serviceId?.title}</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth>
            <InputLabel>Urgency</InputLabel>
            <Controller
              control={control}
              name="urgency"
              render={({ field }) => (
                <Select
                  id="urgency-select"
                  value={field.value}
                  label="Urgency"
                  onChange={(e) => {
                    if (e.target.value === "") {
                      field.onChange(null);
                      return;
                    }
                    field.onChange(e.target.value);
                  }}
                  ref={field.ref}
                >
                  <MenuItem key="none" value="">
                    None
                  </MenuItem>
                  {[
                    {
                      label: "Planned",
                      id: URGENCY.PLANNED,
                    },
                    {
                      label: "Low",
                      id: URGENCY.LOW,
                    },
                    {
                      label: "Medium",
                      id: URGENCY.MEDIUM,
                    },
                    {
                      label: "High",
                      id: URGENCY.HIGH,
                    },
                    {
                      label: "Critical",
                      id: URGENCY.CRITICAL,
                    },
                  ].map((x) => (
                    <MenuItem key={x.id} value={x.id}>
                      {x.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            {...register("location")}
            label="Location"
            error={Boolean(errors.location)}
            helperText={errors.location ? (errors.location.message as string) : ""}
            type="text"
            placeholder="Location"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            {...register("note", { required: true })}
            label="Notes"
            error={Boolean(errors.note)}
            helperText={errors.note ? (errors.note.message as string) : ""}
            type="text"
            placeholder="Notes"
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </Edit>
  );
};

export default TicketsEdit;
