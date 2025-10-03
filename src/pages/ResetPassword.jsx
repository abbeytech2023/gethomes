import { useState } from "react";
import supabase from "../services/supabaseClients";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Password updated successfully! You can log in now.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Set New Password
        </h1>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter new password"
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white transition bg-[#144c6f] rounded-lg hover:bg-[#052031]"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-center text-[red]">{error}</p>
        )}
        {message && (
          <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
