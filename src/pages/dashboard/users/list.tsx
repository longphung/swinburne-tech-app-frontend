import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { DeleteButton, EditButton, List, useDataGrid } from "@refinedev/mui";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Breadcrumbs, IconButton, Link, Popover } from "@mui/material";
import Typography from "@mui/material/Typography";

const CellAction = (props: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

  const handlePopoverOpen: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
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
      >
        <DeleteButton
          resource="users"
          recordItemId={props.id}
          sx={{ padding: "1rem" }}
        />
        <EditButton
          resource="users"
          recordItemId={props.id}
          fullWidth
          sx={{ padding: "1rem" }}
        />
      </Popover>
    </>
  );
};

const UsersList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "users",
    sorters: {
      initial: [{ field: "name", order: "asc" }],
    },
  });

  const breadcrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Dashboard
      </Link>
      <Typography color="text.primary">Users</Typography>
    </Breadcrumbs>
  );

  return (
    <List
      title="Users"
      resource="users"
      canCreate={false}
      breadcrumb={breadcrumb}
    >
      <DataGrid
        {...dataGridProps}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          { field: "name", headerName: "Name", width: 150 },
          { field: "username", headerName: "Username", width: 150 },
          { field: "email", headerName: "Email", width: 250 },
          { field: "role", headerName: "Role", width: 150 },
          { field: "address", headerName: "Address", width: 300 },
          { field: "phone", headerName: "Phone", width: 150 },
          {
            field: "createdAt",
            headerName: "Created At",
            width: 150,
            type: "date",
            // @ts-expect-error This is valid
            valueGetter: (params: GridRowParams) => {
              return new Date(params.row.createdAt);
            },
          },
          {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            // @ts-expect-error This is valid
            renderCell: (params: GridRowParams) => (
              <CellAction id={params.row.id} />
            ),
          },
        ]}
        autoHeight
      />
    </List>
  );
};

export default UsersList;
