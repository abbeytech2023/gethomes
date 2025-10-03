import { useState } from "react";
import supabase from "../services/supabaseClients";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password", // change for production
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Reset link sent! Please check your email.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="mb-4 text-2xl font-bold text-center">Forgot Password</h1>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white transition bg-[#144c6f] rounded-lg hover:bg-[#052031]"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && (
          <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
