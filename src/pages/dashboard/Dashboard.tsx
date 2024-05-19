import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
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
            _id: x._id[0],
            serviceName: x._id[0],
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
                valueGetter: (params) => params.row.technician.name,
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
              },
              {
                field: "gross",
                headerName: "Gross",
                width: 150,
                type: "number",
              },
              {
                field: "total",
                headerName: "Total",
                width: 150,
                type: "number",
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
