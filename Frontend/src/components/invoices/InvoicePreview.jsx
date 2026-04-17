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
        className="bg-white text-black w-[210mm] min-h-[297mm] p-8 pt-6 font-sans relative border shrink-0 mx-auto shadow-2xl"
        style={{
          borderColor: "#e5e7eb",
          // Explicitly set font for consistency in canvas capture
          fontFamily: "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Header section */}
        <div className="flex justify-between items-start mb-1">
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
            {companyData?.panNumber === "" ? "" : "pan. " + companyData?.panNumber}
          </div>
        </div>

        <div className="text-sm mb-2">
          <p>
            address:{" "}
            {companyData?.address ||
              "..........................................................."}
          </p>
        </div>

        <hr className="border-black mb-3 border-t-2" />

        {/* Invoice Details & QR */}
        <div className="flex justify-between border-b-2 border-black pb-2 mb-2">
          <div className="flex flex-col gap-0.5 w-1/2 border-r-2 border-black pr-4">
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
            <div className="flex mt-1">
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
            <div className="flex mt-1">
              <span className="align-center capitalize" >
                : {customer?.address }
              </span>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center gap-1">
            <div className="w-28 h-28 border-2 border-black rounded-lg flex items-center justify-center text-sm font-semibold">
              <QRGenerator value={invoiceData} upiId={companyData?.upiId} companyName={companyData?.companyName} payeeName={companyData?.name} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest">pay using qr</p>
          </div>
        </div>

        <div className="w-full text-center font-bold text-xl uppercase tracking-widest mb-1">
          {invoiceData?.documentType || "Invoice"} {companyData?.invoiceSuffix ? `for ${companyData.invoiceSuffix}` : ""}
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
            <div className="w-12 border-r-2 border-black p-2 text-center">
              qnt
            </div>
            <div className="w-20 border-r-2 border-black p-2 text-center">
              rate
            </div>
            <div className="w-40 p-2 text-center">amount</div>
          </div>

          {/* Table Body */}
          <div className="flex-1 flex flex-col min-h-[400px] relative">
            {/* Background Vertical Lines - Continuous from top to bottom */}
            <div className="absolute inset-0 flex pointer-events-none border-b-0">
              <div className="w-12 border-r-2 border-black h-full"></div>
              <div className="flex-1 border-r-2 border-black h-full"></div>
              <div className="w-24 border-r-2 border-black h-full"></div>
              <div className="w-12 border-r-2 border-black h-full"></div>
              <div className="w-20 border-r-2 border-black h-full"></div>
              <div className="w-40 h-full"></div>
            </div>

            {/* Actual Data Rows */}
            <div className="relative z-10 flex flex-col">
              {invoiceData?.items?.map((item, idx) => (
                <div key={idx} className="flex border-b border-transparent transition-colors">
                  <div className="w-12 p-2 flex items-start justify-center text-sm font-medium">
                    {idx + 1}
                  </div>
                  <div className="flex-1 p-2 text-sm wrap-break-word whitespace-pre-wrap leading-relaxed">
                    {item.description || "—"}
                  </div>
                  <div className="w-24 p-2 text-center text-sm">
                    {item.date ? new Date(item.date).toLocaleDateString() : ""}
                  </div>
                  <div className="w-12 p-2 text-center text-sm font-medium">
                    {item.quantity || 0}
                  </div>
                  <div className="w-20 p-2 text-right text-sm">
                    {item.price || 0}
                  </div>
                  <div className="w-40 p-2 text-right text-sm font-bold">
                    {item.totalAmount || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Row */}
          <div className="flex border-t-2 border-black font-bold" style={{ backgroundColor: "#f9fafb" }}>
            <div className="flex-1 border-r-2 border-black p-3 text-right uppercase tracking-wider">
              total amount
            </div>
            <div className="w-40 p-3 text-right text-lg">
               ₹{invoiceData?.totalAmount || 0}/-
            </div>
          </div>
        </div>

        {/* Amount in Words */}
        <div className="mt-6 text-sm flex items-start gap-4">
          <span className="font-bold uppercase text-xs tracking-widest pt-1" style={{ color: "#ffffff" }}>in words:</span>
          <div className="flex-1 border-b-2 pb-1.5 font-semibold leading-snug wrap-break-word" style={{ borderColor: "rgba(0,0,0,0.8)", color: "#1f2937" }}>
            {numberToWords(invoiceData?.totalAmount)}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex pt-4 h-48">
          <div className="w-1/2 pr-4 text-sm flex flex-col gap-2 font-medium">
            <div>
              Bank Name :{" "}
              <span className="font-semibold">
                {companyData?.bankName || "-"}
              </span>
            </div>
            <div>
              Branch:{" "}
              <span className="font-semibold">
                {companyData?.branch || "-"}
              </span>
            </div>
            <div>
              Account No :{" "}
              <span className="font-semibold">
                {companyData?.accountNo || ""}
              </span>
            </div>
            <div>
              UPI ID :{" "}
              <span className="font-semibold">
                {companyData?.upiId || ""}
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
