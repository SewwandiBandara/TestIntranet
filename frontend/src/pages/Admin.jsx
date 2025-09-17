import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiCalendar, FiImage, FiFileText, FiUsers, FiSettings, FiAward, FiMessageSquare } from 'react-icons/fi';
import { TbLogout } from "react-icons/tb";
import Navbar from '../components/Navbar';
import { FaSearch } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect } from 'react';
//import { useEffect } from 'react';

const COPYRIGHT_TEXT = `All rights reserved © DSI Samson Rubber Industries - Information Technology Department`;


const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('carousel');
  const [activeApplication, setActiveApplication] = useState(null);
  
  // State for data from API
  //const [carouselImages, setCarouselImages] = useState([]);


  // Form states
  //const [carouselForm, setCarouselForm] = useState({ name: '', image: null });



// useEffect( () => {
//   const fetchData = async() => {
//     try{
//       switch(activeTab){
//         case 'carousel':
//           const carouselResponse = await fetch('http://localhost:3001/api/carousel/')
//           const carouselData = carouselResponse.json();
//           setCarouselImages(carouselData);
//           break;
//       }
//     }
//     catch(error){
//       console.error('Error occurs' .error);
//     }
//   }
// });







  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       switch (activeTab) {
  //         case 'carousel':
  //           const carouselResponse = await fetch('http://localhost:3001/api/carousel');
  //           const carouselData = await carouselResponse.json();
  //           setCarouselImages(carouselData);
  //           break;
  //       }
  //     }
  //     catch (error) {
  //       console.error('Error fetching data', error);
  //     }
  //   }
  //   fetchData(activeTab);
  // }
 

  const applications = [
    { id: 'hr', name: 'Human Resource Management', icon: <FiUsers /> },
    { id: 'medical', name: 'Medical', icon: <FiFileText /> },
    { id: 'display', name: 'Display Panel', icon: <FiImage /> },
    { id: 'appraisal', name: 'Appraisal', icon: <FiFileText /> },
    { id: 'feedback', name: 'Feedback Form', icon: <FiMessageSquare /> },
    { id: 'nonconformity', name: 'Non-Conformity', icon: <FiSettings /> },
    { id: 'sfa', name: 'SFA', icon: <FiSettings /> },
    { id: 'ifs', name: 'IFS', icon: <FiSettings /> },
    { id: 'kpi', name: 'KPI', icon: <FiSettings /> },
    { id: 'wms', name: 'WMS', icon: <FiSettings /> },
    { id: 'docware', name: 'Docware', icon: <FiSettings /> },
    { id: 'production display', name: 'Production Display', icon: <FiSettings /> }
  ];

  const policies = [
    { id: 1, title: 'Standard Operating Procedures', category: 'SOP' },
    { id: 2, title: 'Internation Organization for Standardization', category: 'ISO' },
    { id: 3, title: 'Quality Management System', category: 'QMS' },
    { id: 4, title: 'Environmental Management System', category: 'EMS' }
  ];

 const renderContent = () => {
    switch (activeTab) {
      case 'carousel':

      ///--- Company image carousel ---///
        return (
          <div className="space-y-6">
            <h2 className=" text-2xl font-bold mb-4">Company Image Carousel</h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 rounded-lg shadow p-6 border border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800 mb-6">Add new image to the company carousel</h1>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Title Input */}
                        <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            placeholder="Enter image title"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                        
                        {/* Image Upload */}
                        <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="flex items-center gap-3">
                            <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                        </div>
                        </div>
                    </div>
                    
                    {/* Preview Area */}
                    <div className="mt-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 p-4 flex flex-col items-center justify-center h-48">
                        <span className="text-gray-400 mb-2">Image preview will appear here</span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Upload Image
                        </button>
                        <button className="px-6 py-2 bg-gray-300 text-black hover:text-white rounded-md hover:bg-gray-700 transition-colors">
                        Cancel
                        </button>
                    </div>
                </div>
                </div>
            </div>
            
            <div className='flex flex-col gap-4 p-4'>
              <h1 className='font-bold'>Manage existing images</h1>
              <table className="w-3/4 bg-black border-1 border-black rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-black ">
                  <tr className='text-center'>
                    <td className="px-4 py-4 justify-center items-center whitespace-nowrap text-sm font-medium text-black"></td>
                    <td className="px-6 py-4  whitespace-nowrap align-middle">
                      <div className="h-20 w-20 border mx-auto"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className='flex justify-center space-x-2'> 
                        <button className="text-blue-600 hover:text-blue-900 mr-3 border-1 rounded px-4 ">Edit</button>
                      <button className="text-red-600 hover:text-red-900 border-1 rounded px-3">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

        


      ///----------------------- news and announcements -------------------------------------///
      case 'news':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">News & Announcements</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Search news or announcements..."
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <FaSearch />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Latest News</h3>
                  <p className="text-gray-600">xxxxxxxxx</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Announcements</h3>
                  <p className="text-gray-600">xxxxxxx</p>
                </div>
              </div>
            </div>

            {/* News Management Section */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Add News & Announcements</h3>
              <form className="space-y-4">
                <label className='font-semibold text-blue-950'>Title:</label>
                <input
                  type="text"
                  placeholder="News Title"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className='font-semibold text-blue-950'>Content:</label>
                <textarea
                  placeholder="News Content"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="w-2/4 flex space-x-3 pt-2">
                  <button className="px-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex-1">
                    Add
                  </button>
                  <button className="px-1 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-400 transition-colors flex-1">
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* manage existing news and announcements */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Manage News & Announcements</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="border border-gray-300 rounded-md px-3 py-1 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <IoSearchOutline className="w-4 h-4 absolute left-2.5 top-2.5  text-gray-400" fill="none" stroke="currentColor" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full   divide-y divide-black border-1 border-black rounded-lg">
                  <thead className="bg-gray-50">
                    <tr className='text-center '>
                      <th scope="col" className="px-6 py-3 font-bold text-medium  text-blue-900  tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 font-bold  text-medium text-blue-900  tracking-wider">
                        Content
                      </th>
                      <th scope="col" className="px-6 py-3 font-bold  text-medium text-blue-900  tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-black">
                    <tr className='text-center'>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">Product Launch</div>
                        
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">New product line introduction</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    {/* <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">Team Meeting</div>
                        <div className="text-sm text-gray-500">Quarterly review meeting</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2025-08-20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">2</span> of <span className="font-medium">2</span> events
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-500 bg-white hover:text-red-900">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-500 bg-white hover:text-red-900">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        );


      ///----------------------- working calendar section -----------------------------------///

      case 'calendar':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Working Calendar</h2>
          
            {/* Calendar Widget Section */}
            <div className="bg-gray-100 rounded-lg shadow p-4 h-64 flex items-center justify-center">
              <span className="text-gray-400 mb-2 ">
                <p className='pb-3'>Monthly calendar......</p>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-md file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100 "
                />
              </span>
                    
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly plan</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Two-column layout for event management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add New Event Section */}
              <div className="bg-blue-50 rounded-lg shadow-lg p-6 border border-blue-100">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Add New Event</h3>
              
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                    <input
                      type="text"
                      placeholder="Enter event title"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
                    <textarea
                      placeholder="Enter event description"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                
                  {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                  <div className="bg-white border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center h-32">
                    <span className="text-gray-400 mb-2 ">Image Preview</span>
                    <input
                                  type="file"
                                  accept="image/*"
                                  className="block w-full text-sm text-gray-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-md file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100 "
                                  />
                  </div>
                </div> */}
                
                  <div className="flex space-x-3 pt-2">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors flex-1">
                      Add Event
                    </button>
                    <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-400 transition-colors flex-1">
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Manage Existing Events Section */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Manage Events</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="border border-gray-300 rounded-md px-3 py-1 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <svg className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border-1 border-black rounded-lg">
                    <thead className="bg-gray-50">
                      <tr className='text-center'>
                        <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500  tracking-wider">
                          Event Title
                        </th>
                        <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500  tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500  tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500  tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {/* <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">Product Launch</div>
                        <div className="text-sm text-gray-500">New product line introduction</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2025-08-15
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">Team Meeting</div>
                        <div className="text-sm text-gray-500">Quarterly review meeting</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2025-08-20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody> */}
                  </table>
                </div>
              
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">2</span> of <span className="font-medium">2</span> events
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-blue-300 rounded-md text-sm font-medium text-blue-700 hover:text-blue-900 bg-white ">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-blue-300 rounded-md text-sm font-medium text-blue-700 hover:text-blue-900 bg-white ">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      ///------------------------- applications section -----------------------------------///

      case 'applications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Applications</h2>
            <div className="grid grid-cols-2 gap-4">
              {applications.map(app => (
                <div
                  key={app.id}
                  className={`border rounded-lg p-4 flex items-center space-x-3 cursor-pointer ${activeApplication === app.id ? 'border-blue-500 bg-blue-50' : 'border-gray-400 hover:bg-gray-50'}`}
                  onClick={() => setActiveApplication(app.id)}
                >
                  <div className="text-blue-600">{app.icon}</div>
                  <div>
                    <h3 className="font-medium">{app.name}</h3>
                    <p className="text-sm text-gray-500">Manage {app.name.toLowerCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      ///----------------------- policies and procedures section ---------------------------///
      case 'policies':
        return (
          <div className="space-y-6 w-1/2">
            <h2 className="text-2xl font-bold mb-4">Policies & Procedures</h2>
            <div className="space-y-4">
              {policies.map(policy => (
                <div
                  key={policy.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/policies/${policy.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{policy.title}</h3>
                      <span className="text-sm text-gray-500">{policy.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      ///----------------------- manage communication section -------------------------------///

      case 'communication':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Communication</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3 flex items-center">
                  <FiMail className="mr-2" /> Email Management
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('#')}
                    className="w-full text-left px-4 py-3 rounded flex items-center space-x-3 hover:bg-gray-400 text-black hover:text-white transition-colors">
                    Send Bulk Email
                  </button>
                  <button
                    onClick={() => navigate('#')}
                    className="w-full text-left px-4 py-3 rounded flex items-center space-x-3 hover:bg-gray-400 text-black hover:text-white transition-colors">
                    Email Templates
                  </button>
                  <button
                    onClick={() => navigate('#')}
                    className="w-full text-left px-4 py-3 rounded flex items-center space-x-3 hover:bg-gray-400 text-black hover:text-white transition-colors">
                    Subscriber List
                  </button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">External Contacts</h3>
                <div className="space-y-3">
                  <input type="text" placeholder="Add new contact" className="w-full border rounded px-3 py-2" />
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Add Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      ///----------------------- manage achievements page -----------------------------------///
      
      case 'achievements':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-blue-50 rounded-lg shadow p-6 border border-gray-200">
                <h1 className="text-xl font-bold text-gray-800 mb-6">Add new achievements to showcase company's outcomes</h1>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Form Fields */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          placeholder="Enter achievement title"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                        
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          placeholder="Enter description of achievement"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                        />
                      </div>
                        
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                        
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column - Image Preview */}
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                      <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                        <span className="text-gray-400 mb-2">Image preview will appear here</span>
                      </div>
                    </div>
                  </div>
                    
                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Save Achievement
                    </button>
                    <button className="px-6 py-2 bg-gray-300 text-gray-700 hover:text-white rounded-md hover:bg-gray-700 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Existing Achievements Table */}
            <div className='flex flex-col gap-4 p-4'>
              <h1 className='text-xl font-bold text-gray-800'>Manage existing achievements</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-black border-1 border-black rounded-lg overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr className='text-center'>
                      <th className="px-6 py-3  text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-600 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3  text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className='text-center align-middle'>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-15 w-15  border"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900  mr-3 border px-3 ">Edit</button>
                        <button className="text-red-600 hover:text-red-900 border px-2">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a category from the left menu</div>;
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-400">
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden pt-13">
        {/* Left Panel - Navigation */}
        <div className="w-80 bg-blue-200 text-black p-4 overflow-y-auto ">
          <h1 className="text-2xl font-bold mb-8">DSI Admin Panel</h1>
          
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('carousel')}
              className={`w-full text-left px-4 py-3 rounded flex items-center space-x-3 ${activeTab === 'carousel' ? 'bg-amber-200' : 'hover:bg-amber-300'}`}
            >
              <FiImage />
              <span>Image Carousel</span>
            </button>
             <button
              onClick={() => setActiveTab('news')}
              className={`w-full text-left px-4 py-3 rounded flex items-center space-x-3 ${activeTab === 'news' ? 'bg-emerald-200' : 'hover:bg-emerald-300'}`}
            >
              <FaNewspaper />
              <span>News & Announcements</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full text-left px-4 py-3 rounded flex items-center space-x-3 ${activeTab === 'calendar' ? 'bg-fuchsia-200' : 'hover:bg-fuchsia-300'}`}
            >
              <FiCalendar />
              <span>Working Calendar</span>
            </button>
            
            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full text-left px-4 py-3 rounded flex items-center space-x-3 ${activeTab === 'applications' ? 'bg-green-200' : 'hover:bg-green-300'}`}
            >
              <FiSettings />
              <span>Applications</span>
            </button>
            
            <button
              onClick={() => setActiveTab('policies')}
              className={`w-full text-left px-4 py-3 rounded flex items-center space-x-3 ${activeTab === 'policies' ? 'bg-purple-200' : 'hover:bg-purple-300'}`}
            >
              <FiFileText />
              <span>Policies & Procedures</span>
            </button>
            
            <button
              onClick={() => setActiveTab('communication')}
              className={`w-full text-left px-4 py-3 rounded flex items-center space-x-3 ${activeTab === 'communication' ? 'bg-sky-200' : 'hover:bg-sky-300'}`}
            >
              <FiMail />
              <span>Communication</span>
            </button>
            
            <button
              onClick={() => setActiveTab('achievements')}
              className={`w-full text-left px-4 py-3 rounded flex items-center space-x-3 ${activeTab === 'achievements' ? 'bg-blue-700' : 'hover:bg-blue-300'}`}
            >
              <FiAward />
              <span>Achievements</span>
            </button>
           <button
            onClick={() => navigate('/')}
            className="w-full text-left px-4 py-3 rounded flex items-center space-x-3 hover:bg-gray-500 text-black hover:text-white transition-colors"
            >
            <TbLogout />
            <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="bg-gray-100 rounded-lg shadow p-6 min-h-full">
            {renderContent()}
          </div>
        </div>
      </div>
      
      {/* Footer at the bottom */}
      <footer className='bg-blue-950 text-white py-4 text-center relative z-10'>
        <p className='text-sm'>
          {COPYRIGHT_TEXT} {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Admin;