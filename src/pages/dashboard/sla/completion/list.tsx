import React, { FC } from "react";
import { List, useDataGrid } from "@refinedev/mui";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Link } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";

import { CompletionSLAData } from "@/interfaces";
import DataGridActionCell from "@/components/DataGridActionCell";

const CompletionSLAList: FC = () => {
  const { dataGridProps } = useDataGrid<CompletionSLAData>({
    resource: "completion-slas",
    filters: {
      permanent: [
        {
          field: "type",
          operator: "eq",
          value: "completion",
        },
      ],
    },
    meta: {
      customUrl: (url: string) => `${url}/service-level-agreements`,
    },
  });

  const breadCrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
        Dashboard
      </Link>
      <Typography>Completion Service Level Agreements</Typography>
    </Breadcrumbs>
  );

  return (
    <List title="Completion SLAs" breadcrumb={breadCrumb}>
      <DataGrid
        {...dataGridProps}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          { field: "dueWithinDays", headerName: "Due Within Days", width: 150 },
          {
            field: "priceModifier",
            headerName: "Price Modifier",
            width: 150,
            type: "number",
            valueFormatter: (params) => `x${params.value}`,
          },
          {
            field: "fixedPrice",
            headerName: "Fixed Price",
            width: 150,
            renderCell: (params) => {
              if (!params.row.fixedPrice) return null;
              return Intl.NumberFormat("en-AU", {
                style: "currency",
                currency: "AUD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(params.row.fixedPrice);
            },
          },
          { field: "description", headerName: "Description", width: 250 },
          {
            field: "createdAt",
            headerName: "Created At",
            width: 250,
            // @ts-expect-error This is valid
            valueGetter: (params: GridRowParams) => {
              return new Date(params.row.createdAt);
            },
          },
          {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            renderCell: (params) => <DataGridActionCell id={params.row.id as string} resource="completion-slas" />,
          },
        ]}
        autoHeight
      />
    </List>
  );
};

export default CompletionSLAList;
