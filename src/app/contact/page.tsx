'use client';
import React, { useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaPhone,
  FaSms,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaPaperPlane
} from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    subject: '',
    message: ''
  });

  const [newsletter, setNewsletter] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      subject: '',
      message: ''
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletter) return;
    
    console.log('Newsletter subscription:', newsletter);
    setNewsletterSubmitted(true);
    setNewsletter('');
    
    // Hide success message after 3 seconds
    setTimeout(() => setNewsletterSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 -mt-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">Mon-Fri 9am-6pm</p>
            <p className="text-lg font-medium text-gray-600">+971 56 498 3456</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
            <p className="text-lg font-medium text-green-600">support@cyber.com</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSms className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-2">Available 24/7</p>
            <p className="text-lg font-medium text-purple-600">+971 55 343 6243</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Send us a message</h2>
                <p className="text-gray-600 text-lg">
                  Have a question or need help choosing the right product? We're here to help!
                </p>
              </div>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="flex">
                      <select className="px-3 py-3 border-2 border-gray-200 rounded-l-xl focus:outline-none focus:border-gray-500 bg-gray-50">
                        <option>+971</option>
                        <option>+1</option>
                        <option>+44</option>
                        <option>+250</option>
                      </select>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        required
                        className="flex-1 px-4 py-3 border-2 border-l-0 border-gray-200 rounded-r-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitted && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <FaCheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-green-800 font-semibold">Message sent successfully!</p>
                      <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600">123 Tech Street, Dubai, UAE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Emergency Support</h4>
                    <p className="text-gray-600">24/7 Emergency Line</p>
                    <p className="text-purple-600 font-medium">+971 50 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <FaFacebook className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors">
                  <FaInstagram className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-medium text-gray-700">Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <FaTwitter className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                  <FaSnapchat className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Snapchat</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-black rounded-xl hover:bg-gray-800 transition-colors">
                  <FaTiktok className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium text-white">TikTok</span>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-6">Subscribe to our newsletter for the latest updates and offers.</p>
              
              <div className="space-y-4">
                <input
                  type="email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-gray-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
                >
                  Subscribe
                </button>
              </div>

              {newsletterSubmitted && (
                <div className="mt-4 bg-green-500/20 border border-green-400/30 rounded-xl p-3">
                  <p className="text-green-100 text-sm font-medium">✓ Successfully subscribed to newsletter!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;