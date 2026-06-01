import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  uid: string;
  productName: string;
  imageUrl: string;
  price: number;
  selectedSize: string;
  quantity: number;
  productImages: string[];
}

interface CartContextType {
  cartItems: CartItem[];

  addToCart: (
    item: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (
    uid: string,
    selectedSize: string
  ) => void;

  increaseQuantity: (
    uid: string,
    selectedSize: string
  ) => void;

  decreaseQuantity: (
    uid: string,
    selectedSize: string
  ) => void;

  clearCart: () => void;

  cartCount: number;
  cartTotal: number;
}

const CartContext =
  createContext<CartContextType | null>(
    null
  );

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({
  children,
}: CartProviderProps) => {
  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);
  

      const addToCart = (
            item: Omit<CartItem, "quantity">
            ) => {
            setCartItems((prevItems) => [
                ...prevItems,
                {
                ...item,
                quantity: 1,
                },
            ]);
            };
              console.log("the value inside the cartItems state is ", cartItems);

        const removeFromCart = (
        uid: string,
        selectedSize: string
        ) => {};

        const increaseQuantity = (
        uid: string,
        selectedSize: string
        ) => {};

        const decreaseQuantity = (
        uid: string,
        selectedSize: string
        ) => {};

        const clearCart = () => {};

  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      ),
    [cartItems]
  );
   
    return (
  <CartContext.Provider
    value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }}
  >
    {children}
  </CartContext.Provider>
);

};

export const useCart = () => {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return context;
};