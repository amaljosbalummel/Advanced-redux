import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartSliceAction } from '../../store/cart-slice';
const CartItem = (props) => {
  const dispatch =useDispatch();
  const { title, quantity, total, price,id } = props.item;
   
 const onAddHandler = () => {
   dispatch(cartSliceAction.addItemToCart({
     id:id,
     price:price,
     title:title
   }));
 }

  const onRemoveHandler= () => {
   dispatch(cartSliceAction.removeItemFromCart(id));
  }  
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onRemoveHandler}>-</button>
          <button onClick={onAddHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
