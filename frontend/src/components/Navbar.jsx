import React from 'react'
import logoImg from '../assets/logoImg.jpg';
// import dsi_logo from '../assets/dsi_logo.png';
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className='fixed w-full bg-blue-950 py-2 z-50'>
      <div className='container mx-auto flex items-center px-4 text-white '>
        {/* Logo on the left side */}
        <div className='flex items-center pr-10 '>
          <img 
            src={logoImg} 
            alt="Logo" 
            className='h-10 w-25 ml-3 rounded-md' 
          />
        </div>


          {/* Navigation items centered */}
          <div className='flex flex-1 justify-evenly gap-10 font-medium'>
            {/* Home Link */}
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `hover:text-amber-400 cursor-pointer hover:underline ${isActive ? 'text-amber-400 underline' : ''}`
              }
            >
              Home
            </NavLink>
            
            {/* Applications dropdown*/}
            <div className="relative group">
              <div className="text-white cursor-pointer hover:text-amber-400 hover:underline">
                Applications
              </div>
              
              {/* Main dropdown */}
              <div className="absolute hidden group-hover:block bg-blue-950 min-w-[150px] rounded-md shadow-lg z-10 mt-1">
                <ul className="py-1">
                  {/* HR Section */}
                  <li className="relative px-4 py-2 hover:bg-yellow-400 hover:text-black group/hr">
                   <Link to="/humanRe">
                      HR
                    </Link>
                    {/* HR Submenu - only shows when hovering HR specifically */}
                    <div className="absolute hidden group-hover/hr:block left-full top-0 ml-1 bg-blue-400 min-w-[150px] rounded-md shadow-lg z-20">
                      <ul className="py-1">
                        <li>
                          <Link to="/medical" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
                            Medical
                          </Link>
                        </li>
                        <li>
                          <Link to="/appraisal" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
                            Appraisal
                          </Link>
                        </li>
                        <li>
                          <Link to="/kpi" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
                            KPI
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* Production Section */}
                  <li className="relative px-4 py-2 hover:bg-yellow-400 hover:text-black group/production">
                    Production
                    {/* Production Submenu - only shows when hovering Production specifically */}
                    <div className="absolute hidden group-hover/production:block left-full top-0 ml-1 bg-blue-400 min-w-[200px] rounded-md shadow-lg z-20">
                      <ul className="py-1">
                        <li>
                          <Link to="/display" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
                            Display Panel
                          </Link>
                        </li>
                        <li>
                          <Link to="/feed" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
                            Feedback Form
                          </Link>
                        </li>
                        <li>
                          <Link to="/noncnf" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
                            Non-Conformity
                          </Link>
                        </li>
                        <li>
                          <Link to="/production" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
                            Production Display
                          </Link>
                        </li>
                        <li>
                          <Link to="/wms" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
                            WMS
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* Simple links without submenus */}
                  <li className="px-4 py-2 hover:bg-yellow-400 hover:text-black">
                    <Link to="/ifs" className="block">
                      IFS
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-yellow-400 hover:text-black">
                    <Link to="/docware" className="block">
                      Docware
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-yellow-400 hover:text-black">
                    <Link to="/sfa" className="block">
                      SFA
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Policies dropdown */}
            <div className="group relative">
            <div className='hover:text-amber-400 cursor-pointer hover:underline text-white'>
              Policies and Procedures
            </div>
            <div className='absolute hidden group-hover:block bg-blue-950 min-w-[150px] rounded-md shadow-lg z-10 mt-1'>
              <ul className='py-1'>
                <li className='block px-4 py-2 hover:bg-yellow-400 hover:text-black'>
                  <Link to="/sop">
                    SOP
                  </Link>
                </li>
                <li className='block px-4 py-2 hover:bg-yellow-400 hover:text-black group/iso'>
                  <Link to="#" >
                    ISO
                  </Link>
                  {/* ISO sub menu */}
                  <div className="absolute hidden group-hover/iso:block left-full top-10 ml-1 bg-blue-400 min-w-[200px] rounded-md shadow-lg z-20">
                    <ul className="py-1">
                      <li>
                        <Link to="#" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
                          QMS
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="block px-4 py-2 hover:bg-yellow-200 hover:text-black">
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
            <div className="group relative">
             <div className='hover:text-amber-400 cursor-pointer hover:underline text-white'>
                Communication
              </div>
               <div className='absolute hidden group-hover:block bg-blue-950 min-w-[150px] rounded-md shadow-lg z-10 mt-1'>
                <ul className='py-1'>
                  <li>
                    <Link to="/" className='block px-4 py-2 hover:bg-yellow-400 hover:text-black'>
                      E-mail
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className='block px-4 py-2 hover:bg-yellow-400 hover:text-black'>
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
            >
              Achievements
            </NavLink>
          </div>
        {/* Empty div to balance the logo space */}
        <div className='h-10 w-20'></div>
      </div>
    </div>
  )
}

export default Navbar