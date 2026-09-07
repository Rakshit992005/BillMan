import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gray-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative gradients inside CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-40"></div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10 tracking-tight">
            Ready to streamline your billing?
          </h2>
          <p className="text-xl text-gray-300 font-medium mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of businesses that trust BillMan to manage their invoices and track their revenue. Get started today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link
              to="/login"
              className="px-10 py-5 bg-white text-gray-900 font-black rounded-2xl shadow-xl hover:bg-gray-50 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 text-lg"
            >
              Start for Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
