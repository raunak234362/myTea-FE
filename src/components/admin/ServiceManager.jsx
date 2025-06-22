import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  X, 
  Check, 
  Image as ImageIcon,
  DollarSign,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const ServiceManager = () => {
  // State for services list
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    isActive: true
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockServices = [
          {
            id: 1,
            name: 'Social Media Management',
            description: 'Comprehensive social media management across all major platforms...',
            price: '799',
            image: 'https://placehold.co/600x400?text=Social+Media',
            isActive: true
          },
          {
            id: 2,
            name: 'Content Creation',
            description: 'Professional content creation including blog posts, articles, and more...',
            price: '599',
            image: 'https://placehold.co/600x400?text=Content',
            isActive: true
          },
          {
            id: 3,
            name: 'SEO Optimization',
            description: 'Complete SEO services to improve your website ranking and visibility...',
            price: '999',
            image: 'https://placehold.co/600x400?text=SEO',
            isActive: false
          }
        ];
        
        setServices(mockServices);
        setError('');
      } catch (err) {
        setError('Failed to fetch services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Open modal for creating a new service
  const handleCreateService = () => {
    setFormMode('create');
    setCurrentService(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      isActive: true
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing a service
  const handleEditService = (service) => {
    setFormMode('edit');
    setCurrentService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      image: service.image,
      isActive: service.isActive
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkboxes differently
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: inputValue
    });
    
    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Service name is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      errors.description = 'Description should be at least 20 characters';
    }
    
    if (!formData.price) {
      errors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = 'Price must be a positive number';
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (formMode === 'create') {
        // Create new service
        const newService = {
          id: services.length + 1,
          ...formData
        };
        
        setServices([...services, newService]);
      } else {
        // Update existing service
        const updatedServices = services.map(service => 
          service.id === currentService.id 
            ? { ...service, ...formData }
            : service
        );
        
        setServices(updatedServices);
      }
      
      // Close modal after successful operation
      setIsModalOpen(false);
    } catch (err) {
      setError(`Failed to ${formMode === 'create' ? 'create' : 'update'} service. Please try again.`);
      console.error(`Error ${formMode === 'create' ? 'creating' : 'updating'} service:`, err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle service deletion
  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter out the deleted service
      const updatedServices = services.filter(service => service.id !== serviceId);
      setServices(updatedServices);
    } catch (err) {
      setError('Failed to delete service. Please try again.');
      console.error('Error deleting service:', err);
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

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center">
            <svg className="h-10 w-10 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-600">Loading services...</p>
          </div>
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-600">No services found. Create your first service!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      {service.image && (
                        <div className="mr-3 h-10 w-10 flex-shrink-0">
                          <img 
                            src={service.image} 
                            alt={service.name} 
                            className="h-10 w-10 rounded-full object-cover" 
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{service.name}</div>
                        <div className="mt-1 max-w-md truncate text-sm text-gray-500">
                          {service.description.length > 60 
                            ? `${service.description.substring(0, 60)}...` 
                            : service.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {formatPrice(service.price)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span 
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        service.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditService(service)}
                      className="mr-2 rounded p-1 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="rounded p-1 text-red-600 hover:bg-red-100 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for create/edit form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => !submitting && setIsModalOpen(false)}
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {formMode === 'create' ? 'Create New Service' : 'Edit Service'}
                  </h3>
                  <button
                    onClick={() => !submitting && setIsModalOpen(false)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-sm font-medium text-gray-700"
                      >
                        Service Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        } px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="description" 
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${
                          formErrors.description ? 'border-red-500' : 'border-gray-300'
                        } px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                      />
                      {formErrors.description && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="price" 
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price ($)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                          <DollarSign className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="99.99"
                          className={`block w-full flex-1 rounded-none rounded-r-md border ${
                            formErrors.price ? 'border-red-500' : 'border-gray-300'
                          } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        />
                      </div>
                      {formErrors.price && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="image" 
                        className="block text-sm font-medium text-gray-700"
                      >
                        Service Image URL (optional)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                          <ImageIcon className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          name="image"
                          id="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="https://example.com/image.jpg"
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label 
                        htmlFor="isActive" 
                        className="ml-2 flex items-center text-sm text-gray-700"
                      >
                        {formData.isActive ? (
                          <ToggleRight className="mr-1 h-4 w-4 text-green-500" />
                        ) : (
                          <ToggleLeft className="mr-1 h-4 w-4 text-gray-500" />
                        )}
                        Service is active
                      </label>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm ${
                        submitting ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                    >
                      {submitting ? (
                        <span className="flex items-center">
                          <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Check className="mr-2 h-4 w-4" />
                          {formMode === 'create' ? 'Create Service' : 'Update Service'}
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => setIsModalOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;

