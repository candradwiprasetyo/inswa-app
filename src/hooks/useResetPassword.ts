import { useState } from "react";

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetPassword = async (password: string, token: string | null) => {
    if (!token) {
      setError("Token tidak valid");
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Terjadi kesalahan");
        return false;
      }

      setSuccess(result.message || "Password berhasil diubah");
      return true;
    } catch (err) {
      setError("Gagal menghubungi server");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (token: string | null): Promise<boolean> => {
    if (!token) return false;

    try {
      const res = await fetch(`/api/reset-password/${token}`);

      if (!res.ok) {
        return false;
      }

      const result = await res.json();
      return !!result.valid;
    } catch (err) {
      console.error("Verify token failed:", err);
      return false;
    }
  };

  return { resetPassword, verifyToken, loading, error, success };
}
