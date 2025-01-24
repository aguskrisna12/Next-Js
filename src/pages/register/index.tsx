"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { RegisterInterface } from "@/type/Register";
import BackToHomeButton from "@/Components/BackToHomeButton";
export default function index() {
  const [formData, setFormData] = useState<RegisterInterface>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (formData.password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }

      if (response.ok) {
        alert("Registration successful!");
        router.push("/login");
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen w-full px-4 py-8 bg-gray-50"> 
        <div className="w-full max-w-md">
          <BackToHomeButton />
          <form
            onSubmit={handleRegister}
            className="bg-white shadow-xl rounded-lg px-6 sm:px-8 pt-8 pb-8 mb-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
              Register
            </h2>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                type="submit"
              >
                Register
              </button>
              <button
                type="button"
                className="w-full sm:w-auto text-center font-semibold text-sm text-blue-500 hover:text-blue-800 py-2 px-4 rounded-lg hover:bg-blue-50 transition duration-200"
                onClick={() => router.push("/login")}
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
