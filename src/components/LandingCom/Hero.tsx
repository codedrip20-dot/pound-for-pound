import { useEffect, useRef } from "react";
import { motion} from "framer-motion";
import type { Variants } from "framer-motion";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";

import heroBg from "../../assets/hero-bg.png";
import box from "../../assets/box.png";
import logo from "../../assets/logo.png";

const fadeUp = (
  delay = 0,
  y = 40
): Variants => ({
  hidden: {
    opacity: 0,
    y,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const floatingAnimation = {
  y: [0, -12, 0],
  rotate: [0, 1.5, 0],
};

const Hero = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;

    gsap.to(glowRef.current, {
      x: 40,
      y: -20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />

      {/* CYBER GRID */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* DARK ATMOSPHERIC OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px]" />

      {/* MOVING GLOW */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/20 blur-[140px]"
      />

      {/* NOISE LAYER */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* RADIAL LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),transparent_60%)]" />

      {/* CONTENT */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-20 px-6 py-32 lg:flex-row lg:gap-10"
      >

        {/* LEFT CONTENT */}
        <motion.div
          variants={fadeUp()}
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
        >

          {/* SMALL TAG */}
          <motion.div
            variants={fadeUp(0.1)}
            className="mb-5 flex items-center gap-2 rounded-full border border-green-500/20 bg-white/5 px-4 py-2 backdrop-blur-xl"
          >
            <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#22c55e]" />
            <span className="text-xs uppercase tracking-[0.25em] text-green-300">
              Limited Edition Drop
            </span>
          </motion.div>

          {/* LOGO */}
          <motion.img
            variants={fadeUp(0.15)}
            src={logo}
            alt="Pound For Pound Logo"
            className="mb-8 w-40 md:w-52"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* HEADLINE */}
          <motion.h1
            variants={fadeUp(0.2)}
            className="max-w-2xl text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl xl:text-[8rem]"
          >
            BUILT
            <br />
            <span className="text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
              DIFFERENT.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            variants={fadeUp(0.3)}
            className="mt-6 max-w-lg text-sm leading-relaxed text-gray-300 md:text-lg"
          >
            Limited drop engineered for movement, pressure, and presence.
            Crafted for those who refuse average. No mass production. No weak fits.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            variants={fadeUp(0.4)}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >

            {/* PRIMARY BUTTON */}
            <button className="group relative overflow-hidden rounded-2xl border border-green-400/30 bg-green-500 px-7 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(34,197,94,0.45)]">

              <span className="relative z-10">Buy Now</span>

              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>

            {/* SECONDARY BUTTON */}
            <button className="group rounded-2xl border border-green-500/30 bg-white/5 px-7 py-3 font-semibold text-green-300 backdrop-blur-xl transition-all duration-300 hover:border-green-400 hover:bg-green-500/10 hover:text-white hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]">
              Explore Collection
            </button>
          </motion.div>

          {/* STATS */}
          <motion.div
            variants={fadeUp(0.5)}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center lg:justify-start"
          >

            <div>
              <h3 className="text-2xl font-black text-green-400">218</h3>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                Limited Units
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-green-400">24H</h3>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                Fast Sellout
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-green-400">EST.</h3>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                Underground Brand
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT PRODUCT */}
        <motion.div
          variants={fadeUp(0.2)}
          className="relative flex flex-1 items-center justify-center"
        >

          {/* GLOW */}
          <div className="absolute h-[350px] w-[350px] rounded-full bg-green-500/20 blur-[100px] md:h-[500px] md:w-[500px]" />

          {/* RING */}
          <div className="absolute h-[320px] w-[320px] rounded-full border border-green-500/10 md:h-[550px] md:w-[550px]" />

          {/* PRODUCT CARD */}
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1400}
            scale={1.03}
            transitionSpeed={1800}
            gyroscope={true}
            glareEnable={true}
            glareMaxOpacity={0.08}
            className="relative"
          >

            {/* GLASS PANEL */}
            <div className="absolute inset-0 rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-xl" />

            {/* PRODUCT IMAGE */}
            <motion.img
              src={box}
              alt="Pound For Pound Product"
              className="relative z-10 w-[320px] object-contain drop-shadow-[0_0_45px_rgba(34,197,94,0.35)] md:w-[700px]"
              animate={floatingAnimation}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* REFLECTION */}
            <div className="absolute bottom-0 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-green-500/20 blur-3xl" />
          </Tilt>
        </motion.div>
      </motion.div>

      {/* TOP LIGHT */}
      <div className="absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-green-500/10 to-transparent" />

      {/* VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 bg-black/20 [box-shadow:inset_0_0_180px_rgba(0,0,0,0.9)]" />
    </section>
  );
};

export default Hero;