import React from 'react';

const Features = () => {
  return (
    <div id="features" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Everything you need to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">run your business.</span>
          </h2>
          <p className="mt-4 text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Say goodbye to spreadsheets. BillMan provides powerful tools to manage your clients, track revenue, and generate invoices seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Invoices</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Create and share stunning invoices in seconds. Add your logo, stamp, and signature to look professional to your clients.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Directory</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Maintain a central directory of all your customers. Track their payment history, outstanding balances, and contact details.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Revenue Analytics</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Gain insights into your business health. Visualize your earnings, track pending payments, and stay on top of your cash flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
