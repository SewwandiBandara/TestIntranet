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
import backgrnd5 from "../assets/backgrnd5.jpg";
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
    <div className="w-full min-h-screen flex flex-col">
      {/* Background image section */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{ backgroundImage: `url(${backgrnd5})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content section */}
      <div className="relative z-10 flex-grow">
        <Navbar active={"/"} />

        <div className="pt-16 px-4 sm:px-6 lg:px-8 pb-8">
          {/* Company Image Carousel */}
          <div className="mb-4 flex justify-center pt-17">
            <div className="rounded-lg overflow-hidden w-full h-100">
              <div className="relative w-full h-full border-7 border-white">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">Loading...</span>
                  </div>
                ) : error ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-red-500">{error}</span>
                  </div>
                ) : (
                  <img
                    src={carouselImages[currentImageIndex]}
                    alt={`Company showcase slide ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-1000"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center space-x-1 p-2 bg-gradient-to-t from-black/50 to-transparent">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 w-6 rounded-full transition-all ${
                        currentImageIndex === index ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'
                      }`}
                      aria-label={`View carousel image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-2">
            {/* Left side - News, Achievements, and content */}
            <div className="flex-1 space-y-6">
              {/* Company values section */}
              <div className="bg-transparent rounded-lg shadow-lg shadow-black p-4 sm:p-6 backdrop-blur-sm bg-opacity-90 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2 pr-0 sm:pr-6">
                  <img 
                    src={vision1}  
                    alt="Vision and Mission"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-full sm:w-1/2 pr-0 sm:pr-6">
                  <img 
                    src={values3}  
                    alt="Values"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* News section */}
              <div className="bg-transparent rounded-lg shadow-lg shadow-black p-4 sm:p-6 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-2xl sm:text-3xl text-black font-bold mb-4 sm:mb-6 pb-2 border-b-2 border-gray-200">
                  News and Announcements
                </h2>
                <div className="space-y-4">
                  {newsLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <span className="text-gray-500">Loading news...</span>
                    </div>
                  ) : newsError ? (
                    <div className="flex items-center justify-center p-4">
                      <span className="text-red-500">{newsError}</span>
                    </div>
                  ) : newsItems.length === 0 ? (
                    <div className="flex items-center justify-center p-4">
                      <span className="text-gray-500">No news items available.</span>
                    </div>
                  ) : (
                    newsItems.map((news) => (
                      <div
                        key={news.Id}
                        className="group p-4 border-b border-gray-100 hover:text-black transition-colors"
                      >
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-300">
                          {news.Title}
                        </h3>
                        <p className="text-white mt-2 text-sm sm:text-base">
                          {news.Content.length > 100
                            ? `${news.Content.substring(0, 100)}...`
                            : news.Content}
                        </p>
                        <span className="text-sm text-white block mt-2">
                          Posted on: {new Date(news.CreatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Calendar and Events */}
            <div className="lg:w-96 xl:w-96 space-y-6 mt-4">
              {/* Monthly calendar */}
              <div className=" bg-transparent rounded-lg shadow-lg shadow-black  p-4 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-xl font-semibold text-black mb-4 text-center">
                  Monthly Calendar
                </h2>
                <div className=" bg-gray-50 rounded-lg border border-dashed border-gray-300 p-4 flex flex-col items-center justify-center h-48 sm:h-60">
                  {calendarLoading ? (
                    <span className="text-gray-500">Loading...</span>
                  ) : calendarError ? (
                    <span className="text-red-500">{calendarError}</span>
                  ) : calendarImage ? (
                    <img 
                      src={calendarImage} 
                      alt="Monthly calendar" 
                      className="w-full h-full object-contain rounded-md "
                    />
                  ) : (
                    <span className="text-gray-600">No monthly calendar available.</span>
                  )}
                </div>
              </div>

              {/* Monthly plan */}
              <div className="bg-transparent rounded-lg shadow-lg shadow-black mt-2 p-4 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-lg sm:text-xl font-semibold text-black mb-4 text-center">
                  Monthly Plan
                </h2>
                <div 
                  className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-4 flex flex-col items-center justify-center h-48 sm:h-60 cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={openMonthlyPlanModal}
                >
                  {monthlyLoading ? (
                    <span className="text-gray-500">Loading...</span>
                  ) : monthlyError ? (
                    <span className="text-red-500">{monthlyError}</span>
                  ) : monthlyPlanImage ? (
                    <img 
                      src={monthlyPlanImage} 
                      alt="Monthly Plan" 
                      className="w-full h-full object-contain rounded-md"
                    />
                  ) : (
                    <span className="text-gray-600">No monthly plan image available.</span>
                  )}
                </div>
              </div>

              {/* Yearly plan */}
              <div className="bg-transparent rounded-lg shadow-lg shadow-black p-4 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-lg sm:text-xl font-semibold text-black text-center">
                  <button 
                    onClick={openPdfModal}
                    className="hover:text-amber-500 hover:underline transition-colors focus:outline-none"
                  >
                    View Yearly Plan
                  </button>
                </h2>
              </div>
            </div>
          </div>

          {/* Event Section */}
          <div className="bg-transparent rounded-lg shadow-lg shadow-black p-4 sm:p-6 backdrop-blur-sm bg-opacity-90">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 pb-2 border-b-2 border-gray-200">
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {eventsLoading ? (
                <div className="flex items-center justify-center p-4">
                  <span className="text-gray-500">Loading events...</span>
                </div>
              ) : eventsError ? (
                <div className="flex items-center justify-center p-4">
                  <span className="text-red-500">{eventsError}</span>
                </div>
              ) : events.length === 0 ? (
                <div className="flex items-center justify-center p-4">
                  <span className="text-gray-500">No upcoming events.</span>
                </div>
              ) : (
                events
                  .filter(event => new Date(event.EventDate) >= new Date())
                  .map((event) => (
                    <div
                      key={event.Id}
                      className="group relative p-4 border-b border-gray-100 transition-colors rounded-lg cursor-pointer"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2">
                        {event.Title}
                      </h3>
                      <p className="text-white text-sm sm:text-base mb-2">
                        {event.Description.length > 500
                          ? `${event.Description.substring(0, 500)}...`
                          : event.Description}
                      </p>
                      <p className="text-gray-200 text-sm sm:text-base">
                        Date: {new Date(event.EventDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="mt-15 bg-transparent rounded-lg shadow-lg shadow-black p-4 sm:p-8 backdrop-blur-sm bg-opacity-90">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 text-left">Contact Us</h2>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8">
                {/* Address */}
                <div className="flex items-start flex-1 border border-black rounded-lg p-4">
                  <div className="text-red-600 mr-4 mt-1">
                    <GrLocation className="h-5 sm:h-6 w-5 sm:w-6" fill="none" />
                  </div>
                  <div>
                    <h4 className="font-medium text-base sm:text-lg text-red-600">Address</h4>
                    <p className="text-white text-sm sm:text-base">
                      Samson Rubber Industries (Pvt) Ltd,
                    </p>
                    <p className="text-white text-sm sm:text-base">Jinasena Mawatha, Mahara,</p>
                    <p className="text-white text-sm sm:text-base">Kadawatha, Sri Lanka</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start flex-1 border border-black rounded-lg p-4">
                  <div className="text-red-600 mr-4 mt-1">
                    <FiPhone className="h-5 sm:h-6 w-5 sm:w-6" fill="none" />
                  </div>
                  <div>
                    <h4 className="font-medium text-base sm:text-lg text-red-600">Phone</h4>
                    <p className="text-white text-sm sm:text-base">+94 77 781 5300</p>
                    <p className="text-white text-sm sm:text-base">+94 11 292 8700</p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start flex-1 border border-black rounded-lg p-4">
                  <div className="text-red-600 mr-4 mt-1">
                    <HiOutlineMail className="h-5 sm:h-6 w-5 sm:w-6" fill="none" />
                  </div>
                  <div>
                    <h4 className="font-medium text-base sm:text-lg text-red-600">Email</h4>
                    <p className="text-white text-sm sm:text-base">
                      <a href="mailto:dsityreshop@dsityre.lk" className="hover:text-amber-500">
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
        <div className="fixed inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-50 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-black">Yearly Plan - 2025</h2>
              <button
                onClick={closePdfModal}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow p-4 overflow-auto">
              <object
                data={Working_Calender_2025}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p className="text-gray-600">
                  Your browser does not support PDFs. 
                  <a 
                    href={Working_Calender_2025} 
                    download="Working_Calendar_2025.pdf"
                    className="text-blue-600 hover:underline"
                  >
                    Download the PDF
                  </a> instead.
                </p>
              </object>
            </div>
            <div className="p-4 border-t">
              <a
                href={Working_Calender_2025}
                download="Working_Calendar_2025.pdf"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Plan Modal */}
      {isMonthlyPlanModalOpen && monthlyPlanImage && (
        <div className="fixed inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-50 rounded-lg shadow-lg w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-black">Monthly Plan - Zoomed View</h2>
              <button
                onClick={closeMonthlyPlanModal}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow p-4 overflow-auto">
              <img
                src={monthlyPlanImage}
                alt="Monthly Plan - Zoomed"
                className="w-full h-full object-contain rounded-md max-w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-4 text-center relative z-10">
        <p className="text-xs sm:text-sm">
          All rights reserved © DSI Samson Rubber Industries - Information Technology Department {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Home;