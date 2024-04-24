import { List, useDataGrid } from "@refinedev/mui";
import { ServiceData } from "@/interfaces";
import { DataGrid } from "@mui/x-data-grid";

const ServicesList = () => {
  const { dataGridProps } = useDataGrid<ServiceData>();

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        autoHeight
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
            width: 200,
          },
          {
            field: "price",
            headerName: "Price",
            width: 120,
            type: "number",
          },
          {
            field: "category",
            headerName: "Category",
            width: 120,
          },
          {
            field: "serviceType",
            headerName: "Service Type",
            width: 200,
          },
          {
            field: "description",
            headerName: "Description",
            width: 200,
          },
        ]}
      />
    </List>
  );
};

export default ServicesList;
