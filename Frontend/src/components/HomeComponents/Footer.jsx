import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-full text-white bg-secondary justify-center h-[calc(100vh-600px)] gap-5 ">
        <h1 className="text-2xl font-bold">
          Ready to transform your financial workflow?
        </h1>
        <p className="text-lg text-center w-2/3">
          Join hundreds of high-performing freelancers and agencies who trust us
          to manage their revenue.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-white p-3 px-6 text-secondary rounded-2xl font-bold cursor-pointer hover:bg-gray-100 transition-colors"
        >
          Get Started
        </button>
      </div>
      <div className="w-full bg-dark text-white py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">
              Bill<span className="text-secondary">Man</span>
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Simplifying financial management for freelancers and agencies
              worldwide. Manage your bills, tracks revenue, and grow your
              business.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">Product</h3>
            <ul className="flex flex-col gap-2 text-text-secondary text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">
                Features
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Pricing
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Integrations
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">Company</h3>
            <ul className="flex flex-col gap-2 text-text-secondary text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">
                About Us
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Careers
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Contact
              </li>
            </ul>
          </div>

          {/* Newsletter/Social */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">Connect</h3>
            <div className="flex gap-4 text-xl">
              <i
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/rakshit-diwani-00809728b/",
                    "_blank",
                  )
                }
                className="fa-brands fa-linkedin hover:text-secondary cursor-pointer transition-colors"
              ></i>
              <i
                onClick={() =>
                  window.open(
                    "https://github.com/Rakshit992005/BillMan",
                    "_blank",
                  )
                }
                className="fa-brands fa-github hover:text-secondary cursor-pointer transition-colors"
              ></i>
            </div>
            <p className="text-text-secondary text-sm">
              Stay updated with our latest news.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-text-secondary text-xs">
          <p>&copy; {new Date().getFullYear()} BillMan. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
