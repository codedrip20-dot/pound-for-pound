import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type ProductImage = {
  id: number;
  imageUrl: string;
  altText: string;
};

type Product = {
  uid: string;
  productName: string;
  price: number;
  category: string;
  productImages: ProductImage[];
};

type RelatedProductsProps = {
  products: Product[];
};

const RelatedProducts = ({
  products,
}: RelatedProductsProps) => {
  if (!products.length) {
    return null;
  }

  return (
    <section className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2
            className="
              text-3xl
              font-black
              tracking-tight
            "
          >
            You May Also Like
          </h2>

          <p
            className="
              mt-2
              text-zinc-500
            "
          >
            More pieces from the same drop.
          </p>
        </div>
      </div>

      {/* Products */}

      <div
        className="
          flex
          gap-5
          overflow-x-auto
          pb-4

          lg:grid
          lg:grid-cols-4
          lg:overflow-visible
        "
      >
        {products.map((product) => (
          <Link
            key={product.uid}
            to={`/product/${product.uid}`}
            className="
              group
              shrink-0
              w-[280px]

              lg:w-auto
            "
          >
            <article
              className="
                overflow-hidden
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-950
                transition-all
                duration-300

                hover:border-lime-400/30
                hover:shadow-[0_0_30px_rgba(132,255,0,0.08)]
              "
            >
              {/* Image */}

              <div
                className="
                  overflow-hidden
                  aspect-square
                "
              >
                <img
                  src={
                    product.productImages[0]
                      ?.imageUrl
                  }
                  alt={
                    product.productImages[0]
                      ?.altText ??
                    product.productName
                  }
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500

                    group-hover:scale-105
                  "
                />
              </div>

              {/* Content */}

              <div className="p-5">
                <div
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-lime-500/20
                    bg-lime-500/10
                    px-3
                    py-1
                    text-xs
                    text-lime-400
                    mb-4
                  "
                >
                  LIMITED DROP
                </div>

                <h3
                  className="
                    text-lg
                    font-semibold
                    line-clamp-2
                    mb-2
                  "
                >
                  {product.productName}
                </h3>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-xl
                      font-bold
                      text-lime-400
                    "
                  >
                    ₹{product.price}
                  </span>

                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      duration-300

                      group-hover:translate-x-1
                    "
                  />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;