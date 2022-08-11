import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function OrderItem({ item, idx }) {
  const { name, price, photo, description, quantity } = item;

  return (
    <TableRow>
      <TableCell
        style={{ fontFamily: "Merriweather", fontWeight: "300" }}
        align="center"
      >
        {idx + 1}
      </TableCell>
      <TableCell
        style={{ fontFamily: "Merriweather", fontWeight: "300" }}
        align="center"
      >
        <img
          alt={description}
          src={photo}
          style={{ width: "130px", height: "130px" }}
        />
      </TableCell>
      <TableCell
        style={{ fontFamily: "Merriweather", fontWeight: "300" }}
        align="left"
      >
        {name}
      </TableCell>
      <TableCell
        style={{ fontFamily: "Merriweather", fontWeight: "300" }}
        align="center"
      >
        ${price.toFixed(2)}
      </TableCell>
      <TableCell
        style={{ fontFamily: "Merriweather", fontWeight: "300" }}
        align="center"
      >
        {quantity}
      </TableCell>
      <TableCell
        style={{ fontFamily: "Merriweather", fontWeight: "300" }}
        align="center"
      >
        ${(price * quantity).toFixed(2)}
      </TableCell>
    </TableRow>
  );
}
