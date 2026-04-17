import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const ShowProfile = () => {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://15.134.142.177:8080/user/userDetails",{
            headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res=>{
            if(!res.ok) throw new Error();
            return res.json();
        })
        .then(data=>setUser(data))
        .catch(()=>setUser(null));
    },[]);

    if (!user) return <h2 className="text-slate-400  mt-10 w-full h-screen flex items-center content-center flex-col text-2xl bg-black/30 py-28 rounded-lg">No Profile</h2>;

return (
  <div className='h-screen flex items-center justify-center'>
    
    {/* 🔥 Card */}
    <div className='bg-white/70 backdrop-blur-md border border-black/20 w-[420px] rounded-xl p-6 shadow-lg'>
      
      <div className='flex flex-col gap-5'>

        {/* 🔥 Profile Image */}
        <div className='flex justify-center'>
          <img 
            className='w-28 h-28 rounded-full object-cover border-2 border-slate-400'
            src={
              user?.image
                ? user.image
                : "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2191.jpg?semt=ais_incoming&w=740&q=80"
            }
            alt=""
          />
        </div>

        <hr className=' border-slate-400' />

        {/* 🔥 Data Rows */}
        <div className="flex flex-col gap-4">

        {/* Row */}
        <div className="grid grid-cols-2 items-center">
            <span className="text-slate-700">User ID :</span>
            <span className="text-slate-900 text-right">{user?.userID}</span>
        </div>

        <div className="grid grid-cols-2 items-center">
            <span className="text-slate-700">User Name :</span>
            <span className="text-slate-900 text-right">{user?.userName}</span>
        </div>

        <div className="grid grid-cols-2 items-center">
            <span className="text-slate-700">Email :</span>
            <span className="text-slate-900 text-right break-words">
            {user?.userEmail}
            </span>
        </div>

        <div className="grid grid-cols-2 items-center">
            <span className="text-slate-700">Phone :</span>
            <span className="text-slate-900 text-right">{user?.PhoneNo}</span>
        </div>

        <div className="grid grid-cols-2 items-center">
            <span className="text-slate-700">DOB :</span>
            <span className="text-slate-900 text-right">{user?.DOB}</span>
        </div>

        <div className="grid grid-cols-2 items-center">
            <span className="text-slate-700">Gender :</span>
            <span className="text-slate-900 text-right">
            {user?.gender ? user.gender : "None"}
            </span>
        </div>

        <div className="grid grid-cols-2 items-center">
            <span className="text-slate-700">Qualification :</span>
            <span className="text-slate-900 text-right">
            {user?.highQualification}
            </span>
        </div>

        <div className="grid grid-cols-2 items-center">
            <span className="text-slate-700">College :</span>
            <span className="text-slate-900 text-right">
            {user?.collegeName}
            </span>
        </div>

        <div className="grid grid-cols-2 items-center">
            <span className="text-slate-700">Passout :</span>
            <span className="text-slate-900 text-right">
            {user?.passoutYear}
            </span>
        </div>
        <div className='flex justify-center'>
          <button className='bg-slate-500 px-6 py-2 rounded-lg hover:bg-slate-600 hover:scale-105 transition' onClick={()=>{
            navigate("/user/profile/edit")
          }}>
            Edit
          </button>
        </div>

        </div>

      </div>
    </div>
  </div>
);
}

export default ShowProfile;