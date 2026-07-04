import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserGraduate } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      loginData.email === "admin@gmail.com" &&
      loginData.password === "admin123"
    ) {
      localStorage.setItem("token", "dummy-jwt-token");
      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("name", "Administrator");

      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
            <FaUserGraduate className="text-white text-4xl" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-6">
          <h1 className="text-3xl font-bold text-gray-800">Smart Attendance</h1>

          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-600" />
              Remember Me
            </label>

            <button type="button" className="text-blue-600 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm">
          <h3 className="font-semibold text-blue-700 mb-2">Demo Login</h3>

          <p>
            <strong>Email:</strong> admin@gmail.com
          </p>

          <p>
            <strong>Password:</strong> admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
