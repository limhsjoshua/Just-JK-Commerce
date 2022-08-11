import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Badge from "@material-ui/core/Badge";
import "./CartItem.css";

export default function CartItem({ item, idx, addQtyInCart, reduceQtyInCart }) {
  const { name, price, photo, description, quantity } = item;
  const handleAddQtyInCart = () => {
    addQtyInCart(item);
  };
  const handleReduceQtyInCart = () => {
    reduceQtyInCart(item);
  };

  return (
    <TableRow>
      <TableCell style={{ fontFamily: "Merriweather" }} align="center">
        {idx + 1}
      </TableCell>
      <TableCell align="center">
        <img
          alt={description}
          src={photo}
          style={{ width: "130px", height: "130px" }}
        />
      </TableCell>
      <TableCell style={{ fontFamily: "Merriweather" }} align="left">
        {name}
      </TableCell>
      <TableCell style={{ fontFamily: "Merriweather" }} align="center">
        ${price.toFixed(2)}
      </TableCell>
      <TableCell style={{ fontFamily: "Merriweather" }} align="center">
        <Badge className="qty-badge" onClick={handleReduceQtyInCart}>
          -
        </Badge>
        <span style={{ marginLeft: 10, marginRight: 10 }}>{quantity}</span>
        <Badge className="qty-badge" onClick={handleAddQtyInCart}>
          +
        </Badge>
      </TableCell>
      <TableCell
        style={{ fontFamily: "Merriweather", fontWeight: "900" }}
        align="center"
      >
        ${(price * quantity).toFixed(2)}
      </TableCell>
    </TableRow>
  );
}
