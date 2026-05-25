import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, sendEmailVerificationToUser } from "../utils/firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;
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

  // PASSWORD CHECK
  if (password !== confirmPassword) {

    alert("Passwords do not match");

    return;
  }

  // EMPTY FIELD CHECK
  if (
    !displayName ||
    !email ||
    !password ||
    !confirmPassword
  ) {

    alert("Please fill all fields");

    return;
  }

  try {

    // CREATE FIREBASE AUTH USER
    const response =
      await createAuthUserWithEmailAndPassword(
        email,
        password
      );

    if (!response) return;

    const { user } = response;

    // SEND VERIFICATION EMAIL
    await sendEmailVerificationToUser(
      user
    );

    // RESET FORM
    setFormFields(defaultFormFields);

    // SUCCESS MESSAGE
    alert(
      "Verification email sent. Please verify your email."
    );

    // REDIRECT TO VERIFY PAGE
    navigate("/verify-email");

  } catch (error: any) {

    // EMAIL ALREADY EXISTS
    if (
      error.code ===
      "auth/email-already-in-use"
    ) {

      alert(
        "This email already exists. Please verify your email before signing in."
      );

      navigate("/verify-email");

      return;
    }

    // WEAK PASSWORD
    if (
      error.code ===
      "auth/weak-password"
    ) {

      alert(
        "Password should be at least 6 characters."
      );

      return;
    }

    // INVALID EMAIL
    if (
      error.code ===
      "auth/invalid-email"
    ) {

      alert(
        "Please enter a valid email address."
      );

      return;
    }

    // DEFAULT ERROR
    alert(
      "Something went wrong. Please try again."
    );

    console.log(
      "User creation encountered an error",
      error
    );
  }
};


  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4 py-10">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-lime-500/20 blur-[140px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-white/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.08)]">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-12 border-r border-white/10">

          <div className="mb-6">
            <h1 className="text-5xl font-black text-white leading-tight">
              Welcome to
              <span className="text-lime-400"> Pound-for-Pound</span>
            </h1>

            <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
              Build your fitness journey, connect with the
              community, and unlock premium performance.
            </p>
          </div>

          <div className="space-y-4 text-sm text-zinc-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lime-400 rounded-full" />
              Modern athlete dashboard
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lime-400 rounded-full" />
              Community & training ecosystem
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lime-400 rounded-full" />
              Secure authentication system
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white">
              Create Account
            </h2>

            <p className="text-zinc-400 mt-2">
              Start your journey today.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              name="displayName"
              value={displayName}
              onChange={handleChange}
              placeholder="Display Name"
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 px-5 py-4 rounded-xl outline-none focus:border-lime-400 transition-all duration-300"
            />

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

            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 px-5 py-4 rounded-xl outline-none focus:border-lime-400 transition-all duration-300"
            />

            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(163,230,53,0.4)]"
            >
              Create Account
            </button>
          </form>

          <p className="text-zinc-500 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-lime-400 hover:text-lime-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;