import React, { useState, useEffect } from 'react'

const AppliedJobs = () => {
  const [job, setJob] = useState([]);

  useEffect(() => {
    fetch("http://15.134.142.177:8080/user/allAppliedJobs", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen p-4">

      {job.length === 0 ? (
        <h2 className="text-center text-xl md:text-3xl text-gray-500 mt-10">
          No Applied Jobs Found 🚫
        </h2>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {job.map((data, index) => (
            <div key={index} className="bg-white/70 rounded-xl shadow-md p-4 flex flex-col justify-between">

              <div>
                <div className="text-xs text-gray-400">JobID: {data.jobID}</div>

                <div className="flex flex-col items-center mt-2 mb-4">
                  <img className="w-12 h-12 rounded-full" src={data.logo} alt="" />
                  <h1 className="text-sm font-semibold mt-2 text-center">{data.role}</h1>
                  <p className="text-xs text-gray-500">{data.companyName}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Skills:</span><span>{data.skill}</span></div>
                  <div className="flex justify-between"><span>Location:</span><span>{data.location}</span></div>
                  <div className="flex justify-between"><span>Experience:</span><span>{data.experience == 0 ? "Fresher" : `${data.experience} yrs`}</span></div>
                </div>
              </div>

              <button className="mt-4 bg-green-500 text-white py-2 rounded">
                Applied
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AppliedJobs