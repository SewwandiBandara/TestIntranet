import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logoImg.jpg';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [extensionPdfUrl, setExtensionPdfUrl] = useState(null);
  // New state for email modal
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false); 
  const [emailPdfUrl, setEmailPdfUrl] = useState(null); 
  // New state for QMS PDF
  // const [QmsPdfUrl, setQmsPdfUrl] = useState(null); 
  // const [isQmsModalOpen, setIsQmsModalOpen] = useState(false); 


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const fetchExtensionPdf = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/extension');
      if (!response.ok) {
        throw new Error('Failed to fetch extension PDF');
      }
      const data = await response.json();
      if (data.imagePath) {
        setExtensionPdfUrl(`http://localhost:3001${data.imagePath}`);
      } else {
        setExtensionPdfUrl(null);
      }
    } catch (error) {
      console.error('Error fetching extension PDF:', error);
      setExtensionPdfUrl(null);
    }
  };

  const fetchEmailPdf = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/emailList');
      if (!response.ok) {
        throw new Error('Failed to fetch email PDF');
      }
      const data = await response.json();
      if (data.emailPath) {
        setEmailPdfUrl(`http://localhost:3001${data.emailPath}`);
      } else {
        setEmailPdfUrl(null);
      }
    } catch (error) {
      console.error('Error fetching email PDF:', error);
      setEmailPdfUrl(null);
    }
  };

  // const fetchQmsPdf = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/api/qms');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch QMS PDF');
  //     }
  //     const data = await response.json();
  //     if (data.imagePath) {
  //       setQmsPdfUrl(`http://localhost:3001${data.imagePath}`);
  //     } else {
  //       setQmsPdfUrl(null);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching QMS PDF:', error);
  //     setQmsPdfUrl(null);
  //   }
  // };


  useEffect(() => {
    fetchExtensionPdf();
    fetchEmailPdf();
    // fetchQmsPdf(); 
  }, []);


  const openPdfModal = async () => {
    if (!extensionPdfUrl) {
      await fetchExtensionPdf(); // Refetch if not loaded
    }
    setIsPdfModalOpen(true);
  };

  const openEmailModal = async () => {
    if (!emailPdfUrl) {
      await fetchEmailPdf(); // Refetch if not loaded
    }
    setIsEmailModalOpen(true);
  };

  // const openQmsModal = async () => {
  //   if (!QmsPdfUrl) {
  //     await fetchQmsPdf(); // Refetch if not loaded
  //   }
  //   setIsQmsModalOpen(true);
  // };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  // const closeQmsModal = () => {
  //   setIsQmsModalOpen(false);
  // };

  

  const noPdfMessage = !extensionPdfUrl ? (
    <div className="flex items-center justify-center h-[70vh] text-gray-500">
      No extension list available. Please upload one via Admin Panel.
    </div>
  ) : null;

  const noEmailMessage = !emailPdfUrl ? (
    <div className="flex items-center justify-center h-[70vh] text-gray-500">
      No email list available. Please upload one via Admin Panel.
    </div>
  ) : null;

  // const noQmsMessage = !QmsPdfUrl ? (
  //   <div className="flex items-center justify-center h-[70vh] text-gray-500">
  //     No QMS document available. Please upload one via Admin Panel.
  //   </div>
  // ) : null;


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
          className={`${isOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row lg:flex-1 lg:justify-evenly gap-4 lg:gap-10 font-medium absolute lg:static top-12 left-0 w-full lg:w-auto bg-blue-950 lg:bg-transparent p-4 lg:p-0 transition-all duration-300`}
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
                <li className="relative px-4 py-2 hover:bg-yellow-400 hover:text-black group/sfa">
                  <Link to="#" className="block" onClick={() => setIsOpen(false)}>
                    SFA
                  </Link>
                  <div className="absolute hidden group-hover/sfa:block left-full top-0 ml-1 bg-blue-400 min-w-[150px] rounded-md shadow-lg z-20 lg:left-auto lg:right-full lg:mr-1 transition-opacity duration-200 opacity-0 group-hover/sfa:opacity-100">
                    <ul className="py-1">
                      <li>
                        <Link
                          to="http://192.168.100.89:29099/ventura_live/"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          DSI
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://192.168.100.89:28181/ventura_lotus_live/"
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          Lotus
                        </Link>
                      </li>
                    </ul>
                  </div>
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
                        <Link to='/qms'
                          className="block px-4 py-2 hover:bg-yellow-200 hover:text-black"
                          onClick={() => setIsOpen(false)}
                          //  onClick={openQmsModal} 
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
                <li className='block px-4 py-2 hover:bg-yellow-400 hover:text-black'>
                  <Link to="#" onClick={() => setIsOpen(false)}>
                    DFS
                  </Link>
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
                  <button
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black w-full text-left"
                    onClick={openEmailModal} // Open email modal on click
                  >
                    E-mail
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black w-full text-left"
                    onClick={openPdfModal}
                  >
                    EXT List
                  </button>
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

      {/* PDF Modal (for Extension List) */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-3/4 h-180 bg-green-50 rounded-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Extension List</h2>
              <button
                onClick={closePdfModal}
                className="text-black hover:text-red-600 focus:outline-none"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              {noPdfMessage || (
                <iframe
                  src={extensionPdfUrl}
                  title="Extension List PDF"
                  className="w-full h-[70vh] border-0"
                />
              )}
            </div>
            <div className="mt-4 flex justify-end">
              {extensionPdfUrl ? (
                <a
                  href={extensionPdfUrl}
                  download="extension_list.pdf"
                  className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                  Download PDF
                </a>
              ) : (
                <button
                  onClick={closePdfModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Email Modal (for Email List) */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-3/4 h-180 bg-green-50 rounded-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Email List</h2>
              <button
                onClick={closeEmailModal}
                className="text-black hover:text-red-600 focus:outline-none"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              {noEmailMessage || (
                <iframe
                  src={emailPdfUrl}
                  title="Email List PDF"
                  className="w-full h-[70vh] border-0"
                />
              )}
            </div>
            <div className="mt-4 flex justify-end">
              {emailPdfUrl ? (
                <a
                  href={emailPdfUrl}
                  download="email_list.pdf"
                  className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                  Download PDF
                </a>
              ) : (
                <button
                  onClick={closeEmailModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

        {/* QMSModal (for QMS List)
        {isQmsModalOpen && (
          <div className="fixed inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-3/4 h-180 bg-green-50 rounded-lg p-6 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">QMS Document List</h2>
                <button
                  onClick={closeQmsModal}
                  className="text-black hover:text-red-600 focus:outline-none"
                >
                  <HiX className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                {noQmsMessage || (
                  <iframe
                    src={QmsPdfUrl}
                    title="Email List PDF"
                    className="w-full h-[70vh] border-0"
                  />
                )}
              </div>
              <div className="mt-4 flex justify-end">
                {QmsPdfUrl ? (
                  <a
                    href={QmsPdfUrl}
                    download="email_list.pdf"
                    className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800"
                  >
                    Download PDF/Doc
                  </a>
                ) : (
                  <button
                    onClick={closeQmsModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )} */}

    </div>
  );
};

export default Navbar;