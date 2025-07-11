import React from "react";
import { FaTwitter, FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column - Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-lg">▽</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">cyber</span>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[FaTwitter, FaFacebookF, FaTiktok, FaInstagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
              >
                <Icon className="text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Middle Column - Services */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-4">Services</h3>
          <div className="space-y-2">
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Bonus program</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Gift cards</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Credit and payment</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Service contracts</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Non-cash account</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Payment</a>
          </div>
        </div>

        {/* Right Column - Buyer Help */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-4">Assistance to the buyer</h3>
          <div className="space-y-2">
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Find an order</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Terms of delivery</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Exchange and return of goods</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Guarantee</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Frequently asked questions</a>
            <a href="#" className="block text-gray-400 hover:text-white text-sm transition">Terms of use of the site</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
