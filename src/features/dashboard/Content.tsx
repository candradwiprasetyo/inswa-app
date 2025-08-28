"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Contact from "../membership/Contact";
import { useRouter } from "next/navigation";

type User = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export default function Content() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <>
      <Hero title="Dashboard" background="about-us/hero.png" variant="green" />

      <div className="p-6 max-w-xl mx-auto text-center">
        {user ? (
          <>
            <h2 className="text-xl font-bold mb-2">Welcome, {user.userId}</h2>
            <p>Email: {user.email}</p>
            <p>Join Year: {new Date(user.iat! * 1000).getFullYear()}</p>

            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <p>User not found.</p>
        )}
      </div>

      <Contact />
    </>
  );
}
