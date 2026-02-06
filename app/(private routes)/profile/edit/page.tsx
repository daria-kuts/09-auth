"use client";

import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProfile() {
  const router = useRouter();

  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const updatedUser = await updateMe(username);

    setUser(updatedUser);

    router.push("/profile");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || ""}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label>Username:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
