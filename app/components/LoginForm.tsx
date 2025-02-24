"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (result?.error) {
      setMessage("❌ Invalid credentials");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-80">
      <h2 className="text-lg font-bold text-black">Login</h2>

      <input type="email" name="email" placeholder="Email" required className="p-2 border rounded text-black" />
      <input type="password" name="password" placeholder="Password" required className="p-2 border rounded text-black" />

      <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {message && <p className="text-sm text-center text-black">{message}</p>}
    </form>
  );
}
