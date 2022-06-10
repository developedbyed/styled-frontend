import {
  CartStyle,
  Card,
  EmptyStyle,
  CartWrapper,
  CardInfo,
  Checkout,
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
//Import State
import { useStateContext } from "../lib/context";

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  return (
    <CartWrapper onClick={() => setShowCart(false)}>
      <CartStyle onClick={(e) => e.stopPropagation()}>
        {cartItems.length < 1 && (
          <EmptyStyle>
            <h1>You have more shopping to do 😉</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <Card key={item.slug}>
                <img src={item.image.data.attributes.formats.small.url} />
                <CardInfo>
                  <h3>{item.title}</h3>
                  <h3>{item.price}$</h3>
                  <Quantity>
                    <span>Quantity</span>
                    <button onClick={() => onRemove(item)}>
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => onAdd(item, 1)}>
                      <AiFillPlusCircle />
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            );
          })}
        <Checkout>
          {cartItems.length >= 1 && (
            <div>
              <h3>Subtotal ${totalPrice}</h3>
              <button>Purchase</button>
            </div>
          )}
        </Checkout>
      </CartStyle>
    </CartWrapper>
  );
}
