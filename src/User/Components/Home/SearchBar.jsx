import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'


  const SearchBar = () => {
    const navigate = useNavigate();

    const [role, setRole] = useState("");
    
    const [location, setLocation] = useState("");
    const handleSearch = ()=>{
      navigate(`/user/alljobs?role=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}`)
    }
  

  return (
    <div className='flex flex-col items-center justify-center w-full text-center px-4 py-16'>

      <h1 className='text-3xl md:text-5xl font-bold text-slate-500'>
        Find Your <span className='text-orange-500'>Dream Job</span>
      </h1>

     
      <p className='text-slate-500 mt-3 max-w-xl'>
        Explore thousands of opportunities and connect with top companies instantly.
      </p>

      <div className="flex flex-col md:flex-row gap-3 mt-6 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg">

        <input
          type="text"
          placeholder="🔍 Job title or keyword"
          className="p-3 w-64 rounded-lg outline-none bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-400"
          value={role}
          onChange={(e)=>{setRole(e.target.value)}}
        />

        <input
          type="text"
          placeholder="📍 Location"
          className="p-3 w-48 rounded-lg outline-none bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-400"
          value={location}
          onChange={(e)=>{setLocation(e.target.value)}}
        />

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition" onClick={handleSearch}>
          Search
        </button>

      </div>

    </div>
  )
}

export default SearchBar