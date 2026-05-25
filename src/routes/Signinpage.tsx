import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithGoogle, signInAuthUserWithEmailAndPassword } from "../utils/firebase";
import {useState} from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

 const defaultFormFields = {
    email: "",
    password: ""
};

const SignInPage = () => {

const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;
  const navigate = useNavigate();
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {

  event.preventDefault();

  try {

    const response =
      await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

    if (!response) return;

    const { user } = response;

    // BLOCK UNVERIFIED USERS
    if (!user.emailVerified) {

      await signOutAuthUser();

      alert(
        "Please verify your email before signing in."
      );

      return;
    }

    // VERIFIED USER
    alert("Signed in successfully");

    navigate("/myprofile");

    setFormFields(defaultFormFields);

  } catch (error: any) {

    switch (error.code) {

      case "auth/wrong-password":
        alert(
          "Incorrect password for email"
        );
        break;

      case "auth/user-not-found":
        alert(
          "No user associated with this email"
        );
        break;

      case "auth/invalid-credential":
        alert(
          "Invalid email or password"
        );
        break;

      default:
        alert(
          "Error signing in: " +
          error.message
        );
    }

    console.log(
      "Sign in encountered an error",
      error
    );
  }
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-lime-400/20 blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-100px] h-[300px] w-[300px] rounded-full bg-lime-500/10 blur-3xl" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(132,255,0,0.08)]"
      >

        {/* Top Accent */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-lime-400 to-transparent" />

        {/* Logo / Brand */}
        <div className="flex justify-center">
          <div className="rounded-2xl border border-lime-400/20 bg-lime-400/10 px-4 py-2 shadow-lg shadow-lime-400/10">
            <h2 className="text-sm font-black tracking-[0.35em] text-lime-400">
              POUND FOR POUND
            </h2>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Continue your journey with the future of elite performance wear.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Access
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
          <form 
            onSubmit={handleSubmit}
            className="space-y-5 mt-5"
          >
             <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 px-5 py-4 rounded-xl outline-none focus:border-lime-400 transition-all duration-300"
            />

            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 px-5 py-4 rounded-xl outline-none focus:border-lime-400 transition-all duration-300"
            />

            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(163,230,53,0.4)]"
            >
              Login
            </button>
          </form>

        {/* Sign In Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.015 }}
          onClick={signInWithGoogle}
          className="mt-5 group relative w-full overflow-hidden rounded-2xl bg-lime-400 py-4 font-bold text-black transition-all duration-300 hover:bg-lime-300"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="relative flex items-center justify-center gap-3 text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-6 w-6"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.4-6.2 6.9l6.2 5.2C39.9 36.5 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z"
              />
            </svg>

            Sign In With Google
          </span>
        </motion.button>
       
          

        {/* Signup Redirect */}
        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500">
            Don’t have an account?
          </p>

          <Link
            to="/signup"
            className="mt-3 inline-flex items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-5 py-3 text-sm font-semibold text-lime-400 transition-all duration-300 hover:border-lime-400/40 hover:bg-lime-400/20"
          >
            Create Account
          </Link>
        </div>

         <div className="mt-5 text-center">
         

          <Link
            to="/reset-password"
            className="mt-3 inline-flex items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-5 py-3 text-sm font-semibold text-lime-400 transition-all duration-300 hover:border-lime-400/40 hover:bg-lime-400/20"
          >
            Forgot password? 
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-white/5 pt-5 text-center">
          <p className="text-xs tracking-wide text-zinc-600">
            Secure authentication powered by Firebase
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage;