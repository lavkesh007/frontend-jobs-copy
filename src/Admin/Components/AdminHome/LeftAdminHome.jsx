import React, {useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const LeftAdminHome = () => {
    const [admin,setAdmin] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=> {
        fetch("https://lynkjobs-1.onrender.com/admin",{
            headers: {
                Authorization : "Bearer " + localStorage.getItem("adminToken")
            }
        })
        .then(res=>{
            if(!res.ok) throw new Error();
            return res.json();
        })
        .then(data => setAdmin(data))
        .catch(() => setAdmin(null));
    },[]);
  return (
    <div className='bg-black/40 h-full flex flex-col justify-between'>

      <div className='flex flex-col  gap-3 p-3'>
            <div className={`w-full hover:bg-black/20 h-12 rounded-lg text-lg p-2 cursor-pointer ${location.pathname==="/admin/dashboard" ? "bg-black/20" : "hover:bg-black/20"}`} onClick={()=> admin ? navigate("") : navigate('/admin/login')}>Dashboard</div>
            <div className={`w-full hover:bg-black/20 h-12 rounded-lg text-lg p-2 cursor-pointer ${location.pathname==="/admin/dashboard/profile" ? "bg-black/20" : "hover:bg-black/20"}`} onClick={()=> admin ? navigate("/admin/dashboard/profile") : navigate('/admin/login')}>Profile</div>
            <div className={`w-full hover:bg-black/20 h-12 rounded-lg text-lg p-2 cursor-pointer ${location.pathname==="/admin/dashboard/addJob" ? "bg-black/20 " : "hover:bg-black/20"}`} onClick={()=> admin ? navigate('/admin/dashboard/addJob') : navigate('/admin/login')}>Add Jobs</div>
            <div className={`w-full hover:bg-black/20 h-12 rounded-lg text-lg p-2 cursor-pointer ${location.pathname==="/admin/dashboard/deleteJob" ? "bg-black/20 " : "hover:bg-black/20"}`} onClick={()=> admin ? navigate("/admin/dashboard/deleteJob") : navigate('/admin/login')}>Delete Jobs</div>
            <div className={`w-full hover:bg-black/20 h-12 rounded-lg text-lg p-2 cursor-pointer ${location.pathname==="/admin/dashboard/userMessage" ? "bg-black/20" : "hover:bg-black/20"}`} onClick={()=> admin ? navigate("/admin/dashboard/userMessage") : navigate('/admin/login')}>User Message</div>
            <div className={`w-full hover:bg-black/20 h-12 rounded-lg text-lg p-2 cursor-pointer ${location.pathname==="/admin/dashboard/userApplyInfo" ? "bg-black/20" : "hover:bg-black/20"}`} onClick={()=> admin ? navigate("/admin/dashboard/userApplyInfo") : navigate('/admin/login')}>User Applied for Job</div>
            <div className={`w-full hover:bg-black/20 h-12 rounded-lg text-lg p-2 cursor-pointer ${location.pathname==="/admin/dashboard/userInfo" ? "bg-black/20" : "hover:bg-black/20"}`} onClick={()=> admin ? navigate("/admin/dashboard/userInfo") : navigate('/admin/login')}>User Information</div>

            
      </div>
      <div className='gap-3 p-3'>
        <hr className='py-1'/>
          <div className='w-full hover:bg-red-700/30 h-12 rounded-lg text-lg p-2 cursor-pointer' onClick={()=>{
                localStorage.removeItem("adminToken");
                setAdmin(null);
                navigate("/admin/login")
            }}>Logout</div>
      </div>
    
    </div>
  )
}

export default LeftAdminHome
