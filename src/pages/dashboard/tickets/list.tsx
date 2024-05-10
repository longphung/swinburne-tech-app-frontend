import { List, useDataGrid } from "@refinedev/mui";
import { ComponentProps } from "react";
import { format } from "date-fns";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { SLAData, TICKET_STATUS, Tickets } from "@/interfaces";
import DataGridActionCell from "@/components/DataGridActionCell";

const TicketsList = () => {
  const navigate = useNavigate();
  const { dataGridProps } = useDataGrid<Tickets>({
    resource: "tickets",
  });
  const breadcrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
        Dashboard
      </Link>
      <Typography>Tickets</Typography>
    </Breadcrumbs>
  );

  const handleRowClick: ComponentProps<typeof DataGrid>["onRowClick"] = (params) => {
    navigate(`/dashboard/tickets/${params.id}`);
  };
  return (
    <List title="Tickets" breadcrumb={breadcrumb} canCreate={false}>
      <DataGrid
        {...dataGridProps}
        onRowClick={handleRowClick}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          {
            field: "customerId",
            headerName: "Customer",
            width: 250,
            renderCell: (params) => (
              <Link component={RouterLink} to={`/dashboard/users/${params.row.customerId._id}/edit`}>
                {params.row.customerId.name}
              </Link>
            ),
          },
          {
            field: "status",
            headerName: "Status",
            width: 150,
            valueGetter: (params) => TICKET_STATUS[params.row.status as keyof typeof TICKET_STATUS],
          },
          {
            field: "serviceId",
            headerName: "Service",
            width: 250,
            renderCell: (params) => (
              <Link component={RouterLink} to={`/dashboard/services/${params.row.serviceId._id}/edit`}>
                {params.row.serviceId.title}
              </Link>
            ),
          },
          {
            field: "urgency",
            headerName: "Urgency",
            width: 150,
          },
          {
            field: "location",
            headerName: "Location",
            width: 250,
          },
          {
            field: "assignedTo",
            headerName: "Assigned To",
            width: 250,
            renderCell: (params) =>
              params.row.assignedTo?._id && (
                <Link component={RouterLink} to={`/dashboard/users/${params.row.assignedTo._id}/edit`}>
                  {params.row.assignedTo.name}
                </Link>
              ),
          },
          {
            field: "modifiers",
            headerName: "Modifiers",
            width: 250,
            renderCell: (params) => (
              <span>
                {params.row.modifiers.map((modifier: SLAData) => (
                  <span key={modifier.id}>
                    {modifier.description}
                    <br />
                  </span>
                ))}
              </span>
            ),
          },
          {
            field: "note",
            headerName: "Note",
            width: 250,
          },
          {
            field: "refundFlag",
            headerName: "Refund Flag",
            width: 150,
          },
          {
            field: "createdAt",
            headerName: "Created At",
            width: 150,
            renderCell: (params) => format(new Date(params.value), "do MMM yyyy"),
          },
          {
            field: "updatedAt",
            headerName: "Updated At",
            width: 150,
            renderCell: (params) => format(new Date(params.value), "do MMM yyyy"),
          },
          {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            renderCell: (params) => <DataGridActionCell id={params.row.id} resource="tickets" />,
          },
        ]}
        sx={{
          // disable cell selection style
          ".MuiDataGrid-cell:focus": {
            outline: "none",
          },
          // pointer cursor on ALL rows
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
          },
        }}
      />
    </List>
  );
};

export default TicketsList;
