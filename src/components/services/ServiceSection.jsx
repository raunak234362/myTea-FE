import React, { useEffect, useState } from "react";
import ServiceTabs from "./ServiceTabs";
import ServiceTabContent from "./ServiceTabContent";
import Service from "../../config/Service";

const ServiceSection = () => {
  const [activeTab, setActiveTab] = useState("Digital Marketing");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      const response = await Service.getAllServices();
      setServices(response || []);
      if (response.length > 0) {
        setActiveTab(response[0].category); // Set first tab by default
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const servicesTabs = [...new Set(services.map((service) => service.type))];

  return (
    <section className="bg-white py-20 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Services</h2>
        <div className="h-1 w-20 bg-orange-400 mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Comprehensive digital marketing solutions to enhance your brand's
          online presence and drive measurable results for your business.
        </p>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <ServiceTabs
              servicesTabs={servicesTabs}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            <ServiceTabContent activeTab={activeTab} services={services} />
          </>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
