import { motion } from "framer-motion";
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
console.log("Average Rating:", averageRating);
console.log("Reviews:", reviews);
console.log("size:", size);
console.log("fit:", fit);
console.log("fabric:", fabric);
console.log("printType:", printType);
      
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
          className="h-[180px] md:h-[350px] w-full object-cover group-hover:scale-110 transition duration-700"
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
        

        {/* Sizes */}
      

        {/* Bottom */}
    
      </div>

      {/* Border Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent group-hover:border-green-400/40 transition duration-500" />
    </motion.div>
    </Link>
  );
};

export default ProductCard;