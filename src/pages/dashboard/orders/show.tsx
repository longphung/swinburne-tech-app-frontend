import { Show } from "@refinedev/mui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Document, Page } from "react-pdf";
import { Breadcrumbs, CircularProgress, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderPDFInvoice } from "@/api/backend";

const OrdersShow: FC = () => {
  const loadingPdf = useRef(false);
  const { id } = useParams();
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
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
        Dashboard
      </Link>
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard/orders">
        Orders
      </Link>
      <Typography color="text.primary">{id}</Typography>
    </Breadcrumbs>
  );

  return (
    <Show breadcrumb={breadcrumb} resource="orders" recordItemId={id}>
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
    </Show>
  );
};

export default OrdersShow;
