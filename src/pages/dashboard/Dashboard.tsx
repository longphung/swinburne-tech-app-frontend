import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { Link } from "@mui/material";

import { getRevenueReport, getTechnicianReport } from "@/api/backend";

const Dashboard = () => {
  const loadingTechnicianReport = useRef(false);
  const loadingRevenueReport = useRef(false);
  const [tech, setTech] = useState<
    {
      _id: string;
      technician: { name: string };
      tickets: number;
      completedTickets: number;
    }[]
  >([]);
  const [revenue, setRevenue] = useState<
    Array<{
      _id: string;
      serviceName: string;
      ticketId: string;
      gross: number | null;
      total: number | null;
    }>
  >([]);

  const formatter = Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    if (!loadingTechnicianReport.current) {
      loadingTechnicianReport.current = true;
      getTechnicianReport().then((data) => {
        setTech(
          data.map((x) => ({
            ...x,
            tickets: x.tickets[0],
          })),
        );
        loadingTechnicianReport.current = false;
      });
    }
    if (!loadingRevenueReport.current) {
      loadingRevenueReport.current = true;
      getRevenueReport().then((data) => {
        const revenue: {
          _id: string;
          serviceName: string;
          ticketId: string;
          gross: number | null;
          total: number | null;
        }[] = [];
        data.forEach((x) => {
          revenue.push({
            _id: x._id,
            serviceName: x._id,
            ticketId: "",
            gross: null,
            total: x.total.$numberDecimal,
          });
          x.tickets.flat().forEach((y) => {
            revenue.push({
              _id: y._id,
              serviceName: "",
              ticketId: y._id,
              gross: y.cost.$numberDecimal,
              total: null,
            });
          });
        });
        setRevenue(revenue);
        loadingRevenueReport.current = false;
      });
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h1">Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={tech}
            columns={[
              {
                field: "technician",
                headerName: "Technician",
                width: 250,
                renderCell: (params) => (
                  <Link component={RouterLink} to={`/dashboard/users/${params.row._id}/edit`}>
                    {params.row.technician.name}
                  </Link>
                ),
              },
              {
                field: "tickets",
                headerName: "Total tickets",
                width: 150,
                type: "number",
              },
              {
                field: "completedTickets",
                headerName: "Completed tickets",
                width: 150,
                type: "number",
              },
            ]}
            autoHeight
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={revenue}
            columns={[
              {
                field: "serviceName",
                headerName: "Service name",
                width: 150,
              },
              {
                field: "ticketId",
                headerName: "Ticket ID",
                width: 250,
                renderCell: (params) => (
                  <Link component={RouterLink} to={`/dashboard/tickets/${params.row.ticketId}`}>
                    {params.row.ticketId}
                  </Link>
                ),
              },
              {
                field: "gross",
                headerName: "Gross",
                width: 150,
                type: "number",
                valueGetter: (params) => (params.value === null ? null : formatter.format(params.value)),
              },
              {
                field: "total",
                headerName: "Total",
                width: 150,
                type: "number",
                valueGetter: (params) => (params.value === null ? null : formatter.format(params.value)),
              },
            ]}
            autoHeight
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
