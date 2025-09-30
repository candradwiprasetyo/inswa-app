import { useState } from "react";

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const forgotPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Terjadi kesalahan");
        return false;
      } else {
        setSuccess(result.message || "Link reset password telah dikirim");
        return true;
      }
    } catch (err) {
      setError(`Error: ${err}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error, success };
}
