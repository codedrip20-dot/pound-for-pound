import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/productContext";

import ProductGallery from "../components/viewProductCom/ProductGallery";
import ProductInfo from "../components/viewProductCom/ProductInfo";
import SizeSelector from "../components/viewProductCom/SizeSelector";
import AddToCartButtons from "../components/viewProductCom/AddToCartButtons";
import ProductSpecs from "../components/viewProductCom/ProductSpecs";
import RelatedProducts from "../components/viewProductCom/RelatedProducts";




const ViewProduct = () => {
  const { uid } = useParams();

  const { products } = useProducts();

  const product = products.find(
    (item) => item.uid === uid
  );

  if (!product) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white text-2xl">
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

  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        pt-28
        pb-20
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            lg:grid-cols-2
            gap-12
            items-start
          "
        >
          <ProductGallery
            images={product.productImages}
            productName={product.productName}
          />

          <div className="space-y-8">
            <ProductInfo product={product} />

            <SizeSelector
              sizes={product.size}
            />

            <AddToCartButtons
              product={product}
            />

            <ProductSpecs
              product={product}
            />
          </div>
        </div>

        <section className="mt-24">
          <RelatedProducts
            products={relatedProducts}
          />
        </section>
      </div>
    </main>
  );
};

export default ViewProduct