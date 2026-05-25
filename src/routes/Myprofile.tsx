import { useContext } from "react";
import { motion } from "framer-motion";
import { LogOut, User, Mail, ShieldCheck } from "lucide-react";

import { UserContext } from "../contexts/userContext";
import {signOutAuthUser} from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      signOutAuthUser();
      alert("Signed out successfully");
      setCurrentUser(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-green-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-lime-400/10 blur-[120px] rounded-full" />

      <div className="relative z-10 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8"
        >
          {/* top section */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-lime-500 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User size={42} className="text-black" />
              )}
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-wide uppercase">
              Pound Member
            </h1>

            <p className="text-green-400 text-sm mt-1 font-medium">
              AUTHENTICATED USER
            </p>
          </div>

          {/* info cards */}
          <div className="mt-10 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <User className="text-green-400" size={20} />
              </div>

              <div>
                <p className="text-xs text-gray-400">USERNAME</p>
                <h2 className="font-semibold">
                  {currentUser?.displayName || "Unknown User"}
                </h2>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <Mail className="text-green-400" size={20} />
              </div>

              <div>
                <p className="text-xs text-gray-400">EMAIL</p>
                <h2 className="font-semibold break-all">
                  {currentUser?.email}
                </h2>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <ShieldCheck className="text-green-400" size={20} />
              </div>

              <div>
                <p className="text-xs text-gray-400">STATUS</p>
                <h2 className="font-semibold text-green-400">
                  VERIFIED MEMBER
                </h2>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="mt-10 flex flex-col gap-4">
            <button onClick={() => navigate("/")}
              className="w-full py-3 rounded-2xl bg-green-500 text-black font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              Explore Drops
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-400 font-semibold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all duration-300"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;