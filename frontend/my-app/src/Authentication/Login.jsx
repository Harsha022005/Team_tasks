import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Unauthnavbar from "../components/unauthnavbar";

function Login() {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email: useremail,
        password,
        role,
      });

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed ");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Unauthnavbar />
      <div className="flex justify-center items-center py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Welcome Back 
          </h2>

          {error && (
            <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
          )}

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mb-6">
           <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
>
  <option value="team_lead">Team Lead</option>
  <option value="team_member">Team Member</option>
</select>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
