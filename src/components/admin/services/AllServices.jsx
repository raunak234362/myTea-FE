import React, { useEffect, useState } from "react";
import Service from "../../../config/Service";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      const response = await Service.getAllServices();
      console.log("Fetched services:", response);
      setServices(response || []); // adjust based on your API structure
      setError("");
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

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading services...</p>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Services</h1>

      {services.length === 0 ? (
        <p className="text-gray-600">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              {service.serviceImage?.[0] && (
                <img
                  src={service.serviceImage[0]}
                  alt={service.title}
                  className="h-40 w-full object-cover rounded-md mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-900">
                {service.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{service.heading}</p>
              <p className="text-sm text-gray-700 mb-3">
                {service.description}
              </p>

              {service.points && service.points.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {service.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllServices;
