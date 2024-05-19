import { DeleteButton, EditButton, List, useDataGrid } from "@refinedev/mui";
import { CATEGORY, CATEGORY_LABELS, ServiceData } from "@/interfaces";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Breadcrumbs, IconButton, Link, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Editor from "@/components/Editor/Editor";
import Box from "@mui/material/Box";

const ServiceListActionCell = (props: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

  const handlePopoverOpen: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  return (
    <>
      <IconButton aria-label="delete" onClick={handlePopoverOpen}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={open}
        onClose={handlePopoverClose}
        anchorEl={anchorEl as Element}
        sx={{
          maxWidth: "20rem",
        }}
      >
        <DeleteButton resource="services" recordItemId={props.id} fullWidth sx={{ padding: "1rem" }} />
        <EditButton resource="services" recordItemId={props.id} fullWidth sx={{ padding: "1rem" }} />
      </Popover>
    </>
  );
};

const ServicesList = () => {
  const { dataGridProps } = useDataGrid<ServiceData>({
    resource: "services",
    meta: {
      customUrl: (apiUrl: string, resource: string) => `${apiUrl}/${resource}/admin`,
    },
  });

  const breadcrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/dashboard">
        Dashboard
      </Link>
      <Typography color="textPrimary">Services</Typography>
    </Breadcrumbs>
  );

  return (
    <List resource="services" title="Manage Services" breadcrumb={breadcrumb}>
      <DataGrid
        {...dataGridProps}
        autoHeight
        getRowHeight={() => "auto"}
        columns={[
          {
            field: "id",
            headerName: "ID",
            width: 90,
          },
          {
            field: "title",
            headerName: "Title",
            width: 200,
          },
          {
            field: "label",
            headerName: "Label",
            width: 100,
          },
          {
            field: "price",
            headerName: "Price",
            width: 50,
            type: "number",
          },
          {
            field: "category",
            headerName: "Category",
            width: 120,
            valueGetter: (params) => CATEGORY_LABELS[params.row.category as CATEGORY],
          },
          {
            field: "serviceType",
            headerName: "Service Type",
            width: 200,
          },
          {
            field: "description",
            headerName: "Description",
            width: 500,
            renderCell: (params) => (
              <Box sx={{ width: "100%" }}>
                <Editor
                  // @ts-expect-error This is a valid prop
                  initialContent={params.row.description as string}
                  editable={false}
                />
              </Box>
            ),
          },
          {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            renderCell: (params) => <ServiceListActionCell id={params.row.id as string} />,
          },
        ]}
      />
    </List>
  );
};

export default ServicesList;
