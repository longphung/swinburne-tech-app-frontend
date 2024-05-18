import React from "react";
import { CanAccess, useGetIdentity } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Link as RouterLink, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Breadcrumbs, FormControl, InputLabel, Link, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import UsersSelect from "@/components/UsersSelect";
import { Ticket, TICKET_STATUS, URGENCY, UserData, USERS_ROLE } from "@/interfaces";
import { customerFields, technicianFields } from "@/utils/accessControlProvider";

// eslint-disable-next-line max-lines-per-function
const TicketsEdit = () => {
  const { data: userData } = useGetIdentity<UserData>();
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
    let dataToSend = {} as Ticket;
    if (userData?.role.includes(USERS_ROLE.ADMIN)) {
      dataToSend = data as Ticket;
    } else if (userData?.role.includes(USERS_ROLE.CUSTOMER)) {
      dataToSend = customerFields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: data[field],
        }),
        {},
      ) as Ticket;
    } else if (userData?.role.includes(USERS_ROLE.TECHNICIAN)) {
      dataToSend = technicianFields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: data[field],
        }),
        {},
      ) as Ticket;
    }
    onFinish(dataToSend);
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
          <CanAccess
            resource="tickets"
            action="edit"
            params={{
              field: "customerId",
            }}
            fallback={<Typography variant="h6">Customer: {ticketData.customerId?.name}</Typography>}
          >
            <UsersSelect
              name="customerId"
              control={control as never}
              label="Customer"
              resource={USERS_ROLE.CUSTOMER}
              error={errors.customerId ? (errors.customerId.message as string) : ""}
            />
          </CanAccess>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CanAccess
            resource="tickets"
            action="edit"
            params={{
              field: "assignedTo",
            }}
            fallback={<Typography variant="h6">Service Engineer: {ticketData.assignedTo?.name}</Typography>}
          >
            <UsersSelect
              name="assignedTo"
              control={control as never}
              label="Service Engineer"
              resource={USERS_ROLE.TECHNICIAN}
              error={errors.assignedTo ? (errors.assignedTo.message as string) : ""}
            />
          </CanAccess>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CanAccess
            resource="tickets"
            action="edit"
            params={{
              field: "status",
            }}
            fallback={<Typography variant="h6">Status: {TICKET_STATUS[ticketData.status]}</Typography>}
          >
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
          </CanAccess>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Service:
          </Typography>
          <Typography variant="body1">{ticketData.serviceId?.title}</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CanAccess
            resource="tickets"
            action="edit"
            params={{
              field: "urgency",
            }}
            fallback={<Typography variant="h6">Urgency: {ticketData.urgency}</Typography>}
          >
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
          </CanAccess>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CanAccess
            resource="tickets"
            action="edit"
            params={{
              field: "location",
            }}
            fallback={<Typography variant="h6">Location: {ticketData.location}</Typography>}
          >
            <TextField
              {...register("location")}
              value={ticketData.location ?? ''}
              label="Location"
              error={Boolean(errors.location)}
              helperText={errors.location ? (errors.location.message as string) : ""}
              type="text"
              placeholder="Location"
              fullWidth
            />
          </CanAccess>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CanAccess
            resource="tickets"
            action="edit"
            params={{
              field: "noteCustomer",
            }}
            fallback={<Typography variant="h6">Customer Notes: {ticketData.noteCustomer}</Typography>}
          >
            <TextField
              {...register("noteCustomer")}
              value={ticketData.noteCustomer ?? ''}
              label="Customer Notes"
              error={Boolean(errors.noteCustomer)}
              helperText={errors.noteCustomer ? (errors.noteCustomer.message as string) : ""}
              type="text"
              placeholder="Customer Notes"
              fullWidth
              multiline
              rows={4}
            />
          </CanAccess>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <CanAccess
            resource="tickets"
            action="edit"
            params={{
              field: "noteTechnician",
            }}
            fallback={<Typography variant="h6">Technician Notes: {ticketData.noteTechnician}</Typography>}
          >
            <TextField
              {...register("noteTechnician")}
              value={ticketData.noteTechnician ?? ''}
              label="Technician Notes"
              error={Boolean(errors.noteTechnician)}
              helperText={errors.noteTechnician? (errors.noteTechnician.message as string) : ""}
              type="text"
              placeholder="Customer Notes"
              fullWidth
              multiline
              rows={4}
            />
          </CanAccess>
        </Grid>
      </Grid>
    </Edit>
  );
};

export default TicketsEdit;
