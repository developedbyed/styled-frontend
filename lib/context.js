import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  //Ourt application state
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantitites] = useState(0);

  //Increase product countity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  //Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  //Add Product To Cart
  const onAdd = (product, quantity) => {
    //Total Price
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    //Increase total quantity
    setTotalQuantitites(
      (prevTotalQuantities) => prevTotalQuantities + quantity
    );
    //Check if product is in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };
  //Remove product
  const onRemove = (product) => {
    //Set Total Price
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);

    //Remove from total quantities
    setTotalQuantitites((prevTotalQuantities) => prevTotalQuantities - 1);

    //Check if product exists
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        qty,
        increaseQty,
        decreaseQty,
        cartItems,
        onAdd,
        onRemove,
        totalPrice,
        totalQuantities,
        setQty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
