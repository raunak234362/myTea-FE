import React from "react";
import { CheckCircle } from "lucide-react";

const ServiceTabContent = ({ activeTab, services }) => {
  const selectedService = services.find(
    (service) => service.type === activeTab
  );

  if (!selectedService) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>{activeTab} content is coming soon.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 text-left mt-10">
      {/* Left Content */}
      <div className="lg:w-1/2 space-y-5">
        <h3 className="text-xl font-semibold text-gray-900">
          {selectedService.title}
        </h3>
        <p className="text-gray-600">{selectedService.description}</p>

        <ul className="space-y-3">
          {selectedService.points?.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="text-orange-400 w-5 h-5 mt-1" />
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="inline-block mt-4 text-orange-600 font-medium hover:underline"
        >
          Learn more about our approach →
        </a>
      </div>

      {/* Right Image */}
      <div className="lg:w-1/2">
        {selectedService.serviceImage && (
          <img
            src={selectedService.serviceImage[0]}
            alt={selectedService.category}
            className="rounded-xl shadow-lg object-cover w-full"
          />
        )}
      </div>
    </div>
  );
};

export default ServiceTabContent;
