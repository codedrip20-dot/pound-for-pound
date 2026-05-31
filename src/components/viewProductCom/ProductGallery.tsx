import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductImage = {
  id: number;
  imageUrl: string;
  altText: string;
};

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

const ProductGallery = ({
  images,

}: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const imageCount = images.length;

  const nextImage = useCallback(() => {
    if (imageCount <= 1) return;

    setDirection(1);

    setSelectedIndex((prev) =>
      prev === imageCount - 1 ? 0 : prev + 1
    );
  }, [imageCount]);

  const previousImage = useCallback(() => {
    if (imageCount <= 1) return;

    setDirection(-1);

    setSelectedIndex((prev) =>
      prev === 0 ? imageCount - 1 : prev - 1
    );
  }, [imageCount]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [nextImage, previousImage]);

  if (!images?.length) {
    return (
      <div
        className="
          h-[500px]
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900
          flex
          items-center
          justify-center
        "
      >
        <p className="text-zinc-500">
          No images available
        </p>
      </div>
    );
  }

  const currentImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-lime-500/20
          bg-zinc-950
          shadow-[0_0_40px_rgba(132,255,0,0.08)]
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-lime-400/5
            via-transparent
            to-transparent
          "
        />

        <div className="relative aspect-square">
          <AnimatePresence
            mode="wait"
            custom={direction}
          >
            <motion.img
              key={currentImage.id}
              src={currentImage.imageUrl}
              alt={currentImage.altText}
              loading="lazy"
              draggable={false}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 100 : -100,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -100 : 100,
              }}
              transition={{
                duration: 0.3,
              }}
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) {
                  nextImage();
                }

                if (info.offset.x > 80) {
                  previousImage();
                }
              }}
              className="
                h-full
                w-full
                object-cover
                select-none
              "
            />
          </AnimatePresence>

          {/* Counter */}

          <div
            className="
              absolute
              bottom-4
              right-4
              px-3
              py-1
              rounded-full
              bg-black/70
              backdrop-blur-xl
              text-sm
              font-medium
            "
          >
            {selectedIndex + 1}/{imageCount}
          </div>

          {/* Previous */}

          {imageCount > 1 && (
            <>
              <button
                onClick={previousImage}
                aria-label="Previous Image"
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  h-10
                  w-10
                  rounded-full
                  bg-black/70
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  hover:text-lime-400
                  transition
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextImage}
                aria-label="Next Image"
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  h-10
                  w-10
                  rounded-full
                  bg-black/70
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  hover:text-lime-400
                  transition
                "
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail Strip */}

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-none
        "
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() =>
              setSelectedIndex(index)
            }
            className={`
              relative
              shrink-0
              overflow-hidden
              rounded-2xl
              border
              transition-all
              duration-300

              ${
                selectedIndex === index
                  ? "border-lime-400 shadow-[0_0_15px_rgba(132,255,0,0.35)]"
                  : "border-zinc-800 hover:border-lime-400/50"
              }
            `}
          >
            <img
              src={image.imageUrl}
              alt={image.altText}
              loading="lazy"
              className="
                h-20
                w-20
                object-cover
              "
            />
          </button>
        ))}
      </div>

      {/* Product Badge */}

      <div className="flex flex-wrap gap-2">
        <span
          className="
            px-3
            py-1
            rounded-full
            text-xs
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
    </div>
  );
};

export default ProductGallery;