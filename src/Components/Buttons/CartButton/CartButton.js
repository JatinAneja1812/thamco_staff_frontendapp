import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Tooltip } from "antd";
import React from "react";

import CartButton from "./CartButton.styles";

const CartIconButton = (props) => {
//   const [itemCount, setItemCount] = useState(0);

  return (
    <div>
      <Tooltip title="Cart">
        <span>
          <CartButton
            style={{
              color: "#ffae00",
              fontSize: "26px",
            }}
            to={"/cart"}
            // disabled
            sx={{ textTransform: "capitalize" }}
          >
            <ShoppingCartIcon
              style={{ fontSize: "27px", marginTop: "6px" }}
            />
          </CartButton>
        </span>
      </Tooltip>
    </div>
  );
};

export default CartIconButton;
