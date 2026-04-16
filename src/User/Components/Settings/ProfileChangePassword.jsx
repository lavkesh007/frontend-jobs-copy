import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ChangePassword = () => {
  const [Password,setPassword] = useState("");
  const [RePassword,setRePassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();
    if(loading) return;
    if(Password !== RePassword){
      Swal.fire({ text: "Paswsword Not Match", icon : 'warning' })
      return;
    }
    setLoading(true);
    try{
      const response = await fetch("https://lynkjobs-1.onrender.com/user/settingPassword" ,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          Authorization : "Bearer " + localStorage.getItem("token")
        },
        body : JSON.stringify({ password : Password })
      });

      const data = await response.json();

      if(response.ok){
        setLoading(false);
        Swal.fire({ text: data.message, icon :'success' })
        navigate("/user/profile/setting")
      }else{
        setLoading(false);
        Swal.fire({ text: data.message, icon : 'warning' })
      }

    }catch(error){
      setLoading(false);
      console.error(error)
    }
  }

  return (
    <div className='w-full min-h-screen bg-black/30 flex items-center justify-center px-4'>

      <div className='w-full max-w-sm p-6 bg-white/30 rounded-lg border'>

        <h1 className='text-xl md:text-2xl font-bold text-center'>
          Change Password
        </h1>

        <form className='flex flex-col items-center mt-4' onSubmit={changePassword}>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 mb-3 border rounded-full text-center"
            required
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Re-enter Password"
            className="w-full p-2 mb-3 border rounded-full text-center"
            required
            value={RePassword}
            onChange={(e)=>setRePassword(e.target.value)}
          />

          <button className={`w-full bg-slate-400 text-white p-2 rounded ${loading ? 'cursor-not-allowed bg-slate-200':'bg-slate-400 hover:bg-slate-500'}`}>
            {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Updating...
                        </span>
                    ) : (
                        "Change"
                    )}
          </button>

        </form>

      </div>
    </div>
  )
}

export default ChangePassword