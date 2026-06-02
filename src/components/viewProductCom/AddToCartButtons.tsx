import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "../../contexts/cartContext";
import { useNavigate } from "react-router-dom";

type Product = {
  uid: string;
  productName: string;
  price: number;
  stockQuantity: number;
  productImages: string[];
};

type AddToCartButtonsProps = {
  product: Product;
  selectedSize: string;
};
const AddToCartButtons = ({
  product,
  selectedSize,
}: AddToCartButtonsProps) => {

    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
            if (!selectedSize) {
                alert("Please select a size");
                return;
            }

            addToCart({
                uid: product.uid,
                productName: product.productName,
                imageUrl: product.productImages[0],
                price: product.price,
                selectedSize,
                productImages: product.productImages,
            });
            navigate('/cart');
            };


  const isOutOfStock =
    product.stockQuantity <= 0;
 console.log('the product and the selected size inside AddToCartButtons is: ', product, selectedSize);
  return (
    <section className="space-y-4">
      {/* Stock Indicator */}

      <div
        className="
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-zinc-800
          bg-white/[0.02]
          px-5
          py-4
        "
      >
        <span className="text-sm text-zinc-400">
          Availability
        </span>

        <span
          className={`
            text-sm
            font-semibold

            ${
              isOutOfStock
                ? "text-red-400"
                : product.stockQuantity <= 10
                ? "text-yellow-400"
                : "text-lime-400"
            }
          `}
        >
          {isOutOfStock
            ? "Out of Stock"
            : product.stockQuantity <= 10
            ? `${product.stockQuantity} Left`
            : "In Stock"}
        </span>
      </div>

      {/* Action Buttons */}

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Add To Cart */}

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="
            group
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-lime-400
            px-6
            py-4
            font-semibold
            text-lime-400
            transition-all
            duration-300

            hover:bg-lime-400/10
            hover:shadow-[0_0_25px_rgba(132,255,0,0.15)]

            disabled:pointer-events-none
            disabled:opacity-50
          "
        >
          <ShoppingCart
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />

          <span>Add To Cart</span>
        </button>

        {/* Buy Now */}

        <button
          type="button"
          disabled={isOutOfStock}
          className="
            group
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-lime-400
            px-6
            py-4
            font-bold
            text-black
            transition-all
            duration-300

            hover:scale-[1.02]
            hover:shadow-[0_0_30px_rgba(132,255,0,0.35)]

            disabled:pointer-events-none
            disabled:opacity-50
          "
        >
          <Zap
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:rotate-12
            "
          />

          <span>Buy Now</span>
        </button>
      </div>

      {/* Trust Indicators */}

      <div
        className="
          grid
          grid-cols-3
          gap-3
          pt-2
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-white/[0.02]
            p-3
            text-center
          "
        >
          <p className="text-xs text-zinc-500">
            Delivery
          </p>

          <p
            className="
              mt-1
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
            p-3
            text-center
          "
        >
          <p className="text-xs text-zinc-500">
            Exchange
          </p>

          <p
            className="
              mt-1
              text-sm
              font-medium
            "
          >
            7 Days
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-white/[0.02]
            p-3
            text-center
          "
        >
          <p className="text-xs text-zinc-500">
            Quality
          </p>

          <p
            className="
              mt-1
              text-sm
              font-medium
            "
          >
            Premium
          </p>
        </div>
      </div>
    </section>
  );
};

export default AddToCartButtons;