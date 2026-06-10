import { useMemo, useState } from "react";
import { useProducts } from "../contexts/productContext.tsx";
import productBackground from "../assets/productBackground.png";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Flame,
  Clock3,
} from "lucide-react";

import ProductCard from "../components/productCom/productCard.tsx";
import ProductLoading from "../components/productCom/productLoading.tsx";

const categories = [
  "all",
  "tshirt",
  "hoodie",
  "jacket",
  "cargo",
  "joggers",
];

const tabs = [
  {
    name: "Newest",
    icon: Clock3,
  },
  {
    name: "Trending",
    icon: Flame,
  },
  {
    name: "Limited",
    icon: Sparkles,
  },
];

const Marketpage = () => {
  const { products, loading } = useProducts();

  const [activeCategory, setActiveCategory] =
    useState("all");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("Newest");

   

const filteredProducts = useMemo(() => {
  return products.filter((product: any) => {

    const hasImages =
      product.productImages &&
      product.productImages.length > 0;

    const matchesCategory =
      activeCategory === "all"
        ? true
        : product.category === activeCategory;

    const matchesSearch =
      product.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return (
      hasImages &&
      matchesCategory &&
      matchesSearch
    );
  });
}, [
  products,
  activeCategory,
  searchQuery,
]);

    if (loading) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <ProductLoading />
      </section>
    );
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${productBackground})`,
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* GLOWS */}
      <div className="absolute top-[-200px] left-[-100px] h-[450px] w-[450px] rounded-full bg-green-500/20 blur-[150px]" />

      <div className="absolute bottom-[-200px] right-[-100px] h-[400px] w-[400px] rounded-full bg-green-500/10 blur-[150px]" />

      <div className="relative z-10 px-5 md:px-10 xl:px-16 py-28">
        <div className="mx-auto max-w-7xl">
        

          {/* CONTROLS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            viewport={{
              once: true,
            }}
            className="sticky top-6 z-30 mt-12 rounded-[30px] border border-green-500/10 bg-black/40 backdrop-blur-2xl p-6"
          >
            <div className="flex flex-col gap-6">
              {/* TOP */}
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                {/* SEARCH */}
                <div className="relative w-full xl:max-w-md">
                  <Search
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(
                        e.target.value
                      )
                    }
                    className="h-14 w-full rounded-full border border-green-500/10 bg-black/50 pl-14 pr-6 text-white outline-none placeholder:text-zinc-600 focus:border-green-400/40"
                  />
                </div>

                {/* TABS */}
                <div className="flex flex-wrap gap-3">
                  {tabs.map((tab) => {
                    const Icon =
                      tab.icon;

                    return (
                      <button
                        key={tab.name}
                        onClick={() =>
                          setActiveTab(
                            tab.name
                          )
                        }
                        className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                          activeTab ===
                          tab.name
                            ? "bg-green-500 text-black shadow-[0_0_25px_rgba(74,222,128,0.5)]"
                            : "border border-green-500/10 bg-black/40 text-zinc-300 hover:border-green-400/30"
                        }`}
                      >
                        <Icon size={16} />

                        {tab.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM */}
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                {/* CATEGORY */}
                <div className="flex flex-wrap gap-3">
                  {categories.map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() =>
                          setActiveCategory(
                            category
                          )
                        }
                        className={`rounded-full px-5 py-2 text-xs uppercase tracking-[2px] transition-all duration-300 ${
                          activeCategory ===
                          category
                            ? "bg-green-500 text-black shadow-[0_0_25px_rgba(74,222,128,0.5)]"
                            : "border border-green-500/10 bg-black/40 text-zinc-400 hover:border-green-400/30"
                        }`}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-green-500/10 bg-black/40 px-5 py-3 text-sm text-zinc-400">
                    {
                      filteredProducts.length
                    }{" "}
                    Products
                  </div>

                  <button className="flex items-center gap-2 rounded-full border border-green-500/10 bg-black/40 px-5 py-3 text-sm text-white transition hover:border-green-400/30">
                    <SlidersHorizontal
                      size={16}
                    />

                    Sort
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PRODUCTS */}
          <div className="relative mt-16">
            <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[140px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {filteredProducts.map(
                  (
                    product: any,
                    index: number
                  ) => (
                    <motion.div
                      key={product.uid}
                      initial={{
                        opacity: 0,
                        y: 50,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.08,
                        duration: 0.5,
                      }}
                      viewport={{
                        once: true,
                      }}
                    >
                      <ProductCard
                        {...product}
                      />
                    </motion.div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketpage;