"use client";

import css from "./SignIn.module.css";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;

    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      const user = await login({ email, password });

      setUser(user);

      router.push("/profile");
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label>Email</label>
          <input className={css.input} name="email" type="email" required />
        </div>

        <div className={css.formGroup}>
          <label>Password</label>
          <input className={css.input} name="password" type="password" required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
