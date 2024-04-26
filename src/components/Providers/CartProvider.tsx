import React, { createContext, useReducer } from "react";

import { Cart, ServiceData } from "@/interfaces";

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
  item: ServiceData,
): {
  type: "ADD_ITEM";
  payload: ServiceData;
} => {
  return {
    type: "ADD_ITEM",
    payload: item,
  };
};

export const removeItem = (
  itemId: ServiceData["id"],
): {
  type: "REMOVE_ITEM";
  payload: ServiceData["id"];
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
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM": {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)),
        };
      }
      return {
        ...state,
        items: state.items.filter((i) => i.id !== itemId),
      };
    }
    default:
      return state;
  }
};

const initialState: Cart = {
  items: [],
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
