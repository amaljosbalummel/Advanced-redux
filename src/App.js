import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiSliceActions } from "./store/ui-slice";
import Notification from "./components/UI/notification";
import { cartSliceAction } from "./store/cart-slice";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsValid);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiSliceActions.setNotification({
          status: "pending",
          title: "pendiing....",
          message: "sending cart data",
        })
      );
      const response = await fetch(
        "https://react-http-53e51-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error("sending cart data failed");
      }

      dispatch(
        uiSliceActions.setNotification({
          status: "success",
          title: "success!",
          message: "sent cart data success",
        })
      );
    };

    const fetchCartdata = async () => {
      const response = await fetch(
        "https://react-http-53e51-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("couldnt fetch data");
      }

      const responseData = await response.json();
      return responseData;
    };

    try {
      const cartData = fetchCartdata();
      dispatch(cartSliceAction.replaceCart(cartData));
    } catch (err) {
      dispatch(
        uiSliceActions.setNotification({
          status: "error",
          title: "Error",
          message: "sending cart data failed",
        })
      );
    }
    fetchCartdata();

    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((err) => {
      dispatch(
        uiSliceActions.setNotification({
          status: "error",
          title: "Error",
          message: "sending cart data failed",
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
