import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import LockResetIcon from "@mui/icons-material/LockReset";
import { DeleteButton, EditButton, List, useDataGrid } from "@refinedev/mui";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Breadcrumbs, Chip, IconButton, Link, Popover } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { USERS_ROLE } from "@/interfaces";

const UserListCellAction = (props: { id: string }) => {
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
        sx={{
          maxWidth: "20rem",
        }}
      >
        <DeleteButton
          resource="users"
          recordItemId={props.id}
          fullWidth
          sx={{ padding: "1rem" }}
        />
        <EditButton
          resource="users"
          recordItemId={props.id}
          fullWidth
          sx={{ padding: "1rem" }}
        />
        <Button variant="text" sx={{ padding: "1rem" }} fullWidth>
          <LockResetIcon />
          <Typography variant="button" sx={{ marginLeft: "0.25rem" }}>
            Reset Password
          </Typography>
        </Button>
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
      <Link underline="hover" color="inherit" href="/dashboard">
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
          {
            field: "role",
            headerName: "Role",
            width: 250,
            // @ts-expect-error This is valid
            renderCell: (params: GridRowParams) => {
              return (
                <Stack direction="row" spacing={1}>
                  {params.row.role.map((x: USERS_ROLE) => (
                    <Chip
                      key={`${params.row.id}-${x}`}
                      label={x}
                      color="primary"
                      variant={x !== "admin" ? "outlined" : "filled"}
                    />
                  ))}
                </Stack>
              );
            },
          },
          { field: "address", headerName: "Address", width: 300 },
          { field: "phone", headerName: "Phone", width: 150 },
          {
            field: "createdAt",
            headerName: "Created At",
            width: 150,
            type: "dateTime",
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
              <UserListCellAction id={params.row.id} />
            ),
          },
        ]}
        autoHeight
      />
    </List>
  );
};

export default UsersList;
