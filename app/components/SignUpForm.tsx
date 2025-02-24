"use client";
import { useState } from "react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("✅ User registered successfully! You can now log in.");
    } else {
      setMessage(`❌ ${data.error}`);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-80">
      <h2 className="text-lg font-bold">Sign Up</h2>

      <input type="text" name="username" placeholder="Username" required className="p-2 border rounded text-black" />
      <input type="email" name="email" placeholder="Email" required className="p-2 border rounded text-black" />
      <input type="password" name="password" placeholder="Password" required className="p-2 border rounded text-black" />

      <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition" disabled={loading}>
        {loading ? "Registering..." : "Sign Up"}
      </button>

      {message && <p className="text-sm text-center text-black">{message}</p>}
    </form>
  );
}
