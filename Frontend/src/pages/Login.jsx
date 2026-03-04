import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("Login Handler");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log("response" + response.data.message);
      if(response.status === 200){
        navigate("/dashboard");
      }
      
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="bg-(--bg-primary) flex items-center justify-center min-h-[calc(100vh-63px)] p-6 transition-all duration-700 w-full relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="bg-white/90 backdrop-blur-xl w-full max-w-[448px] p-12 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white flex flex-col gap-10 transition-all duration-500 hover:shadow-primary/10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary to-indigo-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white p-5 rounded-full shadow-inner border border-gray-100">
              <img
                src="/img/logo.png"
                alt="BillMan Logo"
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-4xl font-black text-[#16181D] tracking-tighter">
              Welcome Back
            </h1>
            <p className="text-(--text-secondary) text-sm font-semibold tracking-tight opacity-80">
              Sign in to manage your business operations
            </p>
          </div>
        </div>

        {/* Improved Login Form */}
        <form
          onSubmit={loginHandler}
          method="POST"
          className="flex flex-col gap-6 w-full"
        >
          {/* Email Highlighter Input */}
          <div className="flex flex-col gap-2.5 w-full">
            <label
              htmlFor="email"
              className={`text-[10px] font-black uppercase tracking-[0.2em] ml-1 transition-all duration-300 ${
                focusedField === "email"
                  ? "text-primary translate-x-1"
                  : "text-gray-400"
              }`}
            >
              Email Address
            </label>
            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
                  focusedField === "email"
                    ? "text-primary scale-110"
                    : "text-gray-400"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-12 pr-5 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-500 font-medium placeholder:text-gray-300 ${
                  focusedField === "email"
                    ? "border-primary bg-white shadow-[0_0_20px_rgba(27,103,155,0.1)] ring-4 ring-primary/5 translate-x-1"
                    : "border-gray-100 hover:border-gray-200"
                }`}
                required
              />
            </div>
          </div>

          {/* Password Highlighter Input */}
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex justify-between items-center px-1">
              <label
                htmlFor="password"
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  focusedField === "password"
                    ? "text-primary translate-x-1"
                    : "text-gray-400"
                }`}
              >
                Password
              </label>
              <a
                href="#"
                className="text-[10px] font-black text-primary uppercase tracking-wider hover:underline underline-offset-4 decoration-2"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
                  focusedField === "password"
                    ? "text-primary scale-110"
                    : "text-gray-400"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-12 pr-5 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-500 font-medium placeholder:text-gray-300 ${
                  focusedField === "password"
                    ? "border-primary bg-white shadow-[0_0_20px_rgba(27,103,155,0.1)] ring-4 ring-primary/5 translate-x-1"
                    : "border-gray-100 hover:border-gray-200"
                }`}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-br from-primary via-primary to-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-[0_12px_24px_-8px_rgba(27,103,155,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(27,103,155,0.6)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Sign in to BillMan
            <svg
              className="group-hover:translate-x-1 transition-transform"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>

        {/* Refined Footer */}
        <div className="text-center text-sm font-bold text-(--text-secondary)/60 flex items-center justify-center gap-2">
          New to the platform?
          <Link
            to="/register"
            className="text-primary font-black hover:underline underline-offset-4 decoration-2"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
