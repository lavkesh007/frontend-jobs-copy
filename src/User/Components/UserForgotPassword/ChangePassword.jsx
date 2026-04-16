import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const ChangePassword = () => {
  const location = useLocation();
  const userData = location.state || JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const [Password,setPassword] = useState("")
  const [RePassword,setRePassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleChangePassword = async (e)=>{
    e.preventDefault();
    if(loading) return;
    if(Password !== RePassword){
      Swal.fire({
        text: "Passwords do not match",
        icon : 'warning'
      })
      return;
    }
    setLoading(true);
    try{
      const response = await fetch("https://lynkjobs-1.onrender.com/user/changePassword" ,{
        method : "PUT" ,
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          email : userData.email,
          password : Password
        })
      });

      const data = await response.json();

      if(response.ok){
        setLoading(false);
        Swal.fire({
          text: data.message,
          icon :'success'
        })
        navigate("/user/login")
      }else{
        setLoading(false);
        Swal.fire({
          text: data.message,
          icon : 'warning'
        })
      }
    }catch(error){
      setLoading(false);
      console.error(error)
    }
  }

  return (
    <div className='h-full w-full flex flex-col justify-center items-center bg-white/30 px-4'>

      <div className='flex flex-col items-center text-center'>
        <img
          className='w-24 md:w-32 h-24 md:h-32 mb-2'
          src="https://png.pngtree.com/png-vector/20240518/ourmid/pngtree-a-boy-sitting-at-desk-with-laptop-on-transparent-background-png-image_12485311.png"
          alt=""
        />

        <h1 className='mb-4 text-lg md:text-xl font-semibold text-slate-400'>
          Welcome Back To{" "}
          <span className='text-slate-500 text-xl md:text-2xl'>
            Loppy Job's
          </span>
        </h1>
      </div>

      <h1 className='font-semibold text-red-400 text-lg mb-3'>
        Change Password
      </h1>

      <form className='flex flex-col items-center w-full' onSubmit={handleChangePassword}>
        
        <p className='text-slate-600'>Enter Password</p>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full max-w-xs p-2 mb-3 border rounded-full text-center bg-white/40"
          required
          value={Password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <p className='text-slate-600'>Re-enter Password</p>
        <input
          type="password"
          placeholder="Re-enter Password"
          className="w-full max-w-xs p-2 mb-4 border rounded-full text-center bg-white/40"
          required
          value={RePassword}
          onChange={(e)=>setRePassword(e.target.value)}
        />

        <button className={`w-full max-w-xs bg-slate-400 text-white p-2 rounded hover:bg-slate-500 ${loading ? 'cursor-not-allowed bg-slate-300':'bg-slate-400 hover:bg-slate-500'}`}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Updating...
            </span>
          ):("Change")}
        </button>
      </form>

    </div>
  )
}

export default ChangePassword