import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts, deleteProduct } from "../utils/firebase";

interface ProductImage {
  id: string;
  imageUrl: string;
  altText: string;
  publicId?: string;
}

interface Product {
  uid: string;
  productName: string;
  category: string;
  price: number;
  stockQuantity: number;
  productImages: ProductImage[];
}

const AdminDeleteProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

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
      console.error(
        "Error fetching products:",
        error
      );
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

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      setDeletingId(selectedProduct.uid);

      await deleteProduct(
        selectedProduct.uid
      );

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.uid !==
            selectedProduct.uid
        )
      );

      setSelectedProduct(null);

      console.log(
        "Product deleted successfully"
      );
    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Delete Products
        </h1>

        <p className="text-zinc-400 mb-8">
          Manage and remove products
          from your store.
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
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {filteredProducts.map(
              (product) => (
                <motion.div
                  key={product.uid}
                  layout
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
                      w-full
                      h-72
                      object-cover
                    "
                  />

                  <div className="p-5">
                    <h2 className="font-bold text-xl">
                      {product.productName}
                    </h2>

                    <p className="text-zinc-400 mt-2">
                      {product.category}
                    </p>

                    <div className="mt-4 flex justify-between">
                      <span>
                        ₹{product.price}
                      </span>

                      <span>
                        Stock:{" "}
                        {
                          product.stockQuantity
                        }
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedProduct(
                          product
                        )
                      }
                      className="
                        mt-5
                        w-full
                        py-3
                        rounded-xl
                        bg-red-600
                        hover:bg-red-700
                        transition
                      "
                    >
                      Delete Product
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                bg-black/70
                flex
                items-center
                justify-center
                p-4
                z-50
              "
            >
              <motion.div
                initial={{
                  scale: 0.9,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                }}
                className="
                  bg-zinc-900
                  p-6
                  rounded-2xl
                  w-full
                  max-w-md
                  border
                  border-zinc-800
                "
              >
                <h2 className="text-2xl font-bold">
                  Delete Product?
                </h2>

                <p className="text-zinc-400 mt-3">
                  This action cannot be
                  undone.
                </p>

                <p className="mt-4 font-semibold">
                  {
                    selectedProduct.productName
                  }
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() =>
                      setSelectedProduct(
                        null
                      )
                    }
                    className="
                      flex-1
                      py-3
                      rounded-xl
                      bg-zinc-800
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={
                      deletingId ===
                      selectedProduct.uid
                    }
                    className="
                      flex-1
                      py-3
                      rounded-xl
                      bg-red-600
                      disabled:opacity-50
                    "
                  >
                    {deletingId ===
                    selectedProduct.uid
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDeleteProduct;