import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

export default function CartDropdownItem({ item }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={item.photo} variant="square" />
      </ListItemAvatar>
      <ListItemText
        primary={item.name}
        secondary={`Quantity: ${item.quantity}`}
      />
    </ListItem>
  );
}
