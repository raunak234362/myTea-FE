import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import serviceImage from "../../assets/service1.jpeg"; // update this path if needed

const servicesTabs = [
  "Digital Marketing",
  "Social Media",
  "Performance",
  "Photography & Video",
  "Branding",
  "Web Development",
];

const marketingPoints = [
  "Search Engine Optimization (SEO)",
  "Content Marketing Strategies",
  "Email Marketing Campaigns",
  "Paid Advertising Management",
];

const ServiceSection = () => {
  const [activeTab, setActiveTab] = useState("Digital Marketing");

  return (
    <section className="bg-white py-20 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Services</h2>
        <div className="h-1 w-20 bg-emerald-500 mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Comprehensive digital marketing solutions to enhance your brand's
          online presence and drive measurable results for your business.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 border-b border-gray-200 mb-12">
          {servicesTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 font-medium border-b-2 transition-colors duration-300 ${
                activeTab === tab
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-600 hover:text-emerald-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex flex-col lg:flex-row items-center gap-10 text-left">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-5">
            <h3 className="text-xl font-semibold text-gray-900">
              {activeTab === "Digital Marketing"
                ? "Digital Marketing Excellence"
                : `${activeTab} Coming Soon`}
            </h3>
            <p className="text-gray-600">
              {activeTab === "Digital Marketing"
                ? "We craft comprehensive strategies that boost your brand visibility and engagement across all digital channels."
                : "This section is under construction. Please check back later!"}
            </p>

            {activeTab === "Digital Marketing" && (
              <ul className="space-y-3">
                {marketingPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-500 w-5 h-5 mt-1" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "Digital Marketing" && (
              <a
                href="#"
                className="inline-block mt-4 text-emerald-600 font-medium hover:underline"
              >
                Learn more about our approach →
              </a>
            )}
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2">
            <img
              src={serviceImage}
              alt="Digital Marketing"
              className="rounded-xl shadow-lg object-cover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
