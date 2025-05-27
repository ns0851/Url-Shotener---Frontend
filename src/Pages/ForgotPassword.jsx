import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("Sending to backend:", formData);


    try {
  const res = await axios.put(
    "hhttps://url-shortener-backend-aj7c.onrender.com/api/auth/reset",
    formData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  setMessage("Password reset successful!");
  navigate('/login');
} catch (err) {
  setMessage(err.response?.data?.message || "Something went wrong");
}

  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
