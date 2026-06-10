import {
  ShoppingBag,
  PlusCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AdminNav = () => {
  const navLinkStyle =
    "flex items-center gap-3 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition";

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}

      <aside className="w-72 border-r border-zinc-800 p-6">
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              text-3xl
              font-bold
              tracking-wide
              bg-gradient-to-r
              from-white
              via-zinc-300
              to-zinc-500
              bg-clip-text
              text-transparent
            "
          >
            Pound For Pound
          </motion.h1>

          <p className="text-zinc-400 text-sm mt-1">
            Admin Dashboard
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
            <NavLink
              to="orders"
              className={navLinkStyle}
            >
              <ShoppingBag size={20} />
              Orders
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
            <NavLink
              to="addProduct"
              className={navLinkStyle}
            >
              <PlusCircle size={20} />
              Add Product
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
            <NavLink
              to="editPrices"
              className={navLinkStyle}
            >
              <Pencil size={20} />
              Edit Prices
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
            <NavLink
              to="deleteProduct"
              className={navLinkStyle}
            >
              <Trash2 size={20} />
              Delete Product
            </NavLink>
          </motion.div>
        </nav>

        <div className="mt-10 border-t border-zinc-800 pt-6">
          <p className="text-xs text-zinc-500">
            Pound For Pound™
          </p>

          <p className="text-xs text-zinc-600 mt-1">
            Internal Management System
          </p>
        </div>
      </aside>

      {/* Main Area */}

      <main className="flex-1 p-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default AdminNav;