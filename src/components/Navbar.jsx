import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ onHomeClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/verify", {
          withCredentials: true,
        });
        console.log(res.data, "sdfisdbfisdhbfisdhbfisdhb");
        setIsLoggedIn(res.data === true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const Logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, {
        withCredentials: true
      });
      setIsLoggedIn(false);
      setMessage("Logged out successfully");
      toast.success("Logout Successful!!")
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={onHomeClick}
      >
        QuickShort
      </div>
      <div className="flex justify-center items-center gap-8">
        <button
          onClick={onHomeClick}
          className="text-gray-600 hover:text-blue-600 transition font-medium px-4 py-2"
        >
          Home
        </button>

        {isLoggedIn ? (
          <button
            onClick={Logout}
            className="text-white px-4 py-2 rounded-md hover:text-blue-600 transition font-medium bg-blue-600 hover:bg-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 px-4 py-2 rounded-md hover:text-white transition font-medium border border-blue-600 hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>

      {message && (
        <p className="text-red-600 absolute top-16 right-6">{message}</p>
      )}
    </nav>
  );
};

export default Navbar;
