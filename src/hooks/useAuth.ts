"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  }

  return { user, loading, logout };
}
