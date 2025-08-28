import { useState } from "react";

type RegisterPayload = {
  name?: string;
  email: string;
  password: string;
  whatsapp: string;
};

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Pendaftaran gagal");
        return null;
      }

      setSuccess(data.message || "Pendaftaran berhasil");
      return data.user;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan jaringan");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
}
