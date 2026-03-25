import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 shadow-md rounded-lg">
        <img
          src="/apade.png"
          alt="apade logo"
          className="h-20 w-20 mx-auto mb-4"
        />
        <h1 className="text-center text-gray-600 text-2xl">Welcome Back</h1>
        <p className="text-center font-light text-sm text-gray-500">
          Login to your account
        </p>
        <form onSubmit={handleLogin}>
          <div>
            <label className="text-gray-600 block my-1" htmlFor="email">
              Email:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <label className="text-gray-600 block my-1" htmlFor="password">
              Password:
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
          </div>
          {error && (
            <p className="text-red-500 text-center mt-2 font-semibold">
              {error}
            </p>
          )}
          <div>
            <button type="submit" className="w-full text-white bg-blue-500 my-3 py-2 px-4 rounded-md hover:bg-blue-600 hover:opacity-90 transition cursor-pointer" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
