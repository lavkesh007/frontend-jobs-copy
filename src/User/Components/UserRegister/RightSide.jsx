import React from 'react'
import{useNavigate} from "react-router-dom";
import { useState } from 'react';
import Swal from 'sweetalert2';

const RegisterMiddleContent = () => {
    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [DoB,setDob] = useState("");
    const [Password,setPassword] = useState("");
    const [RePassword,setRePassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async(e) =>{
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try{
            if(Password !== RePassword){
                Swal.fire({
                    title:'Password Mismatch!!',
                    text:'Enter the Similar Password!!!',
                    icon:'warning',
                    timer:2000
                })
                setLoading(false);
                return;
            }else{
                const response = await fetch("https://lynkjobs-1.onrender.com/user/registerEmailOtp",{
                    method : "POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        userName : name,
                        userEmail : email,
                        phoneNo : phone,
                        dob : DoB,
                        password : Password
                    })
                });

                const data = await response.json();

                if(response.ok){
                    Swal.fire({
                        text:'OTP Send on your Email!!!',
                    })

                    navigate("/user/register/otp",{
                        state:{ name, email, phone, DoB, Password }
                    });

                }else{
                    Swal.fire({
                        text: data.message,
                        icon : 'warning'
                    })
                    navigate("/user/login")
                }
            }
        }catch(error){
            alert(error)
            console.error(error);
        }finally {
            setLoading(false); // stop loading always
        }
    }

  return (
    <div className='w-full h-full p-4 flex flex-col items-center justify-center'>

        <h1 className='text-xl md:text-2xl text-slate-500 text-center'>
          Welcome to 
          <span className='text-2xl md:text-3xl text-gray-600 font-serif'> Lynk</span>
          <span className='text-2xl md:text-3xl text-red-400 font-serif'> Job's</span>
        </h1>

        <form onSubmit={handleRegister} className='w-full flex justify-center'>
            <div className='flex flex-col items-center bg-black/10 w-full max-w-sm p-5 rounded-lg mt-4'>

                <div className='w-full'>
                    <h1>Name: </h1>
                    <input
                    type="username"
                    placeholder="Enter Your Full Name"
                    className="w-full p-2 mb-4 border rounded-full text-center"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='w-full'>
                    <h1>Email: </h1>
                    <input
                        type="email"
                        placeholder="Enter Email ID"
                        className="w-full p-2 mb-4 border rounded-full text-center"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='w-full'>
                    <h1>Phone Number: </h1>
                    <input
                        type="number"
                        placeholder="Enter Phone Number"
                        className="w-full p-2 mb-4 border rounded-full text-center"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className='w-full'>
                    <h1>DoB: </h1>
                    <input
                        type="Date"
                        className="w-full p-2 mb-4 border rounded-full text-center text-slate-400"
                        required
                        value={DoB}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>

                <div className='w-full'>
                    <h1>Password: </h1>
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full p-2 mb-4 border rounded-full text-center"
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className='w-full'>
                    <h1>Re-Enter Password: </h1>
                    <input
                        type="password"
                        placeholder="Enter Re-Enter password"
                        className="w-full p-2 mb-4 border rounded-full text-center"
                        required
                        value={RePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 rounded text-white 
                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-500 hover:bg-slate-800'}`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Processing...
                        </span>
                    ) : (
                        "Register"
                    )}
                </button>

                <div className='flex flex-col md:flex-row mt-2 text-center'>
                    Already have account? 
                    <p className='text-red-500 cursor-pointer px-2' onClick={()=> navigate('/user/login')}>
                        login
                    </p>
                </div>

            </div>
        </form>

    </div>
  )
}

export default RegisterMiddleContent