import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckPassword = () => {
  const [Password,setPassword] = useState("");
  const navigate = useNavigate();

  const checkPassword = async () => { 
    try {
      const res = await fetch("https://lynkjobs-1.onrender.com/user/checkOldPassword",{
        method : "POST",
        headers:{
          "Content-Type" : "application/json",
          Authorization : "Bearer " + localStorage.getItem("token")
        },
        body : JSON.stringify({
          password : Password
        })
      });

      const data = await res.json();

      if(res.ok){
        navigate("/user/profile/setting/changePassword"); 
      }else{
        Swal.fire({
          title : "Wrong Password",
          icon :'warning'     
        })
      }

    } catch (error) {
      Swal.fire({
        title : "Server Error",
        icon :'error'     
      })
    }
  }

  const sendOTP = async () => {
    try {
      const res = await fetch("https://lynkjobs-1.onrender.com/user/settingOTP",{
        method : "POST",
        headers : {
          
          Authorization : "Bearer " + localStorage.getItem("token")
        } 
      });

      const data = await res.json();

      if(res.ok){
        navigate("/user/profile/setting/forgot");
      } else {
        Swal.fire({
          text: "Failed to send OTP",
          icon : 'warning'
        });
      }

    } catch (error) {
      Swal.fire({
        text: "Server Error",
        icon: "error"
      });
    }
  }

  return (
    <div className='min-h-screen bg-black/30 flex items-center justify-center px-4'>

      <div className='w-full max-w-sm flex flex-col items-center bg-white/30 p-6 md:p-10 rounded-lg gap-6 border'>

        <h1 className='text-xl md:text-2xl font-semibold text-center'>
          Enter Your Old Password
        </h1>

        <input 
          type="password"  
          className='w-full h-10 rounded-lg bg-black/30 px-2 text-center'
          value={Password} 
          onChange={(e)=> setPassword(e.target.value)}
        />

        <button 
          className='w-full bg-slate-500 hover:bg-slate-400 h-9 rounded-lg text-white'
          onClick={checkPassword}
        >
          Submit
        </button>

        <h1 
          className='cursor-pointer text-red-400 hover:text-red-500 underline text-sm'
          onClick={sendOTP}
        >
          forgot Password ?
        </h1>

      </div>
        
    </div>
  )
}

export default CheckPassword