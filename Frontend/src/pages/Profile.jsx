import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ text: "", type: "" });
  
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateMessage({ text: "", type: "" });

    const formData = new FormData(e.target);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/update-user-details`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      
      const updatedUser = { ...user, ...response.data.user };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setUpdateMessage({ text: "Profile details updated successfully!", type: "success" });
    } catch (error) {
      setUpdateMessage({ text: error.response?.data?.message || "Failed to update details.", type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsPasswordChanging(true);
    setPasswordMessage({ text: "", type: "" });

    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ text: "New passwords do not match", type: "error" });
      setIsPasswordChanging(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/user/change-password`, {
        currentPassword,
        newPassword
      }, {
        withCredentials: true
      });

      setPasswordMessage({ text: "Password changed successfully!", type: "success" });
      e.target.reset();
    } catch (error) {
      setPasswordMessage({ text: error.response?.data?.message || "Failed to change password.", type: "error" });
    } finally {
      setIsPasswordChanging(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Overview", icon: "user" },
    { id: "update", label: "Update Details", icon: "edit" },
    { id: "password", label: "Change Password", icon: "lock" },
  ];

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-63px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Common input classes
  const inputClassName =
    "w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl outline-none transition-all duration-300 font-medium placeholder:text-gray-300 focus:border-primary focus:bg-white focus:shadow-[0_0_20px_rgba(27,103,155,0.1)] focus:ring-4 focus:ring-primary/5";
  const labelClassName =
    "text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-gray-400 mb-2 block";

  return (
    <div className="min-h-[calc(100vh-63px)] p-6 md:p-10 bg-gray-50/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white rounded-[2rem] border border-gray-100/60 shadow-xl shadow-gray-200/40 p-6 sticky top-24">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 text-left ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-lg shadow-primary/30 translate-x-1"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="text-sm tracking-wide">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-[2rem] border border-gray-100/60 shadow-xl shadow-gray-200/40 overflow-hidden min-h-[500px]">
            {/* Profile Overview Tab */}
            {activeTab === "profile" && (
              <div className="p-10 animate-fade-in">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-100 pb-10 mb-10">
                  <div className="w-32 h-32 rounded-full bg-indigo-50 flex items-center justify-center border-4 border-white shadow-xl text-4xl font-black text-primary uppercase shrink-0 overflow-hidden">
                    {user.logoUrl ? (
                      <img src={user.logoUrl} alt="Company Logo" className="w-full h-full object-cover" />
                    ) : (
                      user.name ? user.name.charAt(0) : "U"
                    )}
                  </div>
                  <div className="space-y-2 pt-2 text-center md:text-left">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                      {user.name}
                    </h2>
                    <p className="text-lg font-bold text-gray-400">
                      {user.companyName}
                    </p>
                    <div className="flex items-center gap-2 mt-4 inline-flex px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest justify-center md:justify-start mx-auto md:mx-0">
                      Active Account
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Email Address
                      </h3>
                      <p className="text-[15px] font-bold text-gray-800">
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Mobile Number
                      </h3>
                      <p className="text-[15px] font-bold text-gray-800">
                        {user.mobile || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Company Address
                      </h3>
                      <p className="text-[15px] font-bold text-gray-800 leading-relaxed max-w-xs">
                        {user.address || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Invoice Suffix
                      </h3>
                      <p className="text-[15px] font-bold text-gray-800">
                        {user.invoiceSuffix || "None"}
                      </p>
                    </div>
                    {user.stampUrl && (
                      <div>
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                          Company Stamp
                        </h3>
                        <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-200 p-2 bg-white flex items-center justify-center overflow-hidden">
                          <img src={user.stampUrl} alt="Company Stamp" className="max-w-full max-h-full object-contain" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-8">
                    {user.bankDetails ? (
                      <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">
                          Banking Information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bank Name & Branch</p>
                                <p className="text-[14px] font-bold text-gray-800">{user.bankDetails.bankName} - {user.bankDetails.branchName}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account Number</p>
                                <p className="text-[14px] font-bold text-gray-800 font-mono tracking-wider">{user.bankDetails.accountNumber}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">IFSC Code</p>
                                    <p className="text-[14px] font-bold text-gray-800">{user.bankDetails.ifscCode}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PAN Number</p>
                                    <p className="text-[14px] font-bold text-gray-800">{user.bankDetails.panNumber}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">UPI ID</p>
                                    <p className="text-[14px] font-bold text-gray-800">{user.bankDetails.upiId}</p>
                                </div>
                            </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 text-center">
                        <p className="text-sm font-bold text-gray-400">No bank details provided.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Update Details Tab */}
            {activeTab === "update" && (
              <div className="p-10 animate-fade-in">
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    Update Details
                  </h2>
                  <p className="text-sm font-bold text-gray-400 mt-2">
                    Manage your personal and company information
                  </p>
                </div>

                <form
                  className="space-y-8"
                  onSubmit={handleUpdateDetails}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClassName}>Full Name</label>
                      <input
                        name="name"
                        type="text"
                        className={inputClassName}
                        defaultValue={user.name}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClassName}>Company Name</label>
                      <input
                        name="companyName"
                        type="text"
                        className={inputClassName}
                        defaultValue={user.companyName}
                        placeholder="Company name"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClassName}>Email Address</label>
                      <input
                        type="email"
                        className={inputClassName}
                        defaultValue={user.email}
                        disabled
                      />
                      <p className="text-[10px] text-gray-400 font-bold mt-2 ml-1">
                        Email cannot be changed
                      </p>
                    </div>
                    <div>
                      <label className={labelClassName}>Mobile Number</label>
                      <input
                        name="mobile"
                        type="tel"
                        className={inputClassName}
                        defaultValue={user.mobile}
                        placeholder="Phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClassName}>Invoice Suffix</label>
                      <input
                        name="invoiceSuffix"
                        type="text"
                        className={inputClassName}
                        defaultValue={user.invoiceSuffix}
                        placeholder="e.g. for Services"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClassName}>Company Address</label>
                    <textarea
                      name="address"
                      className={`${inputClassName} min-h-[120px] resize-none`}
                      defaultValue={user.address}
                      placeholder="Full address..."
                      required
                    />
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100">
                      <h3 className="text-sm font-black text-gray-900 mb-6 tracking-tight">Company Branding</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClassName}>Update Logo</label>
                          <input name="logo" type="file" accept="image/*" className={`${inputClassName} p-3! file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all cursor-pointer`} />
                        </div>
                        <div>
                          <label className={labelClassName}>Update Stamp</label>
                          <input name="stamp" type="file" accept="image/*" className={`${inputClassName} p-3! file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all cursor-pointer`} />
                        </div>
                      </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100">
                      <h3 className="text-sm font-black text-gray-900 mb-6 tracking-tight">Banking Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClassName}>Bank Name</label>
                          <input name="bankName" type="text" className={inputClassName} defaultValue={user.bankDetails?.bankName} placeholder="E.g. Bank of India" required />
                        </div>
                        <div>
                          <label className={labelClassName}>Branch Name</label>
                          <input name="branchName" type="text" className={inputClassName} defaultValue={user.bankDetails?.branchName} placeholder="Branch name" required />
                        </div>
                        <div>
                          <label className={labelClassName}>Account Number</label>
                          <input name="accountNumber" type="text" className={inputClassName} defaultValue={user.bankDetails?.accountNumber} placeholder="Account number" required />
                        </div>
                        <div>
                          <label className={labelClassName}>IFSC Code</label>
                          <input name="ifscCode" type="text" className={inputClassName} defaultValue={user.bankDetails?.ifscCode} placeholder="IFSC code" required />
                        </div>
                        <div>
                          <label className={labelClassName}>PAN Number</label>
                          <input name="panNumber" type="text" className={inputClassName} defaultValue={user.bankDetails?.panNumber} placeholder="PAN number" required />
                        </div>
                        <div>
                          <label className={labelClassName}>UPI ID</label>
                          <input name="upiId" type="text" className={inputClassName} defaultValue={user.bankDetails?.upiId} placeholder="UPI ID" required />
                        </div>
                      </div>
                  </div>

                  {updateMessage.text && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${updateMessage.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {updateMessage.text}
                    </div>
                  )}

                  <div className="pt-4 flex justify-end">
                    <button disabled={isUpdating} className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg transition-all duration-300 ${isUpdating ? "bg-gray-400 text-white cursor-not-allowed" : "bg-primary text-white shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"}`}>
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === "password" && (
              <div className="p-10 animate-fade-in max-w-2xl">
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    Change Password
                  </h2>
                  <p className="text-sm font-bold text-gray-400 mt-2">
                    Ensure your account uses a long, random password to stay
                    secure.
                  </p>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={handleChangePassword}
                >
                  <div>
                    <label className={labelClassName}>Current Password</label>
                    <input
                      name="currentPassword"
                      type="password"
                      className={inputClassName}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>New Password</label>
                    <input
                      name="newPassword"
                      type="password"
                      className={inputClassName}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>
                      Confirm New Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className={inputClassName}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  {passwordMessage.text && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${passwordMessage.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {passwordMessage.text}
                    </div>
                  )}

                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button disabled={isPasswordChanging} className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg transition-all duration-300 ${isPasswordChanging ? "bg-gray-400 text-white cursor-not-allowed" : "bg-gray-900 text-white shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5"}`}>
                      {isPasswordChanging ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
