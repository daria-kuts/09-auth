"use client";

import { useEffect, useState } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clearAuth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkSession();

        const user = await getMe();
        setUser(user);

      } catch {
        clear();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, clear]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}