import React, { forwardRef } from "react";
import QRGenerator from "../QRGenerator";

const InvoicePreview = forwardRef(
  ({ invoiceData, customer, companyData }, ref) => {
    const numberToWords = (num) => {
      if (!num || num === 0) return "Rupees Zero Only";
      const a = [
        "",
        "One ",
        "Two ",
        "Three ",
        "Four ",
        "Five ",
        "Six ",
        "Seven ",
        "Eight ",
        "Nine ",
        "Ten ",
        "Eleven ",
        "Twelve ",
        "Thirteen ",
        "Fourteen ",
        "Fifteen ",
        "Sixteen ",
        "Seventeen ",
        "Eighteen ",
        "Nineteen ",
      ];
      const b = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];

      let n = Math.floor(num);
      if ((n = n.toString()).length > 9) return "overflow";
      let split = ("000000000" + n)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!split) return "";

      let str = "";
      str +=
        split[1] != 0
          ? (a[Number(split[1])] || b[split[1][0]] + " " + a[split[1][1]]) +
            "Crore "
          : "";
      str +=
        split[2] != 0
          ? (a[Number(split[2])] || b[split[2][0]] + " " + a[split[2][1]]) +
            "Lakh "
          : "";
      str +=
        split[3] != 0
          ? (a[Number(split[3])] || b[split[3][0]] + " " + a[split[3][1]]) +
            "Thousand "
          : "";
      str +=
        split[4] != 0
          ? (a[Number(split[4])] || b[split[4][0]] + " " + a[split[4][1]]) +
            "Hundred "
          : "";
      str +=
        split[5] != 0
          ? (str != "" ? "and " : "") +
            (a[Number(split[5])] || b[split[5][0]] + " " + a[split[5][1]])
          : "";
      return "Rupees " + str.trim() + " Only";
    };

    return (
      <div
        ref={ref}
        className="bg-black text-white w-[210mm] min-h-[297mm] p-8 font-sans relative border border-gray-700 shadow-2xl shrink-0 mx-auto"
        style={{
          // Using A4 dimensions and making sure it looks like chalk/dark mode if user wants it,
          // but wait! Usually invoices are white for printing. The user image is dark, but is it a dark theme or just the blackboard theme sketch?
          // Since the prompt "make an A4 size paper" for printing, let's use a white background with black text for printing but support the UI.
          // I will use a white background for the invoice preview so it prints correctly as A4.
          backgroundColor: "white",
          color: "black",
          borderColor: "#ccc",
        }}
      >
        {/* Header section */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xs font-bold">
              {companyData?.logoUrl ? (
                <img
                  src={companyData.logoUrl}
                  alt="logo"
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                "logo"
              )}
            </div>
          </div>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold tracking-wider uppercase">
              {companyData?.name || "COMPANY NAME"}
            </h1>
          </div>
          <div className="text-sm font-medium">
            mob. {companyData?.mobile || "xxxxxxxxxx"}
            <br />
            pan. {companyData?.panNumber || "xxxxxxxxxx"}
          </div>
        </div>

        <div className="text-sm mb-4">
          <p>
            address:{" "}
            {companyData?.address ||
              "..........................................................."}
          </p>
        </div>

        <hr className="border-black mb-4 border-t-2" />

        {/* Invoice Details & QR */}
        <div className="flex justify-between border-b-2 border-black pb-4 mb-4">
          <div className="flex flex-col gap-1 w-1/2 border-r-2 border-black pr-4">
            <div className="flex">
              <span className="w-24 font-semibold">invoice no.</span>
              <span>: {invoiceData?.invoiceNumber || ""}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-semibold">date</span>
              <span>
                :{" "}
                {invoiceData?.date
                  ? new Date(invoiceData.date).toLocaleDateString()
                  : ""}
              </span>
            </div>
            <div className="flex mt-2">
              <span className="w-24 font-semibold ">invoice to</span>
              <span className="flex-1 capitalize">
                : {customer?.name || "---------------------"}
              </span>
            </div>
            {customer?.email && (
              <div className="flex">
                <span className="w-24 font-semibold">email</span>
                <span className="flex-1">: {customer.email}</span>
              </div>
            )}
            <div className="flex mt-2">
              <span className="w-24 font-semibold">address</span>
              <span className="flex-1">
                : {customer?.address || "---------------------"}
              </span>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-28 h-28 border-2 border-black rounded-lg flex items-center justify-center text-sm font-semibold">
              <QRGenerator value={invoiceData?.invoiceNumber} />
            </div>
          </div>
        </div>

        <div className="w-full text-center font-bold text-xl uppercase tracking-widest mb-3">
          {invoiceData?.documentType || "Invoice"}
        </div>

        {/* Table */}
        <div className="w-full border-2 border-black flex flex-col min-h-[400px]">
          {/* Table Header */}
          <div className="flex border-b-2 border-black font-semibold uppercase text-sm">
            <div className="w-12 border-r-2 border-black p-2 flex items-center justify-center">
              sr
            </div>
            <div className="flex-1 border-r-2 border-black p-2">
              description
            </div>
            <div className="w-24 border-r-2 border-black p-2 text-center">
              date
            </div>
            <div className="w-16 border-r-2 border-black p-2 text-center">
              qnt
            </div>
            <div className="w-24 border-r-2 border-black p-2 text-center">
              rate
            </div>
            <div className="w-32 p-2 text-center">amount</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-1 relative">
            <div className="w-12 border-r-2 border-black p-2 flex flex-col items-center">
              {invoiceData?.items?.map((item, idx) => (
                <div key={idx} className="mb-2 h-6">
                  {idx + 1}
                </div>
              ))}
            </div>
            <div className="flex-1 border-r-2 border-black p-2 flex flex-col">
              {invoiceData?.items?.map((item, idx) => (
                <div key={idx} className="mb-2 h-6 truncate">
                  {item.description}
                </div>
              ))}
            </div>
            <div className="w-24 border-r-2 border-black p-2 flex flex-col items-center text-sm">
              {invoiceData?.items?.map((item, idx) => (
                <div key={idx} className="mb-2 h-6">
                  {item.date ? new Date(item.date).toLocaleDateString() : ""}
                </div>
              ))}
            </div>
            <div className="w-16 border-r-2 border-black p-2 flex flex-col items-center">
              {invoiceData?.items?.map((item, idx) => (
                <div key={idx} className="mb-2 h-6">
                  {item.quantity}
                </div>
              ))}
            </div>
            <div className="w-24 border-r-2 border-black p-2 flex flex-col items-end">
              {invoiceData?.items?.map((item, idx) => (
                <div key={idx} className="mb-2 h-6">
                  {item.price}
                </div>
              ))}
            </div>
            <div className="w-32 p-2 flex flex-col items-end">
              {invoiceData?.items?.map((item, idx) => (
                <div key={idx} className="mb-2 h-6">
                  {item.totalAmount}
                </div>
              ))}
            </div>
          </div>

          {/* Total Row */}
          <div className="flex border-t-2 border-black font-semibold">
            <div className="flex-1 border-r-2 border-black p-2 text-right">
              total
            </div>
            <div className="w-32 p-2 text-right">
              {invoiceData?.totalAmount || 0}
            </div>
          </div>
        </div>

        {/* Amount in Words */}
        <div className="mt-4 text-sm flex gap-2">
          <span className="font-semibold">in words:</span>
          <span className="flex-1 border-b border-black">
            {numberToWords(invoiceData?.totalAmount)}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-8 flex pt-4 h-48">
          <div className="w-1/2 pr-4 text-sm flex flex-col gap-2 font-medium">
            <div>
              Bank Name :{" "}
              <span className="font-semibold">
                {companyData?.bankName || "BANK OF INDIA"}
              </span>
            </div>
            <div>
              Branch:{" "}
              <span className="font-semibold">
                {companyData?.branch || "Kharghar"}
              </span>
            </div>
            <div>
              Account No :{" "}
              <span className="font-semibold">
                {companyData?.accountNo || ""}
              </span>
            </div>
            <div>
              IFSC Code :{" "}
              <span className="font-semibold">{companyData?.ifsc || ""}</span>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center text-sm ml-4">
            <div>Your faithfully</div>
            <div className="mt-1">
              from, {companyData?.name || "company name"}
            </div>
            <div className="mt-4 w-20 h-20 rounded-full flex items-center justify-center text-xs font-bold">
              {companyData?.stampUrl ? (
                <img
                  src={companyData.stampUrl}
                  alt="stamp"
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                "stamp"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default InvoicePreview;
