import React from 'react';
import Navbar from '../components/Navbar';
import { FiMonitor, FiPackage, FiTool } from 'react-icons/fi';
import { RiMotorbikeFill } from "react-icons/ri";

const DisplayPanel = () => {
  const cards = [
    {
      title: "Customer Order Status",
      description: "Track and monitor customer order progress in real-time",
      icon: <FiMonitor className="w-12 h-12" />,
      url: "http://192.168.100.51:9097/costatus.aspx",
      color: "from-blue-400 to-blue-500",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      title: "Stores Panel",
      description: "Manage inventory and store operations efficiently",
      icon: <FiPackage className="w-12 h-12" />,
      url: "http://192.168.100.51:9097/Login.aspx",
      color: "from-green-400 to-green-500",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      title: "Grading Press Panel",
      description: "Monitor grading press operations and status",
      icon: <FiTool className="w-12 h-12" />,
      url: "http://192.168.100.51:8099/MainWindow.aspx",
      color: "from-purple-400 to-purple-500",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    },
    {
      title: "Bicycle Panel",
      description: "Access bicycle production and tracking system",
      icon: <RiMotorbikeFill className="w-12 h-12" />,
      url: "http://192.168.100.51:9095/",
      color: "from-orange-400 to-orange-500",
      hoverColor: "hover:from-orange-600 hover:to-orange-700"
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Content */}
      <div className="flex-grow">
        <Navbar active={"/display"} />

        <div className="pt-16 px-4 sm:px-6 lg:px-8 pb-8">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Production Display Panels
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access various production monitoring and management systems
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Cards Grid */}
          <div className="flex justify-center px-2 sm:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-7xl">
              {cards.map((card, index) => (
                <a
                  key={index}
                  href={card.url}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${card.color} ${card.hoverColor} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 flex flex-col items-center text-center h-full min-h-[280px] border border-white/20`}>
                    {/* Icon */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {card.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
                      {card.title}
                    </h2>

                    {/* Description */}
                    <p className="text-white/90 text-sm leading-relaxed flex-grow">
                      {card.description}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-6 flex items-center text-white font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2">Access Panel</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Quick Access Information</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                These display panels provide real-time access to various production and operational systems.
                Click on any panel to access the respective system. For assistance or technical support,
                please contact the IT Department.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-black font-bold py-6 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">
            All rights reserved © DSI Samson Rubber Industries - Information Technology Department {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DisplayPanel;