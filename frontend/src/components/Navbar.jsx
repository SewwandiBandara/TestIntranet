import React, { useState } from 'react';
import logoImg from '../assets/logoImg.jpg';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed w-full bg-blue-950 py-2 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 text-white">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logoImg} alt="Logo" className="h-8 sm:h-10 w-auto rounded-lg" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation items */}
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } lg:flex flex-col lg:flex-row lg:flex-1 lg:justify-evenly gap-4 lg:gap-10 font-medium absolute lg:static top-12 left-0 w-full lg:w-auto bg-blue-950 lg:bg-transparent p-4 lg:p-0 transition-all duration-300`}
        >
          {/* Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-amber-400 cursor-pointer hover:underline ${isActive ? 'text-amber-400 underline' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          {/* Applications dropdown */}
          <div className="relative group">
            <div className="text-white cursor-pointer hover:text-amber-400 hover:underline">
              Applications
            </div>
            <div className="absolute left-0 lg:group-hover:block hidden bg-blue-950 min-w-[150px] rounded-md shadow-lg z-10 mt-1 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              <ul className="py-1">
                {/* HR Section */}
                <li className="relative px-4 py-2 hover:bg-yellow-400 hover:text-black group/hr">
                  <Link to="http://192.168.178.12/hris/login.aspx?ReturnUrl=%2fhris%2fdefault.aspx" onClick={() => setIsOpen(false)}>
                    HR
                  </Link>
                  <div className="absolute hidden group-hover/hr:block left-full top-0 ml-1 bg-blue-400 min-w-[150px] rounded-md shadow-lg z-20 lg:left-auto lg:right-full lg:mr-1 transition-opacity duration-200 opacity-0 group-hover/hr:opacity-100">
                    <ul className="py-1">
                      <li>
                        <Link
                          to="#"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          Medical
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://192.168.100.51:8085/login.aspx"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          Appraisal
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://192.168.100.51:8088/loginhandler.aspx"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          KPI
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Production Section */}
                <li className="relative px-4 py-2 hover:bg-yellow-400 hover:text-black group/production">
                  <Link to="/production" onClick={() => setIsOpen(false)}>
                    Production
                  </Link>
                  <div className="absolute hidden group-hover/production:block left-full top-0 ml-1 bg-blue-400 min-w-[200px] rounded-md shadow-lg z-20 lg:left-auto lg:right-full lg:mr-1 transition-opacity duration-200 opacity-0 group-hover/production:opacity-100">
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/display"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          Display Panel
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://192.168.100.51:8071/Account/Login.aspx"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          Feedback Form
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://192.168.100.51:6060/User_Login.aspx"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          Non-Conformity
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          Production Display
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://192.168.13.1:8080/User_Login.aspx"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          WMS
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-400 hover:text-black">
                  <Link to="http://192.168.100.80:58080/" className="block" onClick={() => setIsOpen(false)}>
                    IFS
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-400 hover:text-black">
                  <Link to="http://192.168.100.15/DocuWare/Platform/WebClient/ClientAccount/LogIn?returnUrl=%2FDocuWare%2FPlatform%2FWebClient" className="block" onClick={() => setIsOpen(false)}>
                    Docuware
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-yellow-400 hover:text-black">
                  <Link to="http://192.168.100.51:8086/sfaeports.html" className="block" onClick={() => setIsOpen(false)}>
                    SFA
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Policies dropdown */}
          <div className="relative group">
            <div className="text-white cursor-pointer hover:text-amber-400 hover:underline">
              Policies and Procedures
            </div>
            <div className="absolute left-0 lg:group-hover:block hidden bg-blue-950 min-w-[150px] rounded-md shadow-lg z-10 mt-1 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              <ul className="py-1">
                <li className="block px-4 py-2 hover:bg-yellow-400 hover:text-black">
                  <Link to="#" onClick={() => setIsOpen(false)}>
                    SOP
                  </Link>
                </li>
                <li className="block px-4 py-2 hover:bg-yellow-400 hover:text-black group/iso">
                  <Link to="#" onClick={() => setIsOpen(false)}>
                    ISO
                  </Link>
                  <div className="absolute hidden group-hover/iso:block left-full top-0 ml-1 bg-blue-400 min-w-[200px] rounded-md shadow-lg z-20 lg:left-auto lg:right-full lg:mr-1 transition-opacity duration-200 opacity-0 group-hover/iso:opacity-100">
                    <ul className="py-1">
                      <li>
                        <Link
                          to="#"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          QMS
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          EMS
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Communication dropdown */}
          <div className="relative group">
            <div className="text-white cursor-pointer hover:text-amber-400 hover:underline">
              Communication
            </div>
            <div className="absolute left-0 lg:group-hover:block hidden bg-blue-950 min-w-[150px] rounded-md shadow-lg z-10 mt-1 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              <ul className="py-1">
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    E-mail
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    EXT List
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Achievements Link */}
          <NavLink
            to="/ach"
            className={({ isActive }) =>
              `hover:text-amber-400 cursor-pointer hover:underline ${isActive ? 'text-amber-400 underline' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Achievements
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;