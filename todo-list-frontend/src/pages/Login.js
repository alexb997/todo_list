import React, { useState } from "react";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Both email and password are required");
      return;
    }

    try {
      const response = await api.post("/api/auth/login", { email, password });
      const user = response.data.user;

      // Store the logged-in user's data in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Log the user data
      console.log("Logged in user:", user);

      setSuccess("Logged in successfully!" + JSON.stringify(user));
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Failed to log in");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
