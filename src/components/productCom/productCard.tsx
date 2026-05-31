import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

type ProductCardProps = {
  uid: string;
  productName: string;
  category: string;
  size: string[];
  fit: string;
  fabric: string;
  GSN: string;
  printType: string;
  price: number;
  stockQuantity: number;

  productImages: {
    id: number;
    imageUrl: string;
    altText: string;
  }[];

  description: string;

  reviews: {
    userEmail: string;
    rating: number;
    comment: string;
  }[];
};

const ProductCard = ({
  uid,
  productName,
  category,
  size,
  fit,
  fabric,
  printType,
  price,
  stockQuantity,
  productImages,
  description,
  reviews,
}: ProductCardProps) => {
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "5.0";

      
  return (
    <Link to={`/product/${uid}`}>
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-[28px] border border-green-500/20 bg-black/40 backdrop-blur-xl"
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-green-500/10 blur-3xl" />

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={productImages[0].imageUrl}
          alt={productImages[0].altText}
          className="h-[350px] w-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Category */}
        <div className="absolute top-4 left-4 px-4 py-1 rounded-full bg-black/70 border border-green-400/30 backdrop-blur-md">
          <p className="text-[10px] tracking-[3px] uppercase text-green-300">
            {category}
          </p>
        </div>

        {/* Stock */}
        <div className="absolute top-4 right-4 px-4 py-1 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-md">
          <p className="text-[10px] tracking-[2px] uppercase text-green-300">
            {stockQuantity} Left
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title + Price */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white leading-tight">
              {productName}
            </h2>

            <p className="text-zinc-500 text-xs uppercase tracking-[3px] mt-2">
              UID : {uid}
            </p>
          </div>

          <h3 className="text-2xl font-black text-green-400 drop-shadow-[0_0_18px_rgba(34,197,94,0.6)]">
            ₹{price}
          </h3>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed mt-5 line-clamp-3">
          {description}
        </p>

        {/* Product Info */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-2xl border border-zinc-800 bg-black/40 p-3">
            <p className="text-zinc-500 text-[10px] uppercase tracking-[2px]">
              Fit
            </p>

            <p className="text-white text-sm mt-1 capitalize">{fit}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/40 p-3">
            <p className="text-zinc-500 text-[10px] uppercase tracking-[2px]">
              Fabric
            </p>

            <p className="text-white text-sm mt-1">{fabric}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/40 p-3">
            <p className="text-zinc-500 text-[10px] uppercase tracking-[2px]">
              Print
            </p>

            <p className="text-white text-sm mt-1">{printType}</p>
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-6">
          <p className="text-zinc-500 text-xs uppercase tracking-[3px] mb-3">
            Available Sizes
          </p>

          <div className="flex flex-wrap gap-3">
            {size.map((item) => (
              <div
                key={item}
                className="h-10 w-10 rounded-full border border-green-500/30 bg-black/50 flex items-center justify-center text-sm font-semibold uppercase text-white hover:border-green-400 transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-8">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star
              size={18}
              className="fill-green-400 text-green-400"
            />

            <p className="text-white font-semibold">
              {averageRating}
            </p>

            <span className="text-zinc-500 text-sm">
              ({reviews.length} reviews)
            </span>
          </div>

          {/* Button */}
          <button className="group/button relative overflow-hidden rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-black transition duration-300 hover:scale-105 hover:bg-green-400 shadow-[0_0_25px_rgba(34,197,94,0.35)]">
            <span className="relative z-10 flex items-center gap-2">
              <ShoppingBag size={18} />
              Buy Now
            </span>

            <div className="absolute inset-0 translate-y-full bg-white/20 transition duration-500 group-hover/button:translate-y-0" />
          </button>
        </div>
      </div>

      {/* Border Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent group-hover:border-green-400/40 transition duration-500" />
    </motion.div>
    </Link>
  );
};

export default ProductCard;