import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import ServiceTabs from "./ServiceTabs";
import ServiceTabContent from "./ServiceTabContent";

const servicesTabs = [
  "Digital Marketing",
  "Social Media",
  "Performance",
  "Photography & Video",
  "Branding",
  "Web Development",
];

const ServiceSection = () => {
  const [activeTab, setActiveTab] = useState("Digital Marketing");

  return (
    <section className="bg-white py-20 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Services</h2>
        <div className="h-1 w-20 bg-orange-400 mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Comprehensive digital marketing solutions to enhance your brand's
          online presence and drive measurable results for your business.
        </p>

        <ServiceTabs
          servicesTabs={servicesTabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <ServiceTabContent activeTab={activeTab} />

        
      </div>
    </section>
  );
};

export default ServiceSection;
