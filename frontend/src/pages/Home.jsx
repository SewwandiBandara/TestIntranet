import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import vision1 from '../assets/vision1.jpg';
import values3 from '../assets/values3.jpg';
import { GrLocation } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Working_Calender_2025 from "../assets/months(calendar)/Working_Calender_2025.pdf";

const Home = () => {
  // States for carousel images
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for news & announcements section 
  const [newsItems, setNewsItems] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  // States for events
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  // States for calendar image
  const [calendarImage, setCalendarImage] = useState(null);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [calendarError, setCalendarError] = useState(null);

  // States for monthly plan
  const [monthlyPlanImage, setMonthlyPlanImage] = useState(null);
  const [monthlyLoading, setMonthlyLoading] = useState(true);
  const [monthlyError, setMonthlyError] = useState(null);

  // State for PDF modal
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // State for monthly plan modal
  const [isMonthlyPlanModalOpen, setIsMonthlyPlanModalOpen] = useState(false);

  // Fetch carousel images from the backend
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/api/carousel');
        if (!response.ok) {
          throw new Error('Failed to fetch carousel images');
        }
        const data = await response.json();
        const imageUrls = data.map(image => `http://localhost:3001${image.ImagePath}`);
        setCarouselImages(imageUrls);
      } catch (err) {
        console.error('Error fetching carousel images:', err);
        setError('Failed to load carousel images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCarouselImages();
  }, []);

  // Auto switch carousel images every 5s
  useEffect(() => {
    if (carouselImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Fetch news from the backend
  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        setNewsLoading(true);
        setNewsError(null);
        const response = await fetch('http://localhost:3001/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news items');
        }
        const data = await response.json();
        setNewsItems(data);
      } catch (error) {
        console.error('Error fetching news items:', error);
        setNewsError('Failed to load news items. Please try again later.');
      } finally {
        setNewsLoading(false);
      }
    };
    fetchNewsItems();
  }, []);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true);
        setEventsError(null);
        const response = await fetch('http://localhost:3001/api/calendar');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        data.sort((a, b) => new Date(a.EventDate) - new Date(b.EventDate));
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setEventsError('Failed to load events. Please try again later.');
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Fetch calendar image from backend
  useEffect(() => {
    const fetchCalendarImage = async () => {
      setCalendarLoading(true);
      setCalendarError(null);
      try {
        const response = await fetch('http://localhost:3001/api/calendar-image');
        if (!response.ok) {
          throw new Error('Failed to fetch calendar image');
        }
        const data = await response.json();
        setCalendarImage(data.imagePath ? `http://localhost:3001${data.imagePath}` : null);
      } catch (error) {
        console.error('Error fetching calendar image:', error);
        setCalendarError(error.message);
        setCalendarImage(null);
      } finally {
        setCalendarLoading(false);
      }
    };
    fetchCalendarImage();
  }, []);

  // Fetch monthly plan image from the backend
  useEffect(() => {
    const fetchMonthlyPlan = async () => {
      setMonthlyLoading(true);
      setMonthlyError(null);
      try {
        const response = await fetch('http://localhost:3001/api/monthly-plan');
        if (!response.ok) {
          throw new Error('Failed to fetch monthly plan image');
        }
        const data = await response.json();
        setMonthlyPlanImage(data.imagePath ? `http://localhost:3001${data.imagePath}` : null);
      } catch (error) {
        console.error('Error fetching monthly plan image:', error);
        setMonthlyError(error.message);
        setMonthlyPlanImage(null);
      } finally {
        setMonthlyLoading(false);
      }
    };
    fetchMonthlyPlan();
  }, []);

  // Function to open PDF modal
  const openPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  // Function to close PDF modal
  const closePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  // Function to open monthly plan modal
  const openMonthlyPlanModal = () => {
    if (monthlyPlanImage) {
      setIsMonthlyPlanModalOpen(true);
    }
  };

  // Function to close monthly plan modal
  const closeMonthlyPlanModal = () => {
    setIsMonthlyPlanModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Content section */}
      <div className="flex-grow">
        <Navbar active={"/"} />

        <div className="pt-16 px-4 sm:px-6 lg:px-8 pb-8">
          {/* Company Image Carousel */}
          <div className="mb-8 flex justify-center pt-8">
            <div className="rounded-xl overflow-hidden w-full max-w-6xl h-96 shadow-2xl">
              <div className="relative w-full h-full">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-blue-700 font-medium">Loading...</span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-red-50 to-pink-50">
                    <span className="text-red-600 font-medium">{error}</span>
                  </div>
                ) : (
                  <img
                    src={carouselImages[currentImageIndex]}
                    alt={`Company showcase slide ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-1000"
                  />
                )}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-8 rounded-full transition-all ${
                        currentImageIndex === index 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`View carousel image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex flex-col lg:flex-row gap-8 p-2 max-w-7xl mx-auto">
            {/* Left side - News, Achievements, and content */}
            <div className="flex-1 space-y-8">
              {/* Company values section */}
              <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col sm:flex-row gap-6 border border-gray-100">
                <div className="w-full sm:w-1/2">
                  <div className="relative group overflow-hidden rounded-xl">
                    <img 
                      src={vision1}  
                      alt="Vision and Mission"
                      className="w-full h-70  object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-4 text-center">Our Vision & Mission</h3>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="relative group overflow-hidden rounded-xl">
                    <img 
                      src={values3}  
                      alt="Values"
                      className="w-full h-70 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-4 text-center">Our Values</h3>
                </div>
              </div>

              {/* News section */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">News and Announcements</h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  {newsLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                        <span className="text-gray-600">Loading news...</span>
                      </div>
                    </div>
                  ) : newsError ? (
                    <div className="flex items-center justify-center p-8 bg-red-50 rounded-xl">
                      <span className="text-red-600">{newsError}</span>
                    </div>
                  ) : newsItems.length === 0 ? (
                    <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">No news items available.</span>
                    </div>
                  ) : (
                    newsItems.map((news) => (
                      <div
                        key={news.Id}
                        className="group p-5 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300 bg-white"
                      >
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {news.Title}
                        </h3>
                        <p className="text-gray-600 mt-2 text-md leading-relaxed">
                          {news.Content.length > 150
                            ? `${news.Content.substring(0, 150)}...`
                            : news.Content}
                        </p>
                        <span className="text-sm text-gray-500 block mt-3 font-medium">
                          Posted on: {new Date(news.CreatedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Calendar and Events */}
            <div className="lg:w-96 xl:w-96 space-y-6">
              {/* Monthly calendar */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Monthly Calendar</h2>
                  <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-dashed border-green-200 p-4 flex flex-col items-center justify-center h-64">
                  {calendarLoading ? (
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-green-700 text-sm">Loading...</span>
                    </div>
                  ) : calendarError ? (
                    <span className="text-red-500 text-center">{calendarError}</span>
                  ) : calendarImage ? (
                    <img 
                      src={calendarImage} 
                      alt="Monthly calendar" 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📅</div>
                      <span>No monthly calendar available.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Monthly plan */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Monthly Plan</h2>
                  <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <div 
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-dashed border-purple-200 p-4 flex flex-col items-center justify-center h-64 cursor-pointer hover:border-purple-400 hover:shadow-md transition-all duration-300"
                  onClick={openMonthlyPlanModal}
                >
                  {monthlyLoading ? (
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-purple-700 text-sm">Loading...</span>
                    </div>
                  ) : monthlyError ? (
                    <span className="text-red-500 text-center">{monthlyError}</span>
                  ) : monthlyPlanImage ? (
                    <img 
                      src={monthlyPlanImage} 
                      alt="Monthly Plan" 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📋</div>
                      <span>No monthly plan available.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Yearly plan */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-center group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-xl font-bold text-white">
                  <button 
                    onClick={openPdfModal}
                    className="hover:text-yellow-200 transition-colors focus:outline-none flex items-center justify-center w-full"
                  >
                    <span>View Yearly Plan</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </h2>
                <p className="text-orange-100 text-sm mt-2">Download 2025 Working Calendar</p>
              </div>
            </div>
          </div>

          {/* Event Section */}
          <div className="bg-white rounded-2xl shadow-xl mt-8 p-6 border border-gray-100 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {eventsLoading ? (
                <div className="col-span-full flex items-center justify-center p-8">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <span className="text-gray-600">Loading events...</span>
                  </div>
                </div>
              ) : eventsError ? (
                <div className="col-span-full flex items-center justify-center p-8 bg-red-50 rounded-xl">
                  <span className="text-red-600">{eventsError}</span>
                </div>
              ) : events.length === 0 ? (
                <div className="col-span-full flex items-center justify-center p-8 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">No upcoming events.</span>
                </div>
              ) : (
                events
                  .filter(event => new Date(event.EventDate) >= new Date())
                  .map((event) => (
                    <div
                      key={event.Id}
                      className="group bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                          {event.Title}
                        </h3>
                        <div className="bg-indigo-100 text-indigo-600 text-md font-medium px-2 py-1 rounded-full">
                          {new Date(event.EventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {event.Description.length > 120
                          ? `${event.Description.substring(0, 120)}...`
                          : event.Description}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <span className="text-sm text-gray-500 font-medium">
                          {new Date(event.EventDate).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 text-white max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-6">Get in Touch</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Address */}
                <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/15 transition-all duration-300">
                  <div className="text-yellow-400 mr-4 mt-1 bg-yellow-400/20 p-2 rounded-lg">
                    <GrLocation className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">Address</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Samson Rubber Industries (Pvt) Ltd,<br />
                      Jinasena Mawatha, Mahara,<br />
                      Kadawatha, Sri Lanka
                    </p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/15 transition-all duration-300">
                  <div className="text-green-400 mr-4 mt-1 bg-green-400/20 p-2 rounded-lg">
                    <FiPhone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Phone</h4>
                    <p className="text-white text-sm">+94 77 781 5300</p>
                    <p className="text-white text-sm">+94 11 292 6065</p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/15 transition-all duration-300">
                  <div className="text-blue-400 mr-4 mt-1 bg-blue-400/20 p-2 rounded-lg">
                    <HiOutlineMail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">Email</h4>
                    <p className="text-white text-sm">
                      <a href="mailto:dsityreshop@dsityre.lk" className="hover:text-white hover:underline transition-colors">
                        dsityre@dsityre.lk
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Yearly Plan - 2025</h2>
              <button
                onClick={closePdfModal}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow p-6 overflow-auto">
              <object
                data={Working_Calender_2025}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-600 text-lg mb-4">
                    Your browser does not support PDF preview.
                  </p>
                  <a 
                    href={Working_Calender_2025} 
                    download="Working_Calendar_2025.pdf"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Download PDF
                  </a>
                </div>
              </object>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <a
                href={Working_Calender_2025}
                download="Working_Calendar_2025.pdf"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-medium"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Plan Modal */}
      {isMonthlyPlanModalOpen && monthlyPlanImage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Monthly Plan</h2>
              <button
                onClick={closeMonthlyPlanModal}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow p-6 overflow-auto flex items-center justify-center">
              <img
                src={monthlyPlanImage}
                alt="Monthly Plan - Zoomed"
                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {/* <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 text-center"> */}
      <footer className="bg-white text-black font-bold py-6 text-center ">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-black">
            All rights reserved © DSI Samson Rubber Industries - Information Technology Department {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;