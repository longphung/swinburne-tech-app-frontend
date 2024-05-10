import React from "react";
import { useParams } from "react-router-dom";
import { Show } from "@refinedev/mui";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useOne } from "@refinedev/core";

import { Tickets } from "@/interfaces";

const TicketsShow = () => {
  const { id } = useParams();
  const { isLoading, data } = useOne<Tickets>({
    resource: "tickets",
    id,
  });

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

  console.log(data);

  return (
    <Show isLoading={isLoading} breadcrumb={breadcrumb}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {data?.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data?.description}
        </Typography>
      </Box>
    </Show>
  );
};

export default TicketsShow;
