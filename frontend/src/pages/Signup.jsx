import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation / API call here
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f7]">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="flex flex-col md:flex-row w-full max-w-5xl gap-6">
          
          {/* Left Column - Form with bg.png */}
          <div className="order-2 md:order-1 w-full md:w-1/2 relative rounded-3xl overflow-hidden flex flex-col justify-center p-6 sm:p-10">
            
            {/* Background clipped to rounded edges */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
              style={{ backgroundImage: "url('/bg.png')" }}
            ></div>

            {/* Foreground Form */}
            <div className="relative z-10 bg-white md:bg-transparent rounded-3xl p-6 sm:p-8 shadow-lg md:shadow-none">
              <h2 className="text-2xl font-bold mb-6 text-black">
                Set up Your Cerope Account
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="terms" className="text-xs text-gray-700">
                    I agree to Cerope's Terms of Service & Privacy Policy.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-900 transition"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center text-sm text-gray-700 mt-4">
                Already a member?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </div>

          {/* Right Column - Banner */}
          <div className="order-1 md:order-2 w-full md:w-1/2 h-64 md:h-auto relative flex items-center justify-center rounded-3xl overflow-hidden">
            <img
              src="/banner1.png"
              alt="Cerope Fashion"
              className="w-full h-full object-cover rounded-3xl"
            />
            <img
              src="/logo.png"
              alt="Cerope Logo"
              className="absolute top-4 right-4 w-16 h-auto"
            />
          </div>
        </div>
      </main>
    </div>
  );
}