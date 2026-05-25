import { useState } from "react";

import { resetPassword } from "../../utils/firebase";

const ForgotPassword = () => {

  const [email, setEmail] =
    useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    if (!email) {

      alert("Please enter your email");

      return;
    }

    try {

      await resetPassword(email);

      alert(
        "Password reset email sent successfully provided the email you provided is signed up previously with pound for pound, if you do not recieve any email than assume your email has never been signed up in the first place."
      );

      setEmail("");

    } catch (error: any) {

      switch (error.code) {

        case "auth/user-not-found":
          alert(
            "No user associated with this email."
          );
          break;

        case "auth/invalid-email":
          alert(
            "Please enter a valid email."
          );
          break;

        default:
          alert(
            "Something went wrong."
          );
      }

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

        <h1 className="text-3xl font-bold text-white mb-2">
          Forgot Password
        </h1>

        <p className="text-zinc-400 mb-6">
          Enter your email to receive a password reset link
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 rounded-xl transition"
          >
            Send Reset Link
          </button>

        </form>

      </div>

    </div>
  );
};

export default ForgotPassword;