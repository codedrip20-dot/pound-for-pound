import { createContext, useContext, useState, useEffect } from "react";

import { fetchProducts } from "../utils/firebase";

type ProductContextType = {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
      const products = await fetchProducts();
      setAllProducts(products);
      setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false);
      }
    };
    
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products: allProducts,
        setProducts: setAllProducts,
        loading,
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