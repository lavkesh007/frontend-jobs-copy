import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import FooterMain from "../Footer/FooterMain";
import Navbar from "../Home/Navbar";
const JobsCard = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    fetch(`https://lynkjobs-1.onrender.com/jobs/jobDetail/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error(err));
  }, [id]);
  if (!job) return <h2>Loading...</h2>;
  const handleApply =async () =>{
    const result =  await Swal.fire({
      title: 'Apply for this job?',
      text: 'Do you want to apply for this role?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Apply',
      cancelButtonText: 'No',
      confirmButtonColor: '#f97316'
    });
    if (result.isConfirmed) {
    try {
      const res = await fetch(`https://lynkjobs-1.onrender.com/user/apply/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if (!res.ok) {
       return ( Swal.fire({
        title: 'Login First ',
        icon: 'warning',
        confirmButtonColor: '#f97316'
      }),
      navigate("/user/login")
      )};
      
      Swal.fire({
        title: '🎉 Applied!',
        text: 'Congratulations 🥳 You Applied the Job',
        icon: 'success',
        confirmButtonColor: '#f97316'
      });
      window.open(job.websiteUrl, "_blank");

    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong.',
        icon: 'error'
      });
    }
  }
  }
  return (
    <div className="flex flex-col items-center gap-10  bg-slate-100">
      <Navbar/>

      <div>
        
      </div>
        <div  className="bg-white/20 w-full max-w-2xl rounded-xl shadow-md p-6">
          <div className="m-0 text-slate-500">
            JobID: {job.jobID}
          </div>
          <div className="flex flex-col items-center mb-4">
            <img
              className="w-16 h-16 rounded-full"
              src={job.logo}
              alt=""
            />
            <h1 className="text-xl font-semibold mt-2">{job.role}</h1>
            <p className="text-gray-500">{job.companyName}</p>
          </div>

          <hr className="my-3 border-gray-300" />

          {/* Details */}
          <div className="space-y-3 text-sm">
            <div className='flex gap-24'>
              <span className="font-medium">Description:</span>
              <span>{job.description}</span>
            </div>

            <div className='flex gap-20'>
              <span className="font-medium">Responsibility:</span>
              <span>{job.responsibility}</span>
            </div>

            <div className='flex gap-32'>
              <span className="font-medium">Skills:</span>
              <span className=" px-2 py-1 rounded">
                {job.skill}
              </span>
            </div>

            <div className='flex gap-24'>
              <span className="font-medium">Work Mode:</span>
              <span>{job.workMode}</span>
            </div>

            <div className='flex gap-28'>
              <span className="font-medium">Location:</span>
              <span>{job.location}</span>
            </div>

            <div className='flex gap-24'>
              <span className="font-medium">Qualification:</span>
              <span>{job.qualification}</span>
            </div>

            <div className='flex gap-32'>
              <span className="font-medium">Passout:</span>
              <span>{job.passoutYear}</span>
            </div>

            <div className='flex gap-24'>
              <span className="font-medium">Experience:</span>
              <span>
                {job.experience === '0'
                  ? "Fresher"
                  : `${job.experience} yrs`}
              </span>
            </div>

            <div className='flex gap-20'>
              <span className="font-medium">Opening Date:</span>
              <span>{job.openDate}</span>
            </div>

            <div className='flex gap-24'>
              <span className="font-medium">Expiry Date:</span>
              <span>{job.expireDate}</span>
            </div>

            <div className='flex gap-32'>
              <span className="font-medium">Gender:</span>
              <span>{job.genderPreference}</span>
            </div>

            <div className='flex gap-36'>
              <span className="font-medium">Bond:</span>
              <span>{job.bond === 0 ? "None" : `${job.bond} Years`}</span>
            </div>

            <div className='flex gap-36'>
              <span className="font-medium">Salary:</span>
              <span>{job.salary}Lpa</span>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center gap-10 mt-5">
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-white" onClick={()=>navigate(-1)}>Back</button>

            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            onClick={handleApply}>
            
              Apply
            </button>
          </div>
        </div>
        <div className="flex flex-col w-screen">
            <FooterMain/>
        </div>
      
    </div>
  );
};

export default JobsCard;