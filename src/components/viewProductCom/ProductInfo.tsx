import { Star } from "lucide-react";

type Review = {
  userEmail: string;
  rating: number;
  comment: string;
};

type ProductInfoProps = {
  product: {
    productName: string;
    price: number;
    description: string;
    reviews: Review[];
  };
};

const ProductInfo = ({
  product,
}: ProductInfoProps) => {
  const reviewCount = product.reviews.length;

  const averageRating =
    reviewCount > 0
      ? (
          product.reviews.reduce(
            (total, review) =>
              total + review.rating,
            0
          ) / reviewCount
        ).toFixed(1)
      : "0.0";

  return (
    <section className="space-y-6">
      {/* Brand Tags */}

      <div className="flex flex-wrap gap-2">
        <span
          className="
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
            border
            border-lime-500/20
            bg-lime-500/10
            text-lime-400
          "
        >
          LIMITED DROP
        </span>

        <span
          className="
            px-3
            py-1
            rounded-full
            text-xs
            border
            border-zinc-800
            text-zinc-400
          "
        >
          PREMIUM STREETWEAR
        </span>

        <span
          className="
            px-3
            py-1
            rounded-full
            text-xs
            border
            border-zinc-800
            text-zinc-400
          "
        >
          POUND FOR POUND
        </span>
      </div>

      {/* Product Name */}

      <div>
        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            tracking-tight
            leading-none
          "
        >
          {product.productName}
        </h1>
      </div>

      {/* Rating */}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star
            size={18}
            className="
              fill-lime-400
              text-lime-400
            "
          />

          <span
            className="
              font-semibold
              text-white
            "
          >
            {averageRating}
          </span>
        </div>

        <span
          className="
            text-zinc-500
            text-sm
          "
        >
          ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}

      <div>
        <h2
          className="
            text-4xl
            font-bold
            text-lime-400
          "
        >
          ₹{product.price}
        </h2>
      </div>

      {/* Description */}

      <div
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-white/[0.02]
          backdrop-blur-xl
          p-6
        "
      >
        <h3
          className="
            text-lg
            font-semibold
            mb-3
          "
        >
          Description
        </h3>

        <p
          className="
            text-zinc-400
            leading-relaxed
          "
        >
          {product.description}
        </p>
      </div>

      {/* Shipping / Quality Notes */}

      <div
        className="
          grid
          sm:grid-cols-3
          gap-3
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-white/[0.02]
            p-4
          "
        >
          <p
            className="
              text-xs
              text-zinc-500
              uppercase
              mb-1
            "
          >
            Quality
          </p>

          <p
            className="
              text-sm
              font-medium
            "
          >
            Premium Build
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-white/[0.02]
            p-4
          "
        >
          <p
            className="
              text-xs
              text-zinc-500
              uppercase
              mb-1
            "
          >
            Delivery
          </p>

          <p
            className="
              text-sm
              font-medium
            "
          >
            Pan India
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-white/[0.02]
            p-4
          "
        >
          <p
            className="
              text-xs
              text-zinc-500
              uppercase
              mb-1
            "
          >
            Returns
          </p>

          <p
            className="
              text-sm
              font-medium
            "
          >
            Easy Exchange
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;