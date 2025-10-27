import React from 'react';
import Navbar from '../components/Navbar';
import car1 from '../assets/car1.jpg';
import { useEffect, useState } from 'react';

const Achievements = () => {
  // Status for get data                  
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch achievements from backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/achievements');
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        // Map backend data to match frontend structure
        const mappedAchievements = data.map(achievement => ({
          id: achievement.Id,
          title: achievement.Title,
          description: achievement.Description,
          // date: achievement.AchievementDate,
          image: `http://localhost:3001${achievement.ImagePath}`
        }));
        setAchievements(mappedAchievements);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to load achievements. Please try again later.');
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Function to truncate long text with ellipsis
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0" 
        style={{ backgroundImage: `url(${car1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-grow">
        <Navbar active={"/achievements"} />
        
        <div className="pt-20 px-4 sm:px-6 pb-8">
          {/* Header */}
          <div className="text-center mb-12 pt-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Our Achievements
            </h1>
            <p className="text-xl font-medium text-blue-100 max-w-3xl mx-auto drop-shadow-md">
              Celebrating the milestones and recognitions that define our journey towards excellence
            </p>
          </div>
          
          {/* Awards Cards Grid */}
          <div className="flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-7xl">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
                    <span className="text-white text-lg font-medium drop-shadow-md">
                      Loading achievements...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-100/20 backdrop-blur-sm rounded-xl p-8 text-center border border-red-300/30">
                  <div className="text-red-300 text-lg font-medium mb-4">{error}</div>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Try Again
                  </button>
                </div>
              ) : achievements.length === 0 ? (
                <div className="bg-gray-100/20 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20">
                  <div className="text-white text-lg font-medium">
                    No achievements available at this time.
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {achievements.map((award) => (
                    <div 
                      key={award.id} 
                      className="group bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 overflow-hidden flex flex-col h-full"
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-gray-100 h-48 min-h-[12rem] flex items-center justify-center p-4">
                        {award.image ? (
                          <img 
                            src={award.image} 
                            alt={award.title} 
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="hidden items-center justify-center text-gray-400 text-sm absolute inset-0 bg-gray-100"
                          style={{ display: award.image ? 'none' : 'flex' }}
                        >
                          No image available
                        </div>
                      </div>
                      
                      {/* Content Container */}
                      <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white">
                        {/* Title - Fixed height with proper text handling */}
                        <div className="mb-3 min-h-[3rem] flex items-center justify-center rounded-md px">
                          <h3 className="text-lg font-bold text-gray-800 text-center leading-tight line-clamp-2">
                            {truncateText(award.title, 60)}
                          </h3>
                        </div>
                        
                        {/* Description - Scrollable if needed */}
                        {award.description && (
                          <div className="mb-4 flex-grow">
                            <div className="max-h-[80px] overflow-y-auto">
                              <p className="text-gray-600 text-sm leading-relaxed text-center">
                                {truncateText(award.description, 120)}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {/* Achievement Badge */}
                        <div className="flex justify-center mt-auto pt-2">
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium border border-amber-200">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 mr-1 flex-shrink-0" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                            <span className="truncate">Achievement</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-6 text-center relative z-10 shadow-lg mt-8">
        <div className="container mx-auto px-4">
          <p className="text-sm sm:text-base">
            All rights reserved © DSI Samson Rubber Industries - Information Technology Department {new Date().getFullYear()}
          </p>
          <p className="text-xs text-blue-200 mt-1">
            Driving innovation through excellence
          </p>
        </div>
      </footer>

      {/* Custom CSS for scrollbar and text truncation */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar for description */
        .max-h-[80px]::-webkit-scrollbar {
          width: 4px;
        }
        
        .max-h-[80px]::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        
        .max-h-[80px]::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }
        
        .max-h-[80px]::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default Achievements;