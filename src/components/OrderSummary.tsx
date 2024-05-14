import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SLAData } from "@/interfaces";

interface Item {
  title: string;
  basePrice: number;
  modifiers?: SLAData[];
  total: number;
  note?: string;
  location?: string;
}

interface OrderSummaryProps {
  items: Item[];
  grandTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, grandTotal }) => {
  return (
    <Box>
      <Typography variant="h6">Grand Total: ${grandTotal}</Typography>
      {items?.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary>
            <Typography>
              {item.title} - ${item.total}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Base Price</TableCell>
                    <TableCell>Modifier</TableCell>
                    <TableCell>Effect on Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>${item.basePrice}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {item.modifiers?.map((modifier, index) => (
                    <TableRow key={index}>
                      <TableCell></TableCell>
                      <TableCell>
                        {modifier.type} Within {modifier.dueWithinDays} days
                      </TableCell>
                      <TableCell>x{modifier.priceModifier}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>${item.total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default OrderSummary;
