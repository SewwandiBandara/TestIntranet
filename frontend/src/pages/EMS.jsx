import React, { useState, useEffect } from 'react';
import { FiFile, FiFolder, FiSearch, FiEye } from 'react-icons/fi';

const EMS = () => {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log('Testing EMS API connection...');
      const response = await fetch('http://localhost:3001/api/test');
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
      console.log('Fetching EMS documents...');
      const response = await fetch('http://localhost:3001/api/ems');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched documents:', data);
      
      // Map backend data to expected structure
      const mappedDocuments = data.files.map((file, index) => ({
        Id: index + 1, // Generate simple ID
        DocumentName: file.filename,
        FileType: file.filename.split('.').pop().toLowerCase() || 'unknown',
        FileSize: file.size || 0, // Assuming backend includes size; otherwise 0
        Category: 'EMS', // Default category
        Description: `EMS Document: ${file.filename}`, // Default description
        UploadedAt: file.uploadDate,
        FilePath: file.filePath
      }));
      
      setDocuments(mappedDocuments);
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

  const handleView = (document) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
  };


  const formatFileSize = (bytes) => {
    if (bytes === 0) return 'Unknown';
    const k = 1024;
    // const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('word') || fileType.includes('doc')) {
      return <FiFile className="text-blue-600" />;
    } else if (fileType.includes('pdf')) {
      return <FiFile className="text-red-600" />;
    } else if (fileType.includes('image') || fileType.includes('jpg') || fileType.includes('png')) {
      return <FiFile className="text-green-600" />;
    }
    return <FiFile className="text-gray-600" />;
  };

  // Filter documents based on search
  const filteredDocuments = documents.filter(doc => 
    doc.DocumentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Environmental Management System
          </h1>
          <p className="text-lg text-gray-600">
            View your EMS documents and procedures
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

        {/* Documents List Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold flex items-center">
              <FiFolder className="mr-2" />
              EMS documents ({filteredDocuments.length})
            </h2>
            
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
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FiFile className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No documents found</h3>
              <p className="mt-2 text-gray-500">
                {documents.length === 0 ? 'No documents available. Please upload via Admin Panel.' : 'No documents match your search criteria.'}
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
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th> */}
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
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatFileSize(document.FileSize)}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(document.UploadedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(document)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FiEye className="mr-1" />
                            Preview
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

        {/* Preview Modal */}
        {isPreviewOpen && selectedDocument && (
          <div className="fixed inset-0 bg-green-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            {/* <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-hidden flex flex-col"> */}
            <div className="w-3/4 h-180 bg-white rounded-lg p-6 flex flex-col shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">
                  Preview: {selectedDocument.DocumentName}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <iframe
                  src={`http://localhost:3001${selectedDocument.FilePath}`}
                  title={`Preview of ${selectedDocument.DocumentName}`}
                  className="w-full h-[70vh] border-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMS;