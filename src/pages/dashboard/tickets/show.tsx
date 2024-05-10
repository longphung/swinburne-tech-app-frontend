import React from "react";
import Grid from "@mui/material/Grid";
import { format } from "date-fns";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Show } from "@refinedev/mui";
import { Breadcrumbs, Link, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetIdentity, useOne } from "@refinedev/core";

import { TICKET_STATUS, Tickets, UserData, USERS_ROLE } from "@/interfaces";

const TicketsShow = () => {
  const { id } = useParams();
  const { data: userData } = useGetIdentity<UserData>();
  const { isLoading, data } = useOne<Tickets>({
    resource: "tickets",
    id,
  });
  const ticketData = data?.data || ({} as Tickets);

  const breadcrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
        Dashboard
      </Link>
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard/tickets">
        Tickets
      </Link>
      <Typography color="text.primary">Show</Typography>
    </Breadcrumbs>
  );

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={breadcrumb}
      title={<Typography variant="h5">Ticket Details</Typography>}
      resource="tickets"
      recordItemId={id}
      canEdit={userData?.role.includes(USERS_ROLE.ADMIN) || userData?.role.includes(USERS_ROLE.TECHNICIAN)}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" height={400} width="100%" />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ID:
            </Typography>
            <Typography variant="body1">{ticketData.id}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Customer:
            </Typography>
            <Typography variant="body1">{ticketData.customerId.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Service Engineer:
            </Typography>
            <Typography variant="body1">
              {ticketData.assignedTo ? ticketData.assignedTo.name : "Not assigned"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Status:
            </Typography>
            <Typography variant="body1">{TICKET_STATUS[ticketData.status]}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Service:
            </Typography>
            <Typography variant="body1">{ticketData.serviceId.title}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Notes:
            </Typography>
            <Typography variant="body1">{ticketData.note}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Urgency:
            </Typography>
            <Typography variant="body1">{ticketData.urgency}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Location:
            </Typography>
            <Typography variant="body1">{ticketData.location}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Modifiers:
            </Typography>
            <Box component="ul" sx={{ margin: 0 }}>
              {ticketData.modifiers.map((x) => (
                <li key={x.id}>
                  <Typography variant="body1">{x.description}</Typography>
                </li>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Created At:
            </Typography>
            <Typography variant="body1">{format(new Date(ticketData.createdAt), "do MMM yyyy")}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Updated At:
            </Typography>
            <Typography variant="body1">{format(new Date(ticketData.updatedAt), "do MMM yyyy")}</Typography>
          </Grid>
        </Grid>
      )}
    </Show>
  );
};

export default TicketsShow;
