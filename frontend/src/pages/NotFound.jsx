import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex-grow">
        <Navbar active={""} />

        <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center max-w-2xl">
            {/* Large 404 Number with Gradient */}
            <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
              404
            </div>

            {/* Page Not Found Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed px-4">
              Sorry, we couldn't find the page you're looking for.
              It might have been removed or the URL may be incorrect.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Go to Home
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-black font-bold py-6 text-center shadow-lg mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">
            All rights reserved © DSI Samson Rubber Industries - Information Technology Department {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default NotFound