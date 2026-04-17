import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

const LeftSide = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const location = useLocation();
    
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

  return (
    <div className='bg-black/50 h-full backdrop-blur-md border-r text-lg border-white/20 w-full md:w-[250px] p-4 flex flex-col justify-between'>

        {/* 🔥 Top Section */}
        <div className='flex flex-col gap-4'>

            {/* Profile */}
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-3xl text-slate-700 font-serif font-bold'>
                  LyNK <span className='text-orange-500'>Job's</span>
                </h1>

                <img 
                  className='w-24 h-24 rounded-full object-cover border-2 border-white'
                  src={
                    user?.image
                        ? user.image
                      : "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2191.jpg"
                  }
                  alt=""
                />

                <div className='text-center'>
                    <h1 className='text-white font-semibold'>
                      {user?.userName || "User"}
                    </h1>
                    <p className='text-gray-400 text-xs'>
                      ID: {user?.userID}
                    </p>
                </div>
            </div>

            <hr className="border-white/20"/>

            {/* Menu */}
            <div className='flex flex-col gap-2'>

                <div 
                  className='p-3 rounded-lg hover:bg-white/20 cursor-pointer'
                  onClick={()=>navigate("/")} 
                >
                  Home
                </div>

                <div 
                  className={`p-3 rounded-lg cursor-pointer ${location.pathname==="/user/profile" ? "bg-white/20" : ""}`}
                  onClick={()=>navigate("/user/profile")}
                >
                  Profile
                </div>

                <div 
                  className={`p-3 rounded-lg cursor-pointer ${location.pathname==="/user/profile/applied" ? "bg-white/20" : ""}`}
                  onClick={()=>navigate('/user/profile/applied')}
                >
                  Applied Jobs
                </div>

                <div 
                  className={`p-3 rounded-lg cursor-pointer ${location.pathname==="/user/profile/setting" ? "bg-white/20" : ""}`}
                  onClick={()=>navigate('/user/profile/setting')}
                >
                  Settings
                </div>

            </div>
        </div>
        
        {/* 🔥 Bottom */}
        <div>
            <hr className="border-white/20 mb-2"/>

            <div 
              className='p-3 rounded-lg text-red-400 hover:bg-red-500/20 cursor-pointer'
              onClick={()=>{
                localStorage.removeItem("token");
                navigate("/user/login");
              }}
            >
              Logout
            </div>
        </div>
      
    </div>
  )
}

export default LeftSide