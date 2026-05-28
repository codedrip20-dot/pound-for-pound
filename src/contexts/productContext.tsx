import { createContext, useContext, useState } from "react";
import { products } from "../components/data";

type ProductContextType = {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allProducts, setAllProducts] = useState(products);

  return (
    <ProductContext.Provider
      value={{
        products: allProducts,
        setProducts: setAllProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
};