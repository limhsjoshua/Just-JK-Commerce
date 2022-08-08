import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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
      <TableCell align="center">
        <button onClick={handleReduceQtyInCart}>-</button>
        <span>{quantity}</span>
        <button onClick={handleAddQtyInCart}>+</button>
      </TableCell>
      <TableCell align="center">{(price * quantity).toFixed(2)}</TableCell>
    </TableRow>
  );
}
