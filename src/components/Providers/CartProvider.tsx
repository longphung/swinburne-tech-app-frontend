import React, { createContext, useReducer } from "react";

import { Cart, CartItem } from "@/interfaces";

const CartContext = createContext<Cart | null>(null);

const CartDispatchContext = createContext<React.Dispatch<
  ReturnType<typeof addItem> | ReturnType<typeof removeItem>
> | null>(null);

export const useCart = () => {
  const cart = React.useContext(CartContext);
  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return cart;
};

export const useCartDispatch = () => {
  const setCart = React.useContext(CartDispatchContext);
  if (!setCart) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return setCart;
};

export const addItem = (
  item: CartItem,
): {
  type: "ADD_ITEM";
  payload: CartItem;
} => {
  return {
    type: "ADD_ITEM",
    payload: item,
  };
};

export const removeItem = (
  itemId: CartItem["id"],
): {
  type: "REMOVE_ITEM";
  payload: CartItem["id"];
} => {
  return {
    type: "REMOVE_ITEM",
    payload: itemId,
  };
};

const cartReducer = (state: Cart, action: ReturnType<typeof addItem> | ReturnType<typeof removeItem>) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const item = action.payload;
      const quantity = state.quantityById[item.id] || 0;
      const total = state.total + item.price;
      return {
        ...state,
        items: [...state.items, item],
        quantityById: {
          ...state.quantityById,
          [item.id]: quantity + 1,
        },
        total,
      };
    }
    case "REMOVE_ITEM": {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (!item) {
        return state;
      }
      const quantity = state.quantityById[itemId];
      const total = state.total - item.price;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== itemId),
        quantityById: {
          ...state.quantityById,
          [itemId]: quantity - 1,
        },
        total,
      };
    }
    default:
      return state;
  }
};

const initialState: Cart = {
  items: [],
  quantityById: {},
  total: 0,
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;
