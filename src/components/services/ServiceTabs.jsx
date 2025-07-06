import React from "react";

const ServiceTabs = ({ servicesTabs, setActiveTab, activeTab }) => {
  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 border-b border-gray-200 mb-12">
        {servicesTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 font-medium border-b-2 transition-colors duration-300 ${
              activeTab === tab
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-gray-600 hover:text-emerald-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceTabs;
