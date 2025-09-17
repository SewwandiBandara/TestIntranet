import React from 'react'
import Navbar from '../components/Navbar';
//import car3 from '../assets/car3.jpg';

const IFS = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Background image with overlay */}
      {/* <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
          style={{ backgroundImage: `url(${car3})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div> */}
      
      {/* Content */}
      <div className="relative z-10 flex-grow pb-4 -">
        <Navbar active={"/ifs"} />
        
       <div className="pt-10 px-5 pb-10  ">
        {/* Header */}
        <div className="text-center  pt-5">
          <h1 className="text-4xl font-bold text-blue-950 mb-2 p-8">IFS Reports</h1>
        </div>
        {/* content area */}
        <div className="relative z-10 flex-grow justify-center items-center flex">
          <div className='w-1/2  bg-white bg-opacity-90 rounded-lg shadow-lg hover:shadow-blue-200 p-8 -m-6 backdrop-blur-sm'>
          {/* finance */}
            <div>
              <h2 className='text-2xl text-blue-950 font-medium'>Finance</h2>
                <div className='mt-2 text-black'>
                  <ul className='list-disc pl-5 space-y-2 border-b pb-4'>
                    <li> <a href="#" className="hover:text-amber-500 hover:underline transition-colors">Fixed Assets Report</a></li>
                    <li><a href="#" className='hover:text-amber-500 hover:underline transition-colors'>Weight Reduction Program Report</a></li>
                    <li><a href="#" className='hover:text-amber-500 hover:underline transition-colors'>Weight Reduction Program Report (Three Whell Tyre Tubes)</a></li>
                  </ul>
                </div>
            </div>
            {/* inventory */}
            <div>
              <h2 className='text-2xl text-blue-950 font-medium pt-2'>Inventory</h2>
                <div className='mt-2 text-black'>
                  <ul className='list-disc pl-5 space-y-2 border-b pb-4'>
                    <li> <a href="#" className="hover:text-amber-500 hover:underline transition-colors">Stock Movement Summary Report</a></li>
                  </ul>
                </div>
            </div>
            {/* manufacturing */}
            <div>
              <h2 className='text-2xl text-blue-950 font-medium pt-2'>Manufacturing</h2>
                <div className='mt-2 text-black'>
                  <ul className='list-disc pl-5 space-y-2 border-b pb-4'>
                    <li> <a href="#" className="hover:text-amber-500 hover:underline transition-colors">Production Reporting Per Department</a></li>
                  </ul>
                </div>
            </div>
            {/* purchasing */}
            <div>
              <h2 className='text-2xl text-blue-950 font-medium pt-2'>Purchasing</h2>
                <div className='mt-2 text-black'>
                  <ul className='list-disc pl-5 space-y-2 border-b pb-4'>
                    <li> <a href="#" className="hover:text-amber-500 hover:underline transition-colors">Customer Order and Purchase Order Relationship</a></li>
                  </ul>
                </div>
            </div>
            {/* sales */}
            <div>
              <h2 className='text-2xl text-blue-950 font-medium pt-2'>Sales</h2>
                <p>Export</p>
                <div className='mt-2 text-black'>
                  <ul className='list-disc pl-5 space-y-2 border-b border-gray-300 pb-4'>
                    <li> <a href="#" className="hover:text-amber-500 hover:underline transition-colors">Export Pending Sheet</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Export Pending Sheet (Data Range)</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Export Pending Sheet (Data Onwards)</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Export Pending Sheet ()Data only</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Delivered Customer Orders Report</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Delivered Customer Order Summary</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Performance Invoice</a></li>
                  </ul>
                </div>
                <p>Local</p>
                <div className='mt-2 text-black'>
                  <ul className='list-disc pl-5 space-y-2 border-b pb-4'>
                    <li> <a href="#" className="hover:text-amber-500 hover:underline transition-colors">Local Pending Sheet</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Purchase Forecast Demand Report</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Purchase Forecast Demand Summary Report</a></li>
                  </ul>
                </div>
           {/* stores */}
            <div>
              <h2 className='text-2xl text-blue-950 font-medium pt-2'>Stores</h2>
                <div className='mt-2 text-black'>
                  <ul className='list-disc pl-5 space-y-2 border-b pb-4'>
                    <li> <a href="#" className="hover:text-amber-500 hover:underline transition-colors">Print Arrival Report</a></li>
                  </ul>
                </div>
            </div>
            {/* top management reports */}
            <div>
              <h2 className='text-2xl text-blue-950 font-medium pt-2'>Stores</h2>
                <div className='mt-2 text-black'>
                  <ul className='list-disc pl-5 space-y-2 border-b pb-4'>
                    <li> <a href="#" className="hover:text-amber-500 hover:underline transition-colors">Vehicle-wise Maintenance Cost Report</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Vehicle-wise Maintenance Cost Summary Report</a></li>
                    <li><a href="#" className="hover:text-amber-500 hover:underline transition-colors">Item-wise Sales Contribution for Given Period</a></li>
                  </ul>
                </div>
            </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className='bg-blue-950 text-white py-4 text-center relative z-10'>
        <p className='text-sm'>
          All rights reserved © DSI Samson Rubber Industries - Information Technology Department {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
export default IFS;
