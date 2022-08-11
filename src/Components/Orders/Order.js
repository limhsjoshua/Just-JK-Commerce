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
import Chip from "@material-ui/core/Chip";
import OrderItem from "./OrderItem";

const getChipColor = (status) => {
  const map = { checkout: "secondary", paid: "primary", shipped: "success" };
  return map[status];
};

export const Order = ({ order }) => {
  const { id, products, status, dateCreated, total, delivery } = order;

  return (
    <Accordion>
      <AccordionSummary
        sx={{}}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{
          fontFamily: "Merriweather",
          fontWeight: 900,
        }}
      >
        <p>
          Order ID: {id}{" "}
          <Chip
            label={status.toUpperCase()}
            size="small"
            style={{ fontWeight: "normal", marginLeft: 20 }}
            color={getChipColor(status)}
          />
          <br />
          <br />
          <span
            style={{
              fontWeight: 300,
            }}
          >
            {dateCreated
              ? `Date: ${dateCreated.toDate().toLocaleDateString()}`
              : ""}
          </span>
          <br />
          <br />
          <span
            style={{
              fontWeight: 300,
            }}
          >
            Total: ${total}
          </span>
        </p>
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
              {products.map((item, idx) => (
                <OrderItem key={`item${item.id}`} item={item} idx={idx} />
              ))}
            </TableBody>
          </Table>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "300" }}
                  align="center"
                >
                  Sub-Total
                </TableCell>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "300" }}
                  align="center"
                >
                  $
                  {(total - (delivery === "standard" ? 1.99 : 4.99)).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "300" }}
                  align="center"
                >
                  Shipping
                </TableCell>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "300" }}
                  align="center"
                >
                  ${delivery === "standard" ? 1.99 : 4.99}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                  align="center"
                >
                  Total
                </TableCell>
                <TableCell
                  style={{ fontFamily: "Merriweather", fontWeight: "900" }}
                  align="center"
                >
                  ${total}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
