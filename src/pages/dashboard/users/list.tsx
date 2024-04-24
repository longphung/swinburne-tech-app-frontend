import { DataGrid } from "@mui/x-data-grid";
import { List, useDataGrid } from "@refinedev/mui";

const UsersList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "users",
    sorters: {
      initial: [{ field: "name", order: "asc" }],
    },
  });

  return (
    <List title="Users" resource="users">
      <DataGrid
        {...dataGridProps}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          { field: "name", headerName: "Name", width: 150 },
          { field: "username", headerName: "Username", width: 150 },
          { field: "email", headerName: "Email", width: 150 },
          { field: "role", headerName: "Role", width: 150 },
          { field: "address", headerName: "Address", width: 150 },
          { field: "phone", headerName: "Phone", width: 150 },
        ]}
        autoHeight
      />
    </List>
  );
};

export default UsersList;
