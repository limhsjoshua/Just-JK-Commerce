import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function CheckoutItem({ item, idx }) {
  const { name, price, photo, description, quantity } = item;

  return (
    <TableRow>
      <TableCell align="center">{idx + 1}</TableCell>
      <TableCell align="center">
        <img
          alt={description}
          src={photo}
          style={{ width: "130px", height: "130px" }}
        />
      </TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="center">{price}</TableCell>
      <TableCell align="center">{quantity}</TableCell>
      <TableCell align="center">{price * quantity}</TableCell>
    </TableRow>
  );
}
