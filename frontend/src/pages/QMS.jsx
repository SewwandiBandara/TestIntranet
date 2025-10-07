import React, { useState, useEffect, useRef } from 'react';
import { FiUpload, FiFile, FiDownload, FiTrash2, FiFolder, FiSearch } from 'react-icons/fi';

const QMS = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('SOP');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const fileInputRef = useRef(null);

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
    testConnection();
  }, []);

    const testConnection = async () => {
    try {
        console.log('Testing QMS API connection...');
        const response = await fetch('http://localhost:3001/api/test'); // Changed from /api/qms/test to /api/test
        const text = await response.text();
        console.log('Test response:', text);
        
        let data;
        try {
        data = JSON.parse(text);
        } catch (e) {
        throw new Error(`Server returned HTML instead of JSON. Response: ${text.substring(0, 100)}...`);
        }
        
        if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
        }
        
        setDebugInfo(`API Connection: ✓ Working (${data.message})`);
    } catch (error) {
        console.error('Connection test failed:', error);
        setDebugInfo(`API Connection: ✗ Failed - ${error.message}`);
    }
    };

    const fetchDocuments = async () => {
    try {
        console.log('Fetching QMS documents...');
        const response = await fetch('http://localhost:3001/api/qms/documents');
        
        if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched documents:', data);
        
        setDocuments(data);
        setError('');
    } catch (error) {
        console.error('Error fetching documents:', error);
        setError(`Failed to load documents: ${error.message}`);
        
        // Check if it's a CORS issue
        if (error.message.includes('Failed to fetch')) {
        setError('Network error: Cannot connect to server. Make sure the backend is running on port 3001.');
        }
    }
    };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setError('');
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select files to upload');
      return;
    }

    setUploading(true);
    setError('');
    
    const formData = new FormData();
    
    // Append all files
    selectedFiles.forEach(file => {
      formData.append('documents', file);
    });
    
    // Append metadata
    formData.append('category', category);
    formData.append('description', description);

    try {
      console.log('Starting upload...', {
        files: selectedFiles.map(f => f.name),
        category,
        description
      });

      const response = await fetch('http://localhost:3001/api/qms/upload', {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      console.log('Upload raw response:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        throw new Error(`Server returned invalid JSON. Response: ${text.substring(0, 200)}...`);
      }

      console.log('Upload parsed response:', result);

      if (response.ok && result.success) {
        alert(result.message);
        setSelectedFiles([]);
        setDescription('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        fetchDocuments();
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/qms/documents/${documentId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Document deleted successfully!');
        fetchDocuments();
      } else {
        throw new Error(result.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed. Please try again.');
    }
  };

  const handleDownload = (document) => {
    const fullUrl = `http://localhost:3001${document.FilePath}`;
    console.log('Opening document:', fullUrl);
    window.open(fullUrl, '_blank');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('word') || fileType.includes('document')) {
      return <FiFile className="text-blue-600" />;
    } else if (fileType.includes('pdf')) {
      return <FiFile className="text-red-600" />;
    } else if (fileType.includes('image')) {
      return <FiFile className="text-green-600" />;
    }
    return <FiFile className="text-gray-600" />;
  };

  // Filter documents based on search and category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.DocumentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.Category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['All', ...new Set(documents.map(doc => doc.Category))];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quality Management System
          </h1>
          <p className="text-lg text-gray-600">
            Manage your QMS documents and procedures
          </p>
        </div>

        {/* Debug Info */}
        {debugInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <div className="flex items-center">
              <FiFile className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-sm text-blue-800">{debugInfo}</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiFile className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiUpload className="mr-2" />
            Upload Documents
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Documents (Multiple files allowed)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                accept=".doc,.docx,.pdf,.txt,image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {selectedFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Selected {selectedFiles.length} file(s):
                  </p>
                  <ul className="text-xs text-gray-500 mt-1 max-h-20 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="truncate">
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SOP">Standard Operating Procedures</option>
                  <option value="QMS">Quality Management System</option>
                  <option value="ISO">ISO Documentation</option>
                  <option value="Policy">Policies</option>
                  <option value="Procedure">Procedures</option>
                  <option value="Form">Forms</option>
                  <option value="Manual">Manuals</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the documents..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <FiUpload className="mr-2" />
                  Upload {selectedFiles.length} Document(s)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Documents List Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold flex items-center">
              <FiFolder className="mr-2" />
              QMS Documents ({filteredDocuments.length})
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FiFile className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No documents found</h3>
              <p className="mt-2 text-gray-500">
                {documents.length === 0 ? 'Get started by uploading your first document.' : 'No documents match your search criteria.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((document) => (
                    <tr key={document.Id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            {getFileIcon(document.FileType)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {document.DocumentName}
                            </div>
                            {document.Description && (
                              <div className="text-sm text-gray-500">
                                {document.Description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {document.Category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatFileSize(document.FileSize)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(document.UploadedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDownload(document)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FiDownload className="mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(document.Id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <FiTrash2 className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QMS;