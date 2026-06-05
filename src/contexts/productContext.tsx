import { createContext, useContext, useState, useEffect } from "react";

import { fetchProducts } from "../utils/firebase";

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
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setAllProducts(products);
    };

    getProducts();
  }, []);

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