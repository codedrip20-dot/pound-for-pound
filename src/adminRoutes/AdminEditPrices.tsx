import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  fetchProducts,
  updatePrice,
} from "../utils/firebase";

interface ProductImage {
  id: string;
  imageUrl: string;
  altText: string;
}

interface Product {
  uid: string;
  productName: string;
  category: string;
  price: number;
  stockQuantity: number;
  productImages: ProductImage[];
}

const AdminEditPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] =
    useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const fetchedProducts =
        await fetchProducts();

      setProducts(fetchedProducts as Product[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handlePriceChange = (
    uid: string,
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.uid === uid
          ? {
              ...product,
              price: Number(value),
            }
          : product
      )
    );
  };

  const handleSave = async (
    uid: string,
    price: number
  ) => {
    try {
      setSavingId(uid);

      await updatePrice(uid, price);

      console.log(
        "Price updated successfully"
      );
    } catch (error) {
      console.error(
        "Price update failed:",
        error
      );
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Edit Product Prices
        </h1>

        <p className="text-zinc-400 mb-8">
          Update product prices directly
          from the admin dashboard.
        </p>

        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
            w-full
            mb-8
            px-4
            py-3
            rounded-xl
            bg-zinc-900
            border
            border-zinc-800
            outline-none
          "
        />

        {loading ? (
          <div className="text-center py-20">
            Loading products...
          </div>
        ) : (
          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {filteredProducts.map(
              (product) => (
                <motion.div
                  key={product.uid}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    bg-zinc-900
                    border
                    border-zinc-800
                    rounded-2xl
                    overflow-hidden
                  "
                >
                  <img
                    src={
                      product.productImages?.[0]
                        ?.imageUrl
                    }
                    alt={product.productName}
                    className="
                      h-72
                      w-full
                      object-cover
                    "
                  />

                  <div className="p-5">
                    <h2 className="text-xl font-bold">
                      {product.productName}
                    </h2>

                    <p className="text-zinc-400 mt-2">
                      {product.category}
                    </p>

                    <div className="mt-5">
                      <label className="block text-sm mb-2">
                        Price
                      </label>

                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                          handlePriceChange(
                            product.uid,
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          px-4
                          py-3
                          rounded-xl
                          bg-zinc-800
                          border
                          border-zinc-700
                          outline-none
                        "
                      />
                    </div>

                    <button
                      onClick={() =>
                        handleSave(
                          product.uid,
                          product.price
                        )
                      }
                      disabled={
                        savingId ===
                        product.uid
                      }
                      className="
                        w-full
                        mt-5
                        py-3
                        rounded-xl
                        bg-blue-600
                        hover:bg-blue-700
                        transition
                        disabled:opacity-50
                      "
                    >
                      {savingId ===
                      product.uid
                        ? "Saving..."
                        : "Save Price"}
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEditPrices;