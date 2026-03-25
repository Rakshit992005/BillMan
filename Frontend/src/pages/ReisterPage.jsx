import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    mobile: "",
    address: "",
    password: "",
    confirmPassword: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    panNumber: "",
    upiId: "",
    invoiceSuffix: "",
    agreeToTerms: false,
    logo: null,
    stamp: null,
  });

  const [previews, setPreviews] = useState({
    logo: null,
    stamp: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "TOO WEAK",
    color: "bg-red-500",
    textColor: "text-red-500",
  });

  const logoInputRef = useRef(null);
  const stampInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) {
      setPasswordStrength({
        score: 0,
        label: "TOO WEAK",
        color: "bg-gray-100",
        textColor: "text-gray-400",
      });
      return;
    }
    if (password.length > 5) score++;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let label = "TOO WEAK";
    let color = "bg-red-500";
    let textColor = "text-red-500";

    if (score >= 5) {
      label = "STRONG";
      color = "bg-green-500";
      textColor = "text-green-500";
    } else if (score >= 3) {
      label = "MEDIUM";
      color = "bg-yellow-500";
      textColor = "text-yellow-500";
    } else if (score >= 2) {
      label = "WEAK";
      color = "bg-orange-500";
      textColor = "text-orange-500";
    }

    setPasswordStrength({ score: Math.min(4, score), label, color, textColor });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [type]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const data = new FormData();

      // Separate text fields and files, nesting text fields under 'formData'
      // for the backend to receive them in req.body.formData
      Object.keys(formData).forEach((key) => {
        if (key === "logo" || key === "stamp") {
          if (formData[key]) {
            data.append(key, formData[key]);
          }
        } else if (key !== "confirmPassword") {
          data.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        data,
        {
          withCredentials: true,
        },
      );
      //       console.log("Response:", response.data.message);
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("Registration successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      //       console.error("Registration failed:", error);
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
    // Submit logic will be handled by the user
    //     console.log("Registration Data:", formData);
  };

  return (
    <div className="bg-(--bg-primary) min-h-screen py-12 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-10">
        <h1 className="text-5xl font-extrabold text-[#16181D] tracking-tight mb-2">
          Register your Company
        </h1>
      </div>

      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-(--border-primary)/30">
        <form onSubmit={handleSubmit} className="p-10 space-y-12">
          {/* Section: Personal Details */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase">
                Personal Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Johnathan Doe"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                  Email Address{" "}
                  <span className="text-xs font-normal text-red-500 ml-2 uppercase tracking-tight">
                    Please enter a valid business email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Section: Company Identity */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21h18"></path>
                  <path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"></path>
                  <path d="M5 21V10.85"></path>
                  <path d="M19 21V10.85"></path>
                  <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
                </svg>
              </div>
              <h2 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase">
                Company Identity
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="Acme Corporation Ltd."
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-bold text-gray-600">
                Full Business Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="123 Business Ave, Suite 400, New York, NY 10001"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2 mb-8">
              <label className="text-sm font-bold text-gray-600">
                Invoice Suffix (e.g. for Services, for Products)
              </label>
              <input
                type="text"
                name="invoiceSuffix"
                placeholder="e.g. for Hardware Solutions"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={formData.invoiceSuffix}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Logo Upload */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-600">
                  Company Logo
                </label>
                <div
                  onClick={() => logoInputRef.current.click()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 transition-all bg-gray-50 group min-h-[220px]"
                >
                  <input
                    type="file"
                    ref={logoInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "logo")}
                  />
                  <div className="flex items-start gap-4 w-full">
                    <div className="p-3 bg-white border border-gray-100 rounded-xl text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-gray-700">
                        Brand Logo
                      </h4>
                      <p className="text-[10px] text-gray-400">
                        SVG, PNG, or JPG (max. 800×400px)
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-24 mt-4 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                    {previews.logo ? (
                      <img
                        src={previews.logo}
                        alt="Logo Preview"
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
                        Preview Logo
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stamp Upload */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-600">
                  Company Stamp
                </label>
                <div
                  onClick={() => stampInputRef.current.click()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 transition-all bg-gray-50 group min-h-[220px]"
                >
                  <input
                    type="file"
                    ref={stampInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "stamp")}
                  />
                  <div className="flex items-start gap-4 w-full">
                    <div className="p-3 bg-white border border-gray-100 rounded-xl text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-gray-700">
                        Official Stamp
                      </h4>
                      <p className="text-[10px] text-gray-400">
                        Upload your digital seal for PDF invoicing
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-24 mt-4 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                    {previews.stamp ? (
                      <img
                        src={previews.stamp}
                        alt="Stamp Preview"
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
                        Preview Stamp
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Bank Details */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h2 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase">
                Bank Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bankName"
                  required
                  placeholder="State Bank of India"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.bankName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  required
                  placeholder="1234567890"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                  IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  required
                  placeholder="SBIN0001234"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                  Branch Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="branchName"
                  required
                  placeholder="Main Branch"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.branchName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    required
                    placeholder="ABCDE1234F"
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                    UPI ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    required
                    placeholder="157*****52@ybl"
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={formData.upiId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
          </section>

          {/* Section: Security & Access */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h2 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase">
                Security & Access
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>

                {/* Strength Meter */}
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                    <span className="text-gray-400">Security Level</span>
                    <span className={passwordStrength.textColor}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="flex gap-1.5 min-h-[4px]">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                          i <= passwordStrength.score
                            ? passwordStrength.color
                            : "bg-gray-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••••••"
                  className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    formData.confirmPassword &&
                    formData.confirmPassword !== formData.password
                      ? "border-red-300 ring-1 ring-red-100"
                      : "border-gray-200"
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {formData.confirmPassword &&
                  formData.confirmPassword !== formData.password && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight">
                      Passwords do not match
                    </p>
                  )}
              </div>
            </div>
          </section>

          {/* Terms Agreement */}
          <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100/50">
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                name="agreeToTerms"
                className="mt-1 w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                I agree to the{" "}
                <Link
                  to="#"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="#"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Privacy Policy
                </Link>
                . I understand that my data will be stored securely for
                invoicing purposes.
              </p>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-400 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:shadow-2xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
            <svg
              className="group-hover:translate-x-1 transition-transform"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
      </div>

      {/* Footer Links */}
      <div className="mt-12 mb-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
        <Link to="#" className="hover:text-gray-600 transition-colors">
          Privacy Policy
        </Link>
        <Link to="#" className="hover:text-gray-600 transition-colors">
          Support Center
        </Link>
        <Link to="#" className="hover:text-gray-600 transition-colors">
          Security Standards
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
