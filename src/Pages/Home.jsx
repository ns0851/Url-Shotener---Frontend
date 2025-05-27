import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Copy } from "lucide-react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Home = () => {
  const [url, setUrl] = useState("");
  const [customAlias, setcustomAlias] = useState("");
  const [shortened, setShortened] = useState("");
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isCustom, SetisCustom] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCustom) {
      let res = await axiosInstance.post(
        "/api/create/custom",
        {
          url,
          customAlias,
        },
        { withCredentials: true }
      );
      if (res.data?.short_url) {
        toast.success("Url Shortening Successful!")
      } else if (res.data?.message) {
        toast.error("Login to enable this feature")
      }
      setShortened(res.data.short_url);
    } else {
      let response = await axiosInstance.post(
        "/api/create",
        { url },
        { withCredentials: true }
      );
      setShortened(response.data.short_url);
    }
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortened);
    setCopied(true);
  };

  const handleReset = () => {
    setUrl("");
    SetisCustom(false)
    setShortened("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onHomeClick={handleReset} />

      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mt-8">
          <h1 className="text-2xl font-semibold text-center mb-6">
            URL Shortener
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {isCustom ? (
              <div>
                <input
                  placeholder="eg. customAlias"
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={customAlias}
                  onChange={(e) => setcustomAlias(e.target.value)}
                />
              </div>
            ) : (
              <></>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Shorten URL
            </button>
          </form>

          {shortened && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-1">Shortened URL:</p>
              <div
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-xl group"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <span className="text-blue-600 font-medium break-all">
                  {shortened}
                </span>
                {hovered && (
                  <button
                    onClick={handleCopy}
                    className="text-gray-500 hover:text-black transition ml-2"
                    title="Copy to clipboard"
                  >
                    <Copy size={18} />
                  </button>
                )}
              </div>
              {copied && (
                <p className="text-green-500 text-sm mt-2">
                  Copied to clipboard!
                </p>
              )}
            </div>
          )}
          <div className="flex items-center justify-start gap-2 pt-2">
            <input
            checked={isCustom}
              onClick={() => SetisCustom(!isCustom)}
              type="checkbox"
              className="cursor-pointer"
            />
            <p className="cursor-pointer">Custom Url</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
