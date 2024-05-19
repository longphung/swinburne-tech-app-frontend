import { FC, useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useForm } from "@refinedev/react-hook-form";
import { Edit } from "@refinedev/mui";
import { Breadcrumbs, CircularProgress, FormControl, InputLabel, Link, MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Controller } from "react-hook-form";

import { OrderData } from "@/interfaces";
import { getOrderPDFInvoice } from "@/api/backend";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type UpdatableFields = Pick<OrderData, "status">;

const OrdersEdit: FC = () => {
  const { id } = useParams();
  const {
    refineCore: { onFinish, queryResult, formLoading },
    handleSubmit,
    setValue,
    control,
    saveButtonProps,
    formState: { errors },
  } = useForm<UpdatableFields>();
  const [haveSetStatus, setHaveSetStatus] = useState(false);
  const loadingPdf = useRef(false);
  const [pdfURL, setPdfURL] = useState<null | string>(null);

  useEffect(() => {
    if (!loadingPdf.current && id) {
      loadingPdf.current = true;
      getOrderPDFInvoice(id).then((res) => {
        setPdfURL(res);
        loadingPdf.current = false;
      });
    }
    return () => {
      loadingPdf.current = false;
    };
  }, []);

  const breadcrumb = (
    <Breadcrumbs>
      <Link component={RouterLink} to="/dashboard">
        Dashboard
      </Link>
      <Link to="/dashboard/orders" component={RouterLink}>
        Orders
      </Link>
      <Typography>Edit</Typography>
    </Breadcrumbs>
  );

  if (queryResult?.data && !haveSetStatus) {
    setValue("status", queryResult.data.data.status);
    setHaveSetStatus(true);
    return null;
  }

  const onSubmit = handleSubmit((data) => {
    onFinish(data);
  });

  return (
    <Edit
      breadcrumb={breadcrumb}
      title="Edit Order"
      saveButtonProps={{
        ...saveButtonProps,
        onClick: onSubmit,
      }}
    >
      <Grid container spacing={2} component="form" onSubmit={onSubmit}>
        <Grid item xs={12} md={6}>
          {pdfURL ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">Invoice:</Typography>
                <Button variant="contained" component="a" href={pdfURL} target="_blank" rel="noreferrer">
                  Download Invoice
                </Button>
              </Box>
              {/* TODO: known issues with pdf blanking when switching tab https://github.com/wojtekmaj/react-pdf/issues/1798 */}
              <Document file={pdfURL}>
                <Page pageNumber={1} />
              </Document>
            </>
          ) : (
            <CircularProgress />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {!formLoading && (
            <FormControl error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    id="status"
                    label="Status"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          )}
        </Grid>
      </Grid>
    </Edit>
  );
};

export default OrdersEdit;
