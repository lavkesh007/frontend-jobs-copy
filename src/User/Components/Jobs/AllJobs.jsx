import React,{useState,useEffect} from 'react'
import Navbar from "../Home/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import Searchbar from '../Home/SearchBar';
import FooterMain from '../Footer/FooterMain';

const AllJobs = () => {
    const [job, setJob] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const locationHook = useLocation();
    const params = new URLSearchParams(locationHook.search);
    const role = params.get("role")||"";
    const location = params.get("location") || "";
  useEffect(() => {
    const delay = setTimeout(() => {
      
    
    let url = "https://lynkjobs-1.onrender.com/jobs/allJobs";

    if (role || location) {
      url = `https://lynkjobs-1.onrender.com/jobs/search?role=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}`;
     
    }
    fetch(url)
      .then((res) => {res.json()})
      .then((data) => setJob(data))
      .catch((err) => console.error(err));
    },500)
    return () => clearTimeout(delay);
  }, [role,location]);
  
  
  
  return (
    <div>
       <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>
      <Searchbar />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 ">
        {job.length === 0? (
          <p className="text-center text-gray-500 col-span-full">
            No jobs found 😔
          </p>
        ) : (
        job.map((data, index) => (
          <div
            key={index}
            className="bg-white/60 rounded-xl shadow-md p-5 hover:border transition"
          >
            {/* Job ID */}
            <div className="text-xs text-gray-500">
              JobID: {data.jobID}
            </div>

            {/* Header */}
            <div className="flex flex-col items-center mt-2 mb-4">
              <img
                className="w-10 h-10 rounded-full"
                src={data.logo}
                alt=""
              />
              <h1 className="font-semibold text-slate-600 text-sm mt-2 text-center">
                {data.role}
              </h1>
              <p className="text-gray-500 text-xs">
                {data.companyName}
              </p>
            </div>

            <hr className="my-2" />

            {/* Details */}
            <div className="text-sm text-gray-500 space-y-2">

              <div className="flex justify-between">
                <span className="font-medium">Skills:</span>
                <span className="text-right break-words max-w-[60%]">
                  {data.skill}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Location:</span>
                <span>{data.location}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Experience:</span>
                <span>
                  {data.experience === 0
                    ? "Fresher"
                    : `${data.experience} yrs`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Opening:</span>
                <span>{data.openDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Expiry:</span>
                <span>{data.expireDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Salary:</span>
                <span>{data.salary} LPA</span>
              </div>

            </div>

            {/* Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() =>
                  navigate(`/user/jobDetail/${data.jobID}`)
                }
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
        
      </div>
      </div>
      <FooterMain/>
    </div>
  )
}

export default AllJobs
