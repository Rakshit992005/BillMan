import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-8">
          <span className="block">Effortless Billing &</span>
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 pb-2">
            Invoicing for Modern Teams.
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto font-medium mb-10">
          Create professional invoices, manage customers, and track your revenue all in one place with BillMan. Fast, intuitive, and designed for growth.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Get Started Free
          </Link>
          <a
            href="#features"
            className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-lg"
          >
            View Features
          </a>
        </div>
      </div>

      {/* Dashboard Preview Mockup */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
        <div className="bg-gray-900/5 p-4 sm:p-6 rounded-[2.5rem] backdrop-blur-3xl border border-gray-100 shadow-2xl">
          <div className="bg-white rounded-[2rem] shadow-inner overflow-hidden border border-gray-100/50 aspect-video flex items-center justify-center relative group">
            {/* Abstract representations of UI */}
            <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 to-purple-50/50 flex flex-col p-8 gap-6 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
              <div className="w-full flex justify-between items-center">
                <div className="w-48 h-8 bg-white rounded-lg shadow-sm"></div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm"></div>
                  <div className="w-32 h-10 bg-indigo-100 rounded-lg shadow-sm"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="h-32 bg-white rounded-2xl shadow-sm border border-indigo-50/50 p-6 flex flex-col justify-end">
                    <div className="w-16 h-4 bg-indigo-100 rounded mb-2"></div>
                    <div className="w-32 h-8 bg-indigo-200 rounded"></div>
                </div>
                <div className="h-32 bg-white rounded-2xl shadow-sm border border-purple-50/50 p-6 flex flex-col justify-end">
                    <div className="w-16 h-4 bg-purple-100 rounded mb-2"></div>
                    <div className="w-32 h-8 bg-purple-200 rounded"></div>
                </div>
                <div className="h-32 bg-white rounded-2xl shadow-sm border border-pink-50/50 p-6 flex flex-col justify-end">
                    <div className="w-16 h-4 bg-pink-100 rounded mb-2"></div>
                    <div className="w-32 h-8 bg-pink-200 rounded"></div>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-end p-6 gap-4">
                 {[40, 70, 45, 90, 65, 85, 55].map((height, i) => (
                    <div key={i} className="flex-1 bg-indigo-200 rounded-t-lg transition-all duration-1000 group-hover:bg-indigo-400" style={{ height: `${height}%` }}></div>
                 ))}
              </div>
            </div>
            
            {/* Play Button Overlay just for visual flair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 bg-white/80 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-indigo-600 translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
