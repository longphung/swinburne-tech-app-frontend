import { List, useDataGrid } from "@refinedev/mui";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Chip, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import DataGridActionCell from "@/components/DataGridActionCell";
import Button from "@mui/material/Button";
import { getOrderPDFInvoice } from "@/api/backend";

const DownloadInvoiceButton = ({ id }: { id: string }) => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        getOrderPDFInvoice(id).then((res) => {
          window.open(res);
        });
      }}
      startIcon={<ReceiptIcon />}
    >
      Generate Invoice
    </Button>
  );
};

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
    <List title="Orders" breadcrumb={breadCrumb} canCreate={false}>
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
          {
            field: "customer",
            headerName: "Customer",
            width: 250,
            renderCell: (params) => (
              <Link component={RouterLink} to={`/dashboard/users/${params.row.customerId._id}/edit`}>
                {params.row.customerId.name}
              </Link>
            ),
          },
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
                {params.row.tickets.map((ticket: { _id: string; service: string }) => (
                  <Box key={ticket._id}>
                    <Link component={RouterLink} to={`/dashboard/services/${ticket._id}`}>
                      {ticket.service}
                    </Link>
                  </Box>
                ))}
              </Stack>
            ),
          },
          {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => {
              return params.value === "completed" ? (
                <Chip color="success" label="Completed" />
              ) : params.value === "pending" ? (
                <Chip color="warning" label="Pending" />
              ) : (
                <Chip color="error" label="Cancelled" />
              );
            },
          },
          {
            field: "download",
            headerName: "Download Invoice",
            type: "actions",
            width: 250,
            renderCell: (params) => <DownloadInvoiceButton id={params.row.id} />,
          },
          {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            renderCell: (params) => <DataGridActionCell id={params.row.id} resource="orders" canShow />,
          },
        ]}
        getRowHeight={() => "auto"}
      />
    </List>
  );
};

export default OrdersList;
