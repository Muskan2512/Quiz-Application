import React from 'react'
import { Link } from 'react-router-dom'


function Dashboard() {

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-r from-blue-500 to-purple-600 p-6'>
      <Link to="/create-test" className=" py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" >Create a Test</Link>
		<Link to="/view-test-admin" className=" py-2 px-6 bg-white hover:bg-gray-100 text-sm text-black font-bold rounded-xl transition duration-200" >View All Tests</Link>
		
    </div>
  )
}

export default Dashboard
