import React, { useState } from "react";

interface AuthModalProps {
  onClose: () => void;
  onAuthenticated: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login state
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  // Register state
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!loginData.identifier || !loginData.password) {
      setError("Please enter email/phone and password");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "❌ Invalid credentials");
      } else {
        setSuccess("✅ Login successful!");
        onAuthenticated(); // Only go forward if credentials are correct
        onClose();
      }
    } catch (err) {
      setError("⚠️ Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${registerData.firstName} ${registerData.lastName}`,
          email: registerData.email,
          phone: registerData.phone,
          password: registerData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "❌ Registration failed");
      } else {
        setSuccess("✅ Account created successfully! Please login.");
        setIsLogin(true); // Switch back to login after successful register
      }
    } catch (err) {
      setError("⚠️ Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 p-2 rounded mb-3">
            {success}
          </div>
        )}

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Email or Phone"
              value={loginData.identifier}
              onChange={(e) =>
                setLoginData({ ...loginData, identifier: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                value={registerData.firstName}
                onChange={(e) =>
                  setRegisterData({ ...registerData, firstName: e.target.value })
                }
                className="w-1/2 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={registerData.lastName}
                onChange={(e) =>
                  setRegisterData({ ...registerData, lastName: e.target.value })
                }
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={registerData.phone}
              onChange={(e) =>
                setRegisterData({ ...registerData, phone: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        )}

        {/* Switch between Login and Register */}
        <p className="text-sm text-gray-600 text-center mt-4">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                className="text-blue-600 font-semibold"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-600 font-semibold"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
