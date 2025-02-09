import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 py-16 px-6 lg:px-20">
      {/* Header Section */}
{/* Header Section with an Even Longer Wavy Red Background */}
<div className="relative text-center mb-12">
  <div className="absolute inset-0">
    <svg className="w-full h-64 md:h-80 lg:h-96" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
      <path fill="#b91c1c" fillOpacity="1"
        d="M0,280L60,260C120,240,240,200,360,210C480,220,600,260,720,270C840,280,960,250,1080,230C1200,210,1320,190,1380,180L1440,170L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
      </path>
    </svg>
  </div>
  
  <div className="relative z-10 py-32">
    <h1 className="text-5xl font-bold text-white">About Us</h1>
    <p className="mt-4 text-lg text-gray-200">
      Connecting people with properties in meaningful ways.
    </p>
  </div>
</div>


      {/* Our Story Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg mb-12">
        <h2 className="text-2xl font-semibold text-gray-900">Our Story</h2>
        <p className="mt-4 text-gray-700">
          At <b>Brick & Beams</b>, we believe that every real estate journey should be as unique as the people involved. Our story began with a vision: to create meaningful connections between individuals and properties. Today, we are a trusted name in real estate, helping clients find not just a property, but a place they can truly call home.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg mb-12">
        <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
        <p className="mt-4 text-gray-700">
          Our goal is to provide <b>exceptional real estate services</b> that go beyond expectations, ensuring every client finds their perfect space while maximizing their investment.
        </p>
      </div>

      {/* Our Values Section with Slide Transition Effect */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Integrity", desc: "Upholding the highest professional and ethical standards." },
            { title: "Excellence", desc: "Delivering top-tier service in every interaction." },
            { title: "Innovation", desc: "Utilizing the latest technology for better results." },
            { title: "Transparency", desc: "Keeping our clients informed every step of the way." },
            { title: "Community", desc: "Actively contributing to the neighborhoods we serve." },
          ].map((value, index) => (
            <div key={index} className="relative overflow-hidden bg-white p-6 rounded-lg shadow-lg group">
              {/* Sliding Red Background Effect */}
              <div className="absolute inset-0 bg-red-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

              {/* Text Content (Make sure it's above the red background) */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white transition-colors duration-500">
                  {value.title}
                </h3>
                <p className="mt-2 text-gray-700 group-hover:text-white transition-colors duration-500">
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Team Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900">Our Team</h2>
        <p className="mt-4 text-gray-700">
          Our diverse team of real estate, finance, and property management experts has decades of combined experience. We are passionate about guiding our clients through every step of their real estate journey.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
