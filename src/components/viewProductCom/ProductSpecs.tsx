import {
  Shirt,
  Package,
  Layers3,
  Box,
} from "lucide-react";

type ProductSpecsProps = {
  product: {
    fabric: string;
    fit: string;
    printType: string;
    stockQuantity: number;
    category: string;
  };
};

const ProductSpecs = ({
  product,
}: ProductSpecsProps) => {
  const specs = [
    {
      icon: Shirt,
      label: "Fabric",
      value: product.fabric,
    },
    {
      icon: Layers3,
      label: "Fit",
      value: product.fit,
    },
    {
      icon: Package,
      label: "Print Type",
      value: product.printType,
    },
    {
      icon: Box,
      label: "Category",
      value: product.category,
    },
  ];

  return (
    <section
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-white/[0.02]
        backdrop-blur-xl
        overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
          px-6
          py-5
          border-b
          border-zinc-800
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-white
          "
        >
          Product Details
        </h2>

        <p
          className="
            text-sm
            text-zinc-500
            mt-1
          "
        >
          Premium specifications and garment information
        </p>
      </div>

      {/* Specs */}

      <div>
        {specs.map((spec) => {
          const Icon = spec.icon;

          return (
            <div
              key={spec.label}
              className="
                flex
                items-center
                justify-between
                px-6
                py-5
                border-b
                border-zinc-800/60
                last:border-b-0
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    h-10
                    w-10
                    rounded-xl
                    bg-lime-500/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon
                    size={18}
                    className="text-lime-400"
                  />
                </div>

                <span
                  className="
                    text-zinc-400
                    text-sm
                    font-medium
                  "
                >
                  {spec.label}
                </span>
              </div>

              <span
                className="
                  text-white
                  font-medium
                  text-right
                "
              >
                {spec.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Stock Status */}

      <div
        className="
          px-6
          py-5
          border-t
          border-zinc-800
          bg-zinc-950/40
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-sm
              text-zinc-400
            "
          >
            Availability
          </span>

          <span
            className={`
              text-sm
              font-semibold

              ${
                product.stockQuantity > 10
                  ? "text-lime-400"
                  : product.stockQuantity > 0
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            `}
          >
            {product.stockQuantity > 10
              ? "In Stock"
              : product.stockQuantity > 0
              ? "Low Stock"
              : "Out of Stock"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;