import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  X, 
  Check, 
  Image as ImageIcon,
  Eye,
  EyeOff
} from 'lucide-react';

const BlogManager = () => {
  // State for blogs list
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    isPublished: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API fetch
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockBlogs = [
          {
            id: 1,
            title: 'Introduction to Tea Culture',
            content: 'Tea has been a staple of cultures worldwide for thousands of years...',
            image: 'https://placehold.co/600x400?text=Tea+Culture',
            isPublished: true,
            createdAt: '2025-05-15'
          },
          {
            id: 2,
            title: 'The Health Benefits of Green Tea',
            content: 'Green tea is packed with antioxidants and nutrients that have powerful effects...',
            image: 'https://placehold.co/600x400?text=Green+Tea',
            isPublished: true,
            createdAt: '2025-05-22'
          },
          {
            id: 3,
            title: 'Brewing the Perfect Cup',
            content: 'The perfect cup of tea requires attention to detail and practice...',
            image: 'https://placehold.co/600x400?text=Perfect+Cup',
            isPublished: false,
            createdAt: '2025-06-10'
          }
        ];
        
        setBlogs(mockBlogs);
        setError('');
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  // Open modal for creating a new blog
  const handleCreateBlog = () => {
    setFormMode('create');
    setCurrentBlog(null);
    setFormData({
      title: '',
      content: '',
      image: '',
      isPublished: true
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing a blog
  const handleEditBlog = (blog) => {
    setFormMode('edit');
    setCurrentBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image,
      isPublished: blog.isPublished
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
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    } else if (formData.content.length < 20) {
      errors.content = 'Content should be at least 20 characters';
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
        // Create new blog
        const newBlog = {
          id: blogs.length + 1,
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        
        setBlogs([...blogs, newBlog]);
      } else {
        // Update existing blog
        const updatedBlogs = blogs.map(blog => 
          blog.id === currentBlog.id 
            ? { ...blog, ...formData }
            : blog
        );
        
        setBlogs(updatedBlogs);
      }
      
      // Close modal after successful operation
      setIsModalOpen(false);
    } catch (err) {
      setError(`Failed to ${formMode === 'create' ? 'create' : 'update'} blog. Please try again.`);
      console.error(`Error ${formMode === 'create' ? 'creating' : 'updating'} blog:`, err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle blog deletion
  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter out the deleted blog
      const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
      setBlogs(updatedBlogs);
    } catch (err) {
      setError('Failed to delete blog. Please try again.');
      console.error('Error deleting blog:', err);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
        <button
          onClick={handleCreateBlog}
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Blog
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
            <p className="mt-2 text-sm text-gray-600">Loading blogs...</p>
          </div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-600">No blogs found. Create your first blog post!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Blog Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      {blog.image && (
                        <div className="mr-3 h-10 w-10 flex-shrink-0">
                          <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className="h-10 w-10 rounded-full object-cover" 
                          />
                        </div>
                      )}
                      <div className="truncate font-medium text-gray-900">
                        {blog.title}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span 
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        blog.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="mr-2 rounded p-1 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
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
                    {formMode === 'create' ? 'Create New Blog' : 'Edit Blog'}
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
                        htmlFor="title" 
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${
                          formErrors.title ? 'border-red-500' : 'border-gray-300'
                        } px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                      />
                      {formErrors.title && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="content" 
                        className="block text-sm font-medium text-gray-700"
                      >
                        Content
                      </label>
                      <textarea
                        name="content"
                        id="content"
                        rows="5"
                        value={formData.content}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${
                          formErrors.content ? 'border-red-500' : 'border-gray-300'
                        } px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                      />
                      {formErrors.content && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="image" 
                        className="block text-sm font-medium text-gray-700"
                      >
                        Featured Image URL (optional)
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
                        name="isPublished"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label 
                        htmlFor="isPublished" 
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Publish immediately
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
                          {formMode === 'create' ? 'Create Blog' : 'Update Blog'}
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

export default BlogManager;

