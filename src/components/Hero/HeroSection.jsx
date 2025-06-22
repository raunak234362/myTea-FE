import {
  FaLightbulb,
  FaMobileAlt,
  FaEnvelopeOpenText,
  FaVideo,
} from "react-icons/fa";
import React from "react";
import BackgroundImg from "../../assets/HeroBG.jpeg"

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${BackgroundImg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Stirring Creativi<span className="text-orange-400">TEA</span>
          <br />
          Across Platforms
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Elevate your brand with strategic digital marketing solutions tailored
          to enhance your online presence and drive measurable results.
        </p>
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition">
            Get Started
          </button>
          <button className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-md font-semibold transition">
            Our Services
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base text-center text-white">
          <div>
            <FaLightbulb className="mx-auto text-orange-400 text-2xl mb-2" />
            <h3 className="font-semibold">Digital Marketing</h3>
            <p className="text-gray-300">
              Strategic campaigns that boost visibility
            </p>
          </div>
          <div>
            <FaMobileAlt className="mx-auto text-orange-400 text-2xl mb-2" />
            <h3 className="font-semibold">Social Media</h3>
            <p className="text-gray-300">Engage audiences across platforms</p>
          </div>
          <div>
            <FaEnvelopeOpenText className="mx-auto text-orange-400 text-2xl mb-2" />
            <h3 className="font-semibold">Performance</h3>
            <p className="text-gray-300">Data-driven campaign optimization</p>
          </div>
          <div>
            <FaVideo className="mx-auto text-orange-400 text-2xl mb-2" />
            <h3 className="font-semibold">Media Production</h3>
            <p className="text-gray-300">High-quality visual storytelling</p>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-300 flex flex-col items-center">
          <span>Discover More</span>
          <span className="text-xl animate-bounce mt-1">↓</span>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
