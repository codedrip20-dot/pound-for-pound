import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

    const Nav = useNavigate();
    
  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <ShoppingBag
            size={60}
            className="mx-auto mb-6 text-lime-400"
          />

          <h1 className="text-3xl font-bold mb-3">
            Your Cart Is Empty
          </h1>

          <p className="text-zinc-500">
            Looks like you haven't added
            anything yet.
          </p>
            <button onClick={() => Nav('/market')}  className="group mt-5 rounded-2xl border border-green-500/30 bg-white/5 px-7 py-3 font-semibold text-green-300 backdrop-blur-xl transition-all duration-300 hover:border-green-400 hover:bg-green-500/10 hover:text-white hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]">
              Explore Collection
            </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Shopping Cart
            </h1>

            <p className="mt-2 text-zinc-500">
              {cartCount} item(s)
            </p>
          </div>

          <button
            onClick={clearCart}
            className="
              rounded-xl
              border
              border-red-500
              px-4
              py-2
              text-red-400
              transition
              hover:bg-red-500/10
            "
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Cart Items */}

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={`${item.uid}-${item.selectedSize}`}
                className="
                  flex
                  flex-col
                  gap-5
                  rounded-3xl
                  border
                  border-zinc-800
                  bg-white/[0.03]
                  p-5
                  md:flex-row
                "
              >
                {/* Image */}

                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="
                    h-40
                    w-full
                    rounded-2xl
                    object-cover
                    md:w-40
                  "
                />

                {/* Info */}

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {item.productName}
                  </h2>

                  <div className="mt-2 flex gap-3">
                    <span
                      className="
                        rounded-full
                        border
                        border-lime-400
                        px-3
                        py-1
                        text-xs
                        text-lime-400
                      "
                    >
                      Size {item.selectedSize.toUpperCase()}
                    </span>
                  </div>

                  <p className="mt-4 text-2xl font-bold text-lime-400">
                    ₹{item.price}
                  </p>
                </div>

                {/* Controls */}

                <div
                  className="
                    flex
                    flex-col
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.uid,
                          item.selectedSize
                        )
                      }
                      className="
                        rounded-xl
                        border
                        border-zinc-700
                        p-2
                      "
                    >
                      <Minus size={18} />
                    </button>

                    <span className="w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.uid,
                          item.selectedSize
                        )
                      }
                      className="
                        rounded-xl
                        border
                        border-zinc-700
                        p-2
                      "
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.uid,
                        item.selectedSize
                      )
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      text-red-400
                    "
                  
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}

          <div
            className="
              h-fit
              rounded-3xl
              border
              border-zinc-800
              bg-white/[0.03]
              p-6
              lg:sticky
              lg:top-28
            "
          >
            <h2 className="text-2xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Total Items
                </span>

                <span>{cartCount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Shipping
                </span>

                <span>Free</span>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span
                    className="
                      text-2xl
                      font-bold
                      text-lime-400
                    "
                  >
                    ₹{cartTotal}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="
                mt-8
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-lime-400
                px-6
                py-4
                font-bold
                text-black
                transition
                hover:scale-[1.02]
              "
            >
              Checkout
              <ArrowRight size={20} />
            </button>
          </div>
          <button onClick={() => Nav('/market')}  className="group mt-5 rounded-2xl border border-green-500/30 bg-white/5 px-7 py-3 font-semibold text-green-300 backdrop-blur-xl transition-all duration-300 hover:border-green-400 hover:bg-green-500/10 hover:text-white hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]">
              Explore Collection
            </button>
        </div>
           
      </div>
     
    </section>
  );
};

export default CartPage;