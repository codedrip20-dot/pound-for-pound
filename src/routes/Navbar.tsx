import { useEffect, useRef, useState, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";

import logo from "../assets/box.png";
import two from "../assets/218.png";
import { UserContext } from "../contexts/userContext";



const navContainer: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const navItem: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser } = useContext(UserContext);

  const navRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/market" },
    { name: "About", path: "/aboutus" },
    { name: currentUser ? "My Profile" : "Sign In", path: currentUser ? "/myprofile" : "/signin" },
  ];
 


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!glowRef.current) return;

    gsap.to(glowRef.current, {
      x: 80,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        variants={navContainer}
        initial="hidden"
        animate="visible"
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-green-500/20 bg-black/70 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "bg-black/30 py-4 backdrop-blur-xl"
        }`}
      >
        {/* Glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-0 top-0 h-24 w-40 rounded-full bg-green-500/10 blur-[80px]"
        />

        {/* Top Light */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/60 to-transparent" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">

            {/* Logo */}
            <motion.div variants={navItem}>
              <Link to="/" className="group relative flex items-center">

                <div className="absolute inset-0 rounded-full bg-green-500/20 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="absolute -left-10 top-0 h-full w-10 rotate-12 bg-white/10 blur-xl opacity-0 transition duration-700 group-hover:left-24 group-hover:opacity-100" />

                <img
                  src={two}
                  alt="218 logo"
                  className={`relative object-contain transition-all duration-500 group-hover:scale-105 ${
                    scrolled ? "w-16 md:w-20" : "w-20 md:w-24"
                  }`}
                />
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <motion.div
              variants={navItem}
              className="hidden items-center gap-10 rounded-full border border-white/5 bg-white/[0.03] px-8 py-4 backdrop-blur-2xl md:flex"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `group relative text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive
                        ? "text-green-400"
                        : "text-gray-300 hover:text-green-300"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">
                        {link.name}
                      </span>

                      <div className="absolute inset-0 rounded-full bg-green-500/0 blur-xl transition-all duration-300 group-hover:bg-green-500/10" />

                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-3 left-0 h-[2px] w-full rounded-full bg-green-400 shadow-[0_0_12px_#22c55e]"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </motion.div>

            {/* Desktop CTA */}
            <motion.div
              variants={navItem}
              className="hidden items-center gap-4 md:flex"
            >
              <Link to="/cart">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-green-400/30 bg-green-500 px-7 py-3 font-semibold text-black shadow-[0_0_20px_rgba(34,197,94,0.35)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.55)]"
                >
                  <div className="absolute -left-20 top-0 h-full w-10 rotate-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[120%]" />

                  <span className="relative z-10">
                    Buy Now
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Mobile Button */}
            <motion.button
              variants={navItem}
              onClick={() => setOpen(!open)}
              className="relative flex items-center justify-center md:hidden "
            >
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl" />

              <div className="absolute h-12 w-12 rounded-full border border-green-500/20" />

              <motion.img
                animate={{
                  rotate: open ? 180 : 0,
                  scale: open ? 1.08 : 1,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
                src={logo}
                alt="menu"
              className="relative z-10 h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(132,255,0,0.7)]"
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              />

              {/* Panel */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: -30,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className="absolute left-4 right-4 top-24 overflow-hidden rounded-3xl border border-green-500/20 bg-black/80 backdrop-blur-2xl md:hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_70%)]" />

                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />

                <div className="relative flex flex-col gap-3 p-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between rounded-2xl border px-5 py-4 text-lg font-medium transition-all duration-300 ${
                            isActive
                              ? "border-green-500/30 bg-green-500/10 text-green-400"
                              : "border-white/5 bg-white/[0.03] text-gray-300 hover:border-green-500/20 hover:bg-green-500/5 hover:text-green-300"
                          }`
                        }
                      >
                        {link.name}

                        <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#22c55e]" />
                      </NavLink>
                    </motion.div>
                  ))}

                  <Link to="/cart" onClick={() => setOpen(false)}>
                    <motion.button
                      whileTap={{
                        scale: 0.96,
                      }}
                      className="mt-3 w-full rounded-2xl border border-green-400/30 bg-green-500 px-6 py-4 font-semibold text-black shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]"
                    >
                      Buy Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="min-h-screen bg-black pt-24">
        <Outlet />
      </main>
    </>
  );
}