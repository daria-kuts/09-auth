"use client";

import css from "./SignUp.module.css";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUp() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    const user = await register({ email, password });

    setUser(user);

    router.push("/profile");
  }

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label>Email</label>
          <input className={css.input} name="email" type="email" required />
        </div>

        <div className={css.formGroup}>
          <label>Password</label>
          <input className={css.input} name="password" type="password" required />
        </div>

        <button className={css.submitButton} type="submit">Register</button>
      </form>
    </main>
  );
}
