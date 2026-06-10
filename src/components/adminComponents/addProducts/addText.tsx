import React, { useState } from "react";
import { motion } from "framer-motion";
import { addProductToFirestore } from "../../../utils/firebase"
import { useNavigate } from 'react-router-dom'

interface Product {
  uid: string;
  gender: string;
  productName: string;
  category: string;
  size: string[];
  fit: string;
  fabric: string;
  printType: string;
  price: number;
  stockQuantity: number;
  productImages: {
    id: string;
    imageUrl: string;
    altText: string;
  }[];
  description: string;
  reviews: any[];
}

const availableSizes = ["S", "M", "L", "XL", "XXL"];

const AddText = () => {
    const navigate = useNavigate()
    const categories = [
  "tshirt",
  "hoodie",
  "jacket",
  "cargo",
  "joggers",
];
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Product>({
    uid: "",
    gender: "",
    productName: "",
    category: "",
    size: [],
    fit: "",
    fabric: "",
    printType: "",
    price: 0,
    stockQuantity: 0,
    productImages: [],
    description: "",
    reviews: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stockQuantity"
          ? Number(value)
          : value,
    }));
  };

  const handleSizeToggle = (selectedSize: string) => {
    setFormData((prev) => ({
      ...prev,
      size: prev.size.includes(selectedSize)
        ? prev.size.filter((size) => size !== selectedSize)
        : [...prev.size, selectedSize],
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Firestore Product:");
      console.log(formData);

      await addProductToFirestore(formData);

      alert("Product created successfully");

      setFormData({
        uid: "",
        gender: "",
        productName: "",
        category: "",
        size: [],
        fit: "",
        fabric: "",
        printType: "",
        price: 0,
        stockQuantity: 0,
        productImages: [],
        description: "",
        reviews: [],
      });
      navigate('/admin/addProduct/addImages', {
        state: {
            uid: formData.uid,
        }
      });
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
    >
     <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[3px] text-lime-400">
                Step 1
            </p>

            <h2 className="text-2xl font-bold mt-2">
                Product Details
            </h2>

            <p className="text-zinc-400 mt-1">
                Enter all product information before uploading images.
            </p>
        </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />
          <input
          name="uid"
          value={formData.uid}
          onChange={handleChange}
          placeholder="Product UID"
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />

         <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            >
                <option value="">Select Category</option>

                {categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                    >
                        {category}
                    </option>
                ))}
        </select>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        >
          <option value="">Select Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>

        <div>
          <p className="mb-2 font-medium">
            Available Sizes
          </p>

          <div className="flex flex-wrap gap-3">
            {availableSizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded-lg border ${
                  formData.size.includes(size)
                    ? "bg-lime-500 text-black border-lime-500"
                    : "border-zinc-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <input
          name="fit"
          value={formData.fit}
          onChange={handleChange}
          placeholder="Fit"
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />

        <input
          name="fabric"
          value={formData.fabric}
          onChange={handleChange}
          placeholder="Fabric"
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />

        <input
          name="printType"
          value={formData.printType}
          onChange={handleChange}
          placeholder="Print Type"
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />

      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-300">
            Price (₹)
        </label>

        <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />
        </div>
     <div>
        <label className="block text-sm font-medium mb-2 text-zinc-300">
            Stock Quantity
        </label>

        <input
            name="stockQuantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />
    </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Product Description"
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-lime-500 text-black font-semibold py-3 rounded-lg"
        >
          {loading ? "Creating Product..." : "Create Product"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddText;