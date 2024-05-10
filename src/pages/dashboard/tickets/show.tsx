import React from "react";
import Stack from "@mui/material/Stack";
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
      // canDelete={userData?.role.includes(USERS_ROLE.ADMIN)}
      canEdit={userData?.role.includes(USERS_ROLE.ADMIN) || userData?.role.includes(USERS_ROLE.TECHNICIAN)}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" height={400} width="100%" />
      ) : (
        <Stack spacing={2}>
          <Typography variant="h6">ID: {ticketData.id}</Typography>
          <Typography variant="h6">Customer: {ticketData.customerId.name}</Typography>
          <Typography variant="h6">Status: {TICKET_STATUS[ticketData.status]}</Typography>
          <Typography variant="h6">Service: {ticketData.serviceId.title}</Typography>
          <Typography variant="h6">Urgency: {ticketData.urgency}</Typography>
          <Typography variant="h6">Location: {ticketData.location}</Typography>
          <Typography variant="h6">
            Assigned To: {ticketData.assignedTo ? ticketData.assignedTo.name : "Not assigned"}
          </Typography>
          <Typography variant="h6">
            Modifiers:
            <Box component="ul" sx={{ margin: 0 }}>
              {ticketData.modifiers.map((x) => (
                <li key={x.id}>
                  <Typography variant="body1">{x.description}</Typography>
                </li>
              ))}
            </Box>
          </Typography>
          <Typography variant="h6">Created At: {format(new Date(ticketData.createdAt), "do MMM yyyy")}</Typography>
          <Typography variant="h6">Updated At: {format(new Date(ticketData.updatedAt), "do MMM yyyy")}</Typography>
        </Stack>
      )}
    </Show>
  );
};

export default TicketsShow;
