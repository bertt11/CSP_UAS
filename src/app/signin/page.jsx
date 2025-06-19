"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    const res = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
    const users = await res.json();

    if (users.length > 0) {
      const user = users[0];
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } else {
      setError("Username atau password salah.");
    }
  };

 return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-xl space-y-6"
    >
      <h2 className="text-3xl font-bold text-black text-center">Sign In</h2>

      {error && (
        <p className="text-red-600 text-center font-medium">{error}</p>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-black font-semibold">test</label>
        <input
          type="text"
          placeholder="Masukkan username"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-black font-semibold">Password</label>
        <input
          type="password"
          placeholder="Masukkan password"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
      >
        Login
      </button>
    </form>
  </div>
);

}
