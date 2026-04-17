import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Otp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state || JSON.parse(localStorage.getItem("userData"));
    const [otp , setOTP] = useState("");
    const [loading , setLoading] = useState(false);

    const verfiyOtp = async () => {
      if(loading) return;
        try{
          if (!otp) {
            alert("Enter OTP");
            return;
          }
          setLoading(true);
            const response = await fetch("http://15.134.142.177:8080/user/register" , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    userName : userData.name,
                    userEmail : userData.email,
                    phoneNo : userData.phone,
                    dob: userData.DoB,
                    password : userData.Password,
                    otp: otp
                })
            });

            const data = await response.json();

            if(response.ok){
              setLoading(false);
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'Your account has been created.',
                    icon: 'success',
                    confirmButtonColor : '#f97316'
                });

                navigate("/user/login")
            }else{
              setLoading(false);
                Swal.fire({
                    title: data.message,
                    icon: 'error',
                    confirmButtonColor : '#f97316'
                });
            }
        }catch(error){
          setLoading(false);
            console.error(error);
        }
    }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">

      <h1 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        Verify OTP
      </h1>

      <p className="text-sm text-gray-500 mb-6 text-center">
        Enter the 6-digit code sent to your email
      </p>

      <input
        type="text"
        maxLength="6"
        className="w-full max-w-xs h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 mb-6"
        value={otp}
        onChange={(e)=> setOTP(e.target.value)}
      />

      <button 
        className={`w-full max-w-xs bg-slate-500 text-white p-2 rounded hover:bg-slate-800 ${loading ? 'cursor-not-allowed bg-slate-300' :'bg-slate-500 hover:bg-slate-800'}`}
        onClick={verfiyOtp}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Verifing...
          </span>
        ):("Verify")}
      </button>

    </div>
  )
}

export default Otp