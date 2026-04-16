import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const forgot = () => {
  const navigate = useNavigate();
  const [email , setEmail] = useState("");
  const [loading , setLoading] = useState(false);

  const genrateOTP = async(e)=>{
      e.preventDefault();
      if(loading) return;
      setLoading(true);
      try{
        const response = await fetch("https://lynkjobs-1.onrender.com/user/forgotPasswordOTP", {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            userEmail : email
          })
        });

        const data = await response.json();

        if(response.ok){
          setLoading(false);
          navigate("/user/login/forgototp",{ state:{ email } })
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

        <h1 className='mb-4 text-lg md:text-xl font-semibold text-slate-500'>
          Welcome Back To{" "}
          <span className='text-slate-700 text-xl md:text-2xl font-serif font-semibold'>
            LnYK 
            <span className='text-orange-500'> Job's</span>
          </span>
        </h1>
      </div>

      <h1 className='font-semibold text-red-400 text-lg mb-2'>
        Forgot Password
      </h1>

      <form className='flex flex-col items-center w-full' onSubmit={genrateOTP}>
        
        <p className='text-slate-500 mb-2 text-center'>
          Enter Your Registered Email
        </p>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full max-w-xs p-2 mb-3 border rounded-full text-center bg-white/40"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button type='submit' disabled={loading} className={`w-full max-w-xs bg-slate-400 text-white p-2 rounded hover:bg-slate-500 ${loading ? 'bg-slate-300 cursor-not-allowed':'hover:bg-slate-500'}`}>
          {loading ?  (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </span>
          ):("Send OTP")}
          
        </button>
      </form>

      <p className='mt-4 text-center'>
        <span className='text-slate-500'>Back to </span>
        <span 
          className='text-red-500 cursor-pointer hover:text-red-800'
          onClick={()=> navigate("/user/login")}
        >
          Login
        </span>
      </p>

    </div>
  )
}

export default forgot