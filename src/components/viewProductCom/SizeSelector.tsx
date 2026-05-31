import { useState } from "react";
import { Ruler } from "lucide-react";


type SizeSelectorProps = {
  sizes: string[];
};

const SizeSelector = ({
  sizes,
}: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] =
    useState<string>("");

  return (
    <section
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-white/[0.02]
        backdrop-blur-xl
        p-6
      "
    >
      <div className="flex items-center gap-2 mb-5">
        <Ruler
          size={18}
          className="text-lime-400"
        />

        <h2
          className="
            text-lg
            font-semibold
            tracking-wide
          "
        >
          Select Size
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => {
          const isSelected =
            selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              aria-label={`Select size ${size}`}
              aria-pressed={isSelected}
              onClick={() =>
                setSelectedSize(size)
              }
              className={`
                min-w-[60px]
                h-12
                px-4
                rounded-2xl
                border
                text-sm
                font-medium
                transition-all
                duration-300
                focus:outline-none
                focus:ring-2
                focus:ring-lime-400

                ${
                  isSelected
                    ? `
                      border-lime-400
                      bg-lime-400
                      text-black
                      shadow-[0_0_20px_rgba(132,255,0,0.35)]
                    `
                    : `
                      border-zinc-700
                      text-zinc-300
                      hover:border-lime-400/60
                      hover:text-white
                      hover:bg-zinc-900
                    `
                }
              `}
            >
              {size.toUpperCase()}
            </button>
          );
        })}
      </div>

      <div className="mt-5 min-h-[24px]">
        {selectedSize ? (
          <p
            className="
              text-sm
              text-lime-400
              font-medium
            "
          >
            Selected Size:{" "}
            {selectedSize.toUpperCase()}
          </p>
        ) : (
          <p
            className="
              text-sm
              text-zinc-500
            "
          >
            Choose your preferred fit
          </p>
        )}
        
      </div>
    </section>
  );
};

export default SizeSelector;