/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  X,
  Check,
  Image as ImageIcon,
  DollarSign,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import AddService from "./services/AddService";
import AllServices from "./services/AllServices";

const ServiceManager = () => {
  // State for services list
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formMode, setFormMode] = useState("create"); // 'create' or 'edit'

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    isActive: true,
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API fetch
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockServices = [
          {
            id: 1,
            name: "Social Media Management",
            description:
              "Comprehensive social media management across all major platforms...",
            price: "799",
            image: "https://placehold.co/600x400?text=Social+Media",
            isActive: true,
          },
          {
            id: 2,
            name: "Content Creation",
            description:
              "Professional content creation including blog posts, articles, and more...",
            price: "599",
            image: "https://placehold.co/600x400?text=Content",
            isActive: true,
          },
          {
            id: 3,
            name: "SEO Optimization",
            description:
              "Complete SEO services to improve your website ranking and visibility...",
            price: "999",
            image: "https://placehold.co/600x400?text=SEO",
            isActive: false,
          },
        ];

        setServices(mockServices);
        setError("");
      } catch (err) {
        setError("Failed to fetch services. Please try again later.");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Open modal for creating a new service
  const handleCreateService = () => {
    setFormMode("create");
    setCurrentService(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      isActive: true,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing a service
  const handleEditService = (service) => {
    setFormMode("edit");
    setCurrentService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      image: service.image,
      isActive: service.isActive,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes differently
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });

    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Service name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length < 20) {
      errors.description = "Description should be at least 20 characters";
    }

    if (!formData.price) {
      errors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = "Price must be a positive number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (formMode === "create") {
        // Create new service
        const newService = {
          id: services.length + 1,
          ...formData,
        };

        setServices([...services, newService]);
      } else {
        // Update existing service
        const updatedServices = services.map((service) =>
          service.id === currentService.id
            ? { ...service, ...formData }
            : service
        );

        setServices(updatedServices);
      }

      // Close modal after successful operation
      setIsModalOpen(false);
    } catch (err) {
      setError(
        `Failed to ${
          formMode === "create" ? "create" : "update"
        } service. Please try again.`
      );
      console.error(
        `Error ${formMode === "create" ? "creating" : "updating"} service:`,
        err
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle service deletion
  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filter out the deleted service
      const updatedServices = services.filter(
        (service) => service.id !== serviceId
      );
      setServices(updatedServices);
    } catch (err) {
      setError("Failed to delete service. Please try again.");
      console.error("Error deleting service:", err);
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
        <button
          onClick={handleCreateService}
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Service
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

     
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
         <AllServices />
        </div>
     

      {/* Modal for create/edit form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsModalOpen(false)}
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
              <AddService onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
