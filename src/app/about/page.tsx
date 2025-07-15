import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component
import { Shield, Award, Headphones, Play } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "/api/placeholder/250/300"
    },
    {
      name: "Sarah Chen",
      role: "Tech Director",
      image: "/api/placeholder/250/300"
    },
    {
      name: "Mike Rodriguez",
      role: "Product Manager",
      image: "/api/placeholder/250/300"
    },
    {
      name: "Emily Davis",
      role: "Customer Success",
      image: "/api/placeholder/250/300"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Authentic Products",
      description: "100% genuine products from authorized dealers with full warranty coverage.",
      bgColor: "bg-gray-50"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Best Price Guarantee",
      description: "Competitive pricing with price match guarantee on all our tech products.",
      bgColor: "bg-gray-800"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Tech Support",
      description: "Expert technical support team ready to help with any product questions.",
      bgColor: "bg-gray-50"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            About Us
          </h1>
        </div>
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* About Us Section */}
          <div className="mb-16">
            <p className="text-gray-600 font-semibold mb-4 uppercase tracking-wide">About Us</p>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  <span className="text-gray-600">Welcome</span>{' '}
                  <span className="text-gray-700">To Best E-Tech Store!</span>
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Your ultimate destination for cutting-edge technology and innovative gadgets. We specialize in bringing you the latest smartphones, laptops, gaming gear, smart watches, cameras, and electronic accessories from top brands worldwide.
                </p>
              </div>
              <div>
                <p className="text-gray-600 leading-relaxed">
                  {/* FIX: Escaped the apostrophe in "we've" */}
                  Since our founding, we&apos;ve been committed to providing exceptional customer service, competitive prices, and authentic products. Our team of tech enthusiasts carefully curates each product to ensure you get the best technology solutions for your lifestyle and needs.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Image Section with Video */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative">
              {/* FIX: Replaced <img> with <Image> */}
              <Image
                src="/api/placeholder/500/400"
                alt="Team working"
                width={500}
                height={400}
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
            <div className="relative">
              {/* FIX: Replaced <img> with <Image> */}
              <Image
                src="/api/placeholder/500/400"
                alt="Team meeting"
                width={500}
                height={400}
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-gray-50 hover:bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center transition-colors">
                  <Play className="w-6 h-6 text-gray-700 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 font-semibold mb-4 uppercase tracking-wide">Our Team</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Team <span className="text-gray-700">Members</span>
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Meet our passionate team of tech experts who work tirelessly to bring you the latest innovations and provide exceptional customer service for all your technology needs.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  {/* FIX: Replaced <img> with <Image> */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={250}
                    height={300}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-gray-50 text-gray-900 py-4 px-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
                {/* Social Media Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-gray-400 rounded-full hover:bg-gray-600 cursor-pointer transition-colors"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full hover:bg-gray-600 cursor-pointer transition-colors"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full hover:bg-gray-600 cursor-pointer transition-colors"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full hover:bg-gray-600 cursor-pointer transition-colors"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;