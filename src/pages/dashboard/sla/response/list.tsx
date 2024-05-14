import React, { FC } from "react";
import { List, useDataGrid } from "@refinedev/mui";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Link } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";

import { ResponseSLAData } from "@/interfaces";
import DataGridActionCell from "@/components/DataGridActionCell";

const ResponseSLAList: FC = () => {
  const { dataGridProps } = useDataGrid<ResponseSLAData>({
    resource: "response-slas",
    filters: {
      permanent: [
        {
          field: "type",
          operator: "eq",
          value: "response",
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
      <Typography>Response Service Level Agreements</Typography>
    </Breadcrumbs>
  );

  return (
    <List title="Response SLAs" breadcrumb={breadCrumb}>
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
          // {
          //   field: "fixedPrice",
          //   headerName: "Fixed Price",
          //   width: 150,
          //   renderCell: (params) => {
          //     if (!params.row.fixedPrice) return null;
          //     return Intl.NumberFormat("en-AU", {
          //       style: "currency",
          //       currency: "AUD",
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     }).format(params.row.fixedPrice);
          //   },
          // },
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
            renderCell: (params) => (
              <DataGridActionCell canDelete id={params.row.id as string} resource="response-slas" />
            ),
          },
        ]}
        autoHeight
      />
    </List>
  );
};

export default ResponseSLAList;
