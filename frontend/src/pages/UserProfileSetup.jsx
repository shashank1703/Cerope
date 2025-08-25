import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import { HiOutlineSparkles, HiUserCircle, HiChevronDown, HiCalendar } from "react-icons/hi";
import axios from "axios";

export default function UserProfileSetup() {
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [dob, setDob] = useState(null);
  const [stylePreference, setStylePreference] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const inputClass =
    "w-full p-2 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-sm md:text-base";

  const cities = ["New York", "London", "Delhi", "Tokyo", "Sydney"];

  const triggerFilePicker = () => fileInputRef.current?.click();

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setProfilePictureFile(f);
  };

  const validate = () => {
    const next = {};
    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!dob) next.dob = "Date of birth is required.";
    if (!stylePreference) next.stylePreference = "Select a style preference.";
    if (!country.trim()) next.country = "Country is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob,
      stylePreference,
      phone: phone.trim(),
      country: country.trim(),
      city,
      hasProfilePic: !!profilePictureFile,
    };

    console.log("Profile Setup Payload:", payload);

    try {
      // Placeholder API call (replace URL when backend is ready)
      await axios.post("/api/v1/users/update-profile", payload, {
        headers: { "Content-Type": "application/json" },
      });
      // Mark profile as complete locally and route to dashboard
      localStorage.setItem("profileCompleted", "true");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Profile update failed:", err?.response?.data || err.message);
      // You can display a toast/error banner here if needed
      localStorage.setItem("profileCompleted", "true");
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-6 md:p-12">
        {/* Header */}
        <Navbar />

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Set up your User account</h1>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {/* Left column - Form */}
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* First Name */}
            <div>
              <label className="font-medium text-gray-700 mb-2 block">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className={inputClass}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                className={inputClass}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Profile Picture */}
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Profile Picture</label>
              <div
                className={`${inputClass} flex items-center justify-between cursor-pointer`}
                onClick={triggerFilePicker}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && triggerFilePicker()}
              >
                <div className="flex items-center gap-3 text-gray-600">
                  <HiUserCircle className="text-2xl" />
                  <span className={profilePictureFile ? "text-gray-800" : ""}>
                    {profilePictureFile ? profilePictureFile.name : "Select Profile Picture"}
                  </span>
                </div>
                <HiChevronDown className="text-gray-500" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
              />
            </div>

            {/* DOB */}
            <div>
              <label className="font-medium text-gray-700 mb-2 block">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  selected={dob}
                  onChange={(val) => setDob(val)}
                  placeholderText="Select DOB"
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className={`${inputClass} pr-10`}
                />
                <HiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob}</p>}
            </div>

            {/* Style Preference */}
            <div>
              <label className="font-medium text-gray-700 mb-2 block">
                Style Preference <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="style"
                    value="Men"
                    checked={stylePreference === "Men"}
                    onChange={(e) => setStylePreference(e.target.value)}
                    className="h-4 w-4"
                  />
                  <span>Men</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="style"
                    value="Women"
                    checked={stylePreference === "Women"}
                    onChange={(e) => setStylePreference(e.target.value)}
                    className="h-4 w-4"
                  />
                  <span>Women</span>
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="style"
                    value="Both"
                    checked={stylePreference === "Both"}
                    onChange={(e) => setStylePreference(e.target.value)}
                    className="h-4 w-4"
                  />
                  <span>Both</span>
                </label>
              </div>
              {errors.stylePreference && (
                <p className="mt-1 text-sm text-red-500">{errors.stylePreference}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                className={inputClass}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Country */}
            <div>
              <label className="font-medium text-gray-700 mb-2 block">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter country"
                className={inputClass}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                aria-invalid={!!errors.country}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">{errors.country}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="font-medium text-gray-700 mb-2 block">City</label>
              <div className="relative">
                <select
                  className={`${inputClass} appearance-none pr-10 bg-white`}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Select location</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </form>

          {/* Right column - Image */}
          <div className="relative rounded-2xl overflow-hidden min-h-[440px] md:min-h-[520px] bg-gray-100">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: "url('/banner3.png')" }}
            />
            <div className="absolute top-4 right-4 bg-white/80 border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2 backdrop-blur-sm">
              <img src="/logo.png" alt="Cerope" className="w-5 h-5 object-contain" />
              <span className="text-xs font-semibold">Cerope</span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-black text-white font-bold py-3 px-16 rounded-lg transition-colors hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}