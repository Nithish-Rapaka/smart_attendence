import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserGraduate } from "react-icons/fa";

import { login } from "../../api/authApi";
import { saveAuth } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await login(loginData);

      saveAuth(response.token, response.role);

      localStorage.setItem("name", response.role);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      {/* ================= Header ================= */}

      <header className="h-16 bg-white shadow-md border-b flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shadow">
            <FaUserGraduate className="text-white text-xl" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Smart Attendance System
            </h1>

            <p className="text-xs text-gray-500">
              Attendance Management Portal
            </p>
          </div>
        </div>
      </header>

      {/* ================= Login ================= */}

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          {/* Logo */}

          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <FaUserGraduate className="text-white text-4xl" />
            </div>
          </div>

          {/* Heading */}

          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>

            <p className="text-gray-500 mt-2">Login to continue</p>
          </div>

          {/* Form */}

          <form onSubmit={handleLogin} className="space-y-5 mt-8">
            {/* Email */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </main>

      {/* ================= Footer ================= */}

      <footer className="h-16 bg-white border-t shadow-inner flex flex-col justify-center items-center">
        <p className="text-sm text-gray-600">© 2026 Smart Attendance System</p>

        <p className="text-sm text-gray-500">
          Designed &amp; Developed by{" "}
          <span className="font-semibold text-blue-600">
            Information Technology Department
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Login;
