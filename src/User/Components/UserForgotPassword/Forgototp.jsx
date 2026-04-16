import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Forgototp = () => {
    const location = useLocation();
    const userData = location.state || JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate()
    const [otp,setOTP] = useState("");
    const [loading,setLoading] = useState(false);

    const verfiyOtp = async (e) => {
        e.preventDefault();
        if(loading) return;
        
        if (!otp) {

            Swal.fire({
                text: "Please enter OTP",
                icon : 'warning'
            })
            return;
        }
        setLoading(true);
        try{
            const response = await fetch("https://lynkjobs-1.onrender.com/user/forgotPasswordverifyOTP",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email : userData.email,
                    otp: otp
                })
            });

            const data = await response.json();

            if(response.ok){
              setLoading(false);
                navigate("/user/login/changePassword",{
                    state:{ email : userData.email }
                })
            }else{
              setLoading(false);
               Swal.fire({
                     text: data.message,
                     icon : 'warning'
                })
            }
        }catch(error){
          setLoading(false);
            console.error(error);
        }
    }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white/30 px-4">

      <h1 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        Verify OTP
      </h1>

      <p className="text-sm text-gray-500 mb-6 text-center">
        Enter the 6-digit code sent to your email
      </p>

      <input
        type="text"
        maxLength="6"
        className="w-full max-w-xs h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white/40 mb-6"
        value={otp}
        onChange={(e)=> setOTP(e.target.value)}
      />

      <button 
        className={`w-full max-w-xs bg-slate-400 text-white p-2 rounded hover:bg-slate-500 ${loading ? 'cursor-not-allowed bg-slate-200':'bg-slate-400 hover:bg-slate-500'}`}
        onClick={verfiyOtp}
      >
        {loading ?  (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Verifing...
          </span>
        ):("Verify")}
        
      </button>

    </div>
  )
}

export default Forgototp