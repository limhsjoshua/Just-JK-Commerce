import { useState } from "react";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import CartDropdownItem from "./CartDropdownItem";

export default function CartDropdown({ cart }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
      >
        <Badge
          badgeContent={cart.reduce((a, b) => a + b.quantity, 0)}
          color="secondary"
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div>
          <List>
            {cart.map((item) => (
              <CartDropdownItem key={item.id} item={item} />
            ))}
          </List>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minWidth: "100%",
            }}
          >
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  minWidth: "100%",
                  margin: 10,
                  paddingLeft: 50,
                  paddingRight: 50,
                }}
                onClick={handlePopoverClose}
              >
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </Popover>
    </div>
  );
}
