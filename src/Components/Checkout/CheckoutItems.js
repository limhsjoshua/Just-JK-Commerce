import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckoutItem from "./CheckoutItem";

export default function CheckoutItems({ cart }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{
          fontFamily: "Merriweather",
          fontWeight: 900,
        }}
      >
        Product Information
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                  align="center"
                >
                  S/N
                </TableCell>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                  align="center"
                >
                  Product
                </TableCell>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                  align="left"
                >
                  Product Name
                </TableCell>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                  align="center"
                >
                  Unit Price
                </TableCell>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                  align="center"
                >
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item, idx) => (
                <CheckoutItem key={`item${item.id}`} item={item} idx={idx} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
