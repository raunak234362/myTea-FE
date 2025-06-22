import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  X, 
  Check, 
  Calendar,
  DollarSign,
  Users,
  Tag,
  AlertCircle
} from 'lucide-react';

const MarketingManager = () => {
  // State for campaigns list
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  
  // Campaign types and statuses for dropdown
  const campaignTypes = [
    'Social Media', 
    'Email Marketing', 
    'Content Marketing', 
    'SEO', 
    'Paid Advertising',
    'Event Marketing'
  ];
  
  const campaignStatuses = [
    'Planned', 
    'Active', 
    'Paused', 
    'Completed', 
    'Cancelled'
  ];
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    type: 'Social Media',
    status: 'Planned',
    budget: '',
    targetAudience: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API fetch
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockCampaigns = [
          {
            id: 1,
            name: 'Summer Tea Promotion',
            description: 'Promote our summer tea collection across all platforms',
            startDate: '2025-06-01',
            endDate: '2025-08-31',
            type: 'Social Media',
            status: 'Active',
            budget: '5000',
            targetAudience: 'Tea enthusiasts, 25-45 age group'
          },
          {
            id: 2,
            name: 'Monthly Tea Newsletter',
            description: 'Monthly email newsletter featuring tea tips and new products',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            type: 'Email Marketing',
            status: 'Active',
            budget: '1200',
            targetAudience: 'Existing customers and subscribers'
          },
          {
            id: 3,
            name: 'Holiday Season Special',
            description: 'Special promotion for gift boxes during holiday season',
            startDate: '2025-11-15',
            endDate: '2025-12-25',
            type: 'Paid Advertising',
            status: 'Planned',
            budget: '8000',
            targetAudience: 'Gift shoppers, 30-60 age group'
          }
        ];
        
        setCampaigns(mockCampaigns);
        setError('');
      } catch (err) {
        setError('Failed to fetch marketing campaigns. Please try again later.');
        console.error('Error fetching campaigns:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCampaigns();
  }, []);

  // Open modal for creating a new campaign
  const handleCreateCampaign = () => {
    // Set tomorrow as default start date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Set 30 days from tomorrow as default end date
    const endDate = new Date(tomorrow);
    endDate.setDate(endDate.getDate() + 30);
    const endDateStr = endDate.toISOString().split('T')[0];
    
    setFormMode('create');
    setCurrentCampaign(null);
    setFormData({
      name: '',
      description: '',
      startDate: tomorrowStr,
      endDate: endDateStr,
      type: 'Social Media',
      status: 'Planned',
      budget: '',
      targetAudience: ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing a campaign
  const handleEditCampaign = (campaign) => {
    setFormMode('edit');
    setCurrentCampaign(campaign);
    setFormData({
      name: campaign.name,
      description: campaign.description,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      type: campaign.type,
      status: campaign.status,
      budget: campaign.budget,
      targetAudience: campaign.targetAudience
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
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
      errors.name = 'Campaign name is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      errors.endDate = 'End date must be after start date';
    }
    
    if (!formData.budget) {
      errors.budget = 'Budget is required';
    } else if (isNaN(Number(formData.budget)) || Number(formData.budget) < 0) {
      errors.budget = 'Budget must be a positive number';
    }
    
    if (!formData.targetAudience.trim()) {
      errors.targetAudience = 'Target audience is required';
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
        // Create new campaign
        const newCampaign = {
          id: campaigns.length + 1,
          ...formData
        };
        
        setCampaigns([...campaigns, newCampaign]);
      } else {
        // Update existing campaign
        const updatedCampaigns = campaigns.map(campaign => 
          campaign.id === currentCampaign.id 
            ? { ...campaign, ...formData }
            : campaign
        );
        
        setCampaigns(updatedCampaigns);
      }
      
      // Close modal after successful operation
      setIsModalOpen(false);
    } catch (err) {
      setError(`Failed to ${formMode === 'create' ? 'create' : 'update'} campaign. Please try again.`);
      console.error(`Error ${formMode === 'create' ? 'creating' : 'updating'} campaign:`, err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle campaign deletion
  const handleDeleteCampaign = async (campaignId) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) {
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter out the deleted campaign
      const updatedCampaigns = campaigns.filter(campaign => campaign.id !== campaignId);
      setCampaigns(updatedCampaigns);
    } catch (err) {
      setError('Failed to delete campaign. Please try again.');
      console.error('Error deleting campaign:', err);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format budget for display
  const formatBudget = (budget) => {
    return `$${Number(budget).toLocaleString()}`;
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Planned':
        return 'bg-blue-100 text-blue-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
        <button
          onClick={handleCreateCampaign}
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Campaign
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
            <p className="mt-2 text-sm text-gray-600">Loading campaigns...</p>
          </div>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-600">No marketing campaigns found. Create your first campaign!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Campaign
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Timeframe
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Budget
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="mt-1 max-w-md text-sm text-gray-500">
                        {campaign.description.length > 60 
                          ? `${campaign.description.substring(0, 60)}...` 
                          : campaign.description}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {campaign.type}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{formatDate(campaign.startDate)}</span>
                      <span className="text-xs text-gray-400">to</span>
                      <span>{formatDate(campaign.endDate)}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span 
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        getStatusColor(campaign.status)
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {formatBudget(campaign.budget)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditCampaign(campaign)}
                      className="mr-2 rounded p-1 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
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
                    {formMode === 'create' ? 'Create New Campaign' : 'Edit Campaign'}
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
                        Campaign Name
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
                        rows="3"
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

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label 
                          htmlFor="startDate" 
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Date
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                            <Calendar className="h-4 w-4" />
                          </span>
                          <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className={`block w-full flex-1 rounded-none rounded-r-md border ${
                              formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                            } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                          />
                        </div>
                        {formErrors.startDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>
                        )}
                      </div>

                      <div>
                        <label 
                          htmlFor="endDate" 
                          className="block text-sm font-medium text-gray-700"
                        >
                          End Date
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                            <Calendar className="h-4 w-4" />
                          </span>
                          <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className={`block w-full flex-1 rounded-none rounded-r-md border ${
                              formErrors.endDate ? 'border-red-500' : 'border-gray-300'
                            } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                          />
                        </div>
                        {formErrors.endDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.endDate}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label 
                          htmlFor="type" 
                          className="block text-sm font-medium text-gray-700"
                        >
                          Campaign Type
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                            <Tag className="h-4 w-4" />
                          </span>
                          <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {campaignTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label 
                          htmlFor="status" 
                          className="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                            <AlertCircle className="h-4 w-4" />
                          </span>
                          <select
                            name="status"
                            id="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {campaignStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label 
                        htmlFor="budget" 
                        className="block text-sm font-medium text-gray-700"
                      >
                        Budget
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                          <DollarSign className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          name="budget"
                          id="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          placeholder="1000"
                          className={`block w-full flex-1 rounded-none rounded-r-md border ${
                            formErrors.budget ? 'border-red-500' : 'border-gray-300'
                          } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        />
                      </div>
                      {formErrors.budget && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.budget}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="targetAudience" 
                        className="block text-sm font-medium text-gray-700"
                      >
                        Target Audience
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                          <Users className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          name="targetAudience"
                          id="targetAudience"
                          value={formData.targetAudience}
                          onChange={handleInputChange}
                          placeholder="e.g. Tea enthusiasts, 25-45 age group"
                          className={`block w-full flex-1 rounded-none rounded-r-md border ${
                            formErrors.targetAudience ? 'border-red-500' : 'border-gray-300'
                          } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        />
                      </div>
                      {formErrors.targetAudience && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.targetAudience}</p>
                      )}
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
                          {formMode === 'create' ? 'Create Campaign' : 'Update Campaign'}
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

export default MarketingManager;

