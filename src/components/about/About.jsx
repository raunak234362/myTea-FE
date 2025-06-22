import React from "react";
import { CheckCircle } from "lucide-react";
import aboutImage from "../../assets/about.jpeg"; // Update path if needed

const features = [
  {
    title: "Modern Approach",
    desc: "Contemporary strategies for digital success",
  },
  { title: "Client-Focused", desc: "Tailored solutions for your needs" },
  { title: "Creative Excellence", desc: "Innovative solutions that stand out" },
  { title: "Result-Oriented", desc: "Focused on delivering measurable impact" },
];

const AboutSection = () => {
  return (
    <section className="bg-white py-16 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Image Section */}
        <div className="relative w-full lg:w-1/2">
          <img
            src={aboutImage}
            alt="Like a Boss"
            className="rounded-xl shadow-lg object-cover"
          />
          {/* Bottom-left Badge */}
          <div className="absolute bottom-4 left-4 bg-orange-600 text-white px-4 py-2 text-sm font-semibold rounded-full shadow-md">
            5+
          </div>
          {/* Top-right Badge */}
          <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 text-sm font-semibold rounded-full shadow-md">
            100+
            <br />
            Happy Clients
          </div>
        </div>

        {/* Right Text Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">About</h2>
          <div className="h-1 w-16 bg-orange-500 mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Dynamic Agency Stirring Creativi
            <span className="text-orange-500">TEA</span> Across Platforms
          </h3>
          <p className="text-gray-600 mb-4">
            MyTea Media Solution is a dynamic advertising and marketing agency
            dedicated to enhancing your brand's online presence with creative,
            data–driven strategies that deliver measurable results.
          </p>
          <p className="text-gray-600 mb-6">
            We blend innovation with strategic thinking to create marketing
            solutions that help businesses establish and enhance their digital
            footprint with cost–effective and impactful campaigns.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <CheckCircle className="text-orange-500 w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="bg-orange-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-orange-700 transition-all duration-300">
            Get in Touch →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
