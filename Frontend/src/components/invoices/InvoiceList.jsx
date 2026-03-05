import React from "react";

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusStyles()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const InvoiceListItem = ({ invoice, onStatusChange, onDelete }) => {
  return (
    <div className="group flex items-center justify-between p-4 mb-3 bg-white border border-primary/20 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-dark text-lg">
            {invoice.invoiceNumber}
          </h4>
          <p className="text-sm text-(--text-secondary)">
            {new Date(invoice.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-sm font-medium text-(--text-secondary)">
            Total Amount
          </p>
          <p className="text-lg font-bold text-dark">
            ₹{invoice.totalAmount.toLocaleString("en-IN")}
          </p>
        </div>
        <StatusBadge status={invoice.status} />
        <div className="flex items-center gap-2">
          {invoice.status.toLowerCase() === "pending" && (
            <button
              onClick={() => onStatusChange && onStatusChange(invoice._id)}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="Mark as Paid"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          )}

          <button
            className="p-2 text-(--text-secondary) hover:text-primary transition-colors hover:bg-primary/10 rounded-lg"
            title="View Details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={() => onDelete && onDelete(invoice._id)}
            className="p-2 text-(--text-secondary) hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Invoice"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const InvoiceList = ({ invoices, onStatusChange, onDelete }) => {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/50 border-2 border-dashed border-primary/30 rounded-xl">
        <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-dark">No invoices found</h3>
        <p className="text-(--text-secondary)">
          You don't have any invoices yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {invoices.map((invoice, index) => (
        <InvoiceListItem
          key={invoice.invoiceNumber || index}
          invoice={invoice}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default InvoiceList;
