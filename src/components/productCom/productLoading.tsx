import { motion } from "framer-motion";

const ProductLoading = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8">
      {/* Animated Logo */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
      />

      {/* Brand Text */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold tracking-widest uppercase"
        >
          Pound For Pound
        </motion.h2>
      </div>

      {/* Loading Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: dot * 0.15,
            }}
            className="w-3 h-3 rounded-full bg-white"
          />
        ))}
      </div>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="text-gray-400 tracking-wider"
      >
        Loading products...
      </motion.p>
    </div>
  );
};

export default ProductLoading;