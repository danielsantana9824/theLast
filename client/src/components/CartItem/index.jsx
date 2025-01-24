import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="cart-item-container flex-row">
    <div className="cart-item-img-container">
      <img
        src={`/images/${item.image}`}
        alt={item.name}
        className="cart-item-img"
      />
    </div>
    <div className="cart-item-info">
      <div className="cart-item-name">
        {item.name}, <span className="cart-item-price">${item.price}</span>
      </div>
      <div className="cart-item-quantity">
        <span>Qty:</span>
        <input
          type="number"
          placeholder="1"
          value={item.purchaseQuantity}
          onChange={onChange}
          className="cart-item-quantity-input"
        />
        <span
          role="img"
          aria-label="trash"
          onClick={() => removeFromCart(item)}
          className="cart-item-remove"
        >
          🗑️
        </span>
      </div>
    </div>
  </div>
  
  
  );
}

export default CartItem;
