import React from "react";

const CustomerListItem = ({
  name,
  email,
  paidAmount,
  unpaidAmount,
  totalAmount,
}) => {
  // Format numbers as currency
  const formatCurrency = (amt) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amt);
  };
  //   console.log(name , email , paidAmount , unpaidAmount , totalAmount)
  return (
    <div className="grid grid-cols-4 items-center px-10 py-6 border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
      {/* Customer Name & Email */}
      <div className="flex flex-col">
        <span className="text-[17px] font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {name}
        </span>
        <span className="text-[14px] text-gray-500 font-medium tracking-tight">
          {email}
        </span>
      </div>

      {/* Paid Amount */}
      <div className="flex items-center">
        <span className="text-[16px] font-extrabold text-gray-800">
          <span className="mr-2 text-gray-400 font-normal">₹</span>
          {paidAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Unpaid Amount */}
      <div className="flex items-center">
        <span
          className={`text-[16px] font-extrabold ${unpaidAmount > 0 ? "text-red-500" : "text-gray-400"}`}
        >
          <span
            className={`mr-2 font-normal ${unpaidAmount > 0 ? "text-red-300" : "text-gray-300"}`}
          >
            ₹
          </span>
          {unpaidAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Total Billing */}
      <div className="flex items-center justify-end md:justify-start gap-3">
        <span className="text-[13px] font-black text-gray-400 uppercase tracking-widest translate-y-[1px]">
          Total:
        </span>
        <span className="text-[18px] font-black text-gray-900 tracking-tight">
          <span className="mr-0.5 text-gray-400 font-normal">₹</span>
          {totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default CustomerListItem;
