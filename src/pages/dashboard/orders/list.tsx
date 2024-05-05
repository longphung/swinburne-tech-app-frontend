import { List, useDataGrid } from "@refinedev/mui";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Chip, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const OrdersList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "orders",
  });

  const breadCrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
        Dashboard
      </Link>
      <Typography>Orders</Typography>
    </Breadcrumbs>
  );

  return (
    <List title="Orders" breadcrumb={breadCrumb}>
      <DataGrid
        {...dataGridProps}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          {
            field: "createdAt",
            headerName: "Created At",
            width: 150,
            renderCell: (params) => format(new Date(params.value), "do MMM yyyy"),
          },
          { field: "customer", headerName: "Customer", width: 250, renderCell: (params) => params.row.customerId.name },
          {
            field: "grandTotal",
            headerName: "Amount",
            width: 150,
            type: "number",
            renderCell: (params) =>
              Intl.NumberFormat("en-AU", {
                style: "currency",
                currency: "AUD",
                minimumFractionDigits: 2,
              }).format(params.value),
          },
          {
            field: "tickets",
            headerName: "Services",
            width: 250,
            renderCell: (params) => (
              <Stack spacing={2} sx={{ py: "1rem" }}>
                {params.row.tickets.map((ticket: { id: string; service: string }) => (
                  <Box key={ticket.id}>
                    <Link component={RouterLink} to={`/dashboard/services/${ticket.id}`}>
                      {ticket.service}
                    </Link>
                  </Box>
                ))}
              </Stack>
            ),
          },
          {
            field: "processed",
            headerName: "Status",
            width: 150,
            renderCell: (params) => {
              return params.value ? <Chip color="success" label="Processed" /> : <Chip color="warning" label="Pending" />;
            },
          },
        ]}
        getRowHeight={() => "auto"}
      />
    </List>
  );
};

export default OrdersList;
