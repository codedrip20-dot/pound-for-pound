import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { sendEmailVerificationToUser } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const NotificationCom = () => {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleResendEmail = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);

      await sendEmailVerificationToUser(currentUser);

      alert("Verification email sent again!");
    } catch (error) {
      console.log(error);

      alert("Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    await currentUser?.reload();

    if (currentUser?.emailVerified) {
      alert("Email verified successfully!");

      navigate("/myprofile");
    } else {
      alert("Please verify your email first.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 text-center">

        <div className="w-20 h-20 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-10 h-10 bg-lime-400 rounded-full" />
        </div>

        <h1 className="text-4xl font-black text-white mb-4">
          Verify Your Email
        </h1>

        <p className="text-zinc-400 leading-relaxed mb-8">
          We sent a verification link to your email address.Kindly check your spam folder if you don't see it in your inbox.
          Please verify your account before continuing.
        </p>

        <div className="space-y-4">

          <button
            onClick={handleContinue}
            className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 rounded-2xl transition-all"
          >
            I Verified My Email
          </button>

          <button
            onClick={handleResendEmail}
            disabled={loading}
            className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl hover:bg-white/10 transition-all"
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default NotificationCom;