import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/productContext";
import { useEffect, useState } from "react";

import ProductGallery from "../components/viewProductCom/ProductGallery";
import ProductInfo from "../components/viewProductCom/ProductInfo";
import SizeSelector from "../components/viewProductCom/SizeSelector";
import AddToCartButtons from "../components/viewProductCom/AddToCartButtons";
import ProductSpecs from "../components/viewProductCom/ProductSpecs";
import RelatedProducts from "../components/viewProductCom/RelatedProducts";

const ViewProduct = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { uid } = useParams();
  const { products } = useProducts();

  const product = products.find(
    (item) => item.uid === uid
  );
  const [selectedSize, setSelectedSize] = useState("");
  if (!product) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-2xl font-bold text-white">
          Product Not Found
        </h1>
      </section>
    );
  }

  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category &&
      item.uid !== product.uid
  );
  console.log("the selected Size inside ViewProduct is: ", selectedSize);

  return (
    <main
      className="
        relative
        min-h-screen
        bg-black
        text-white
        pt-28
        pb-20
        overflow-hidden
      "
    >
      {/* Ambient Glow */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          bg-lime-500/10
          blur-[180px]
          rounded-full
          pointer-events-none
        "
      />

      {/* Streetwear Grid Texture */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.05]
          bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HERO SECTION ================= */}

        <section className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* Product Images */}
          <div className="lg:sticky lg:top-28">
            <ProductGallery
              images={product.productImages}
              productName={product.productName}
            />
          </div>

          {/* Product Content */}
          <div className="space-y-6">
            <ProductInfo
              product={product}
            />

            <SizeSelector
              sizes={product.size}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            <AddToCartButtons
              product={product}
              selectedSize={selectedSize}
             
            />
          </div>
        </section>

        {/* ================= PRODUCT DETAILS ================= */}

        <section className="mt-20">
          <div
            className="
              rounded-3xl
              border
              border-lime-500/20
              bg-zinc-950
              p-6
              md:p-8
            "
          >
            <ProductSpecs
              product={product}
            />
          </div>
        </section>

        {/* ================= RELATED PRODUCTS ================= */}

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <RelatedProducts
              products={relatedProducts}
            />
          </section>
        )}
      </div>
    </main>
  );
};

export default ViewProduct;