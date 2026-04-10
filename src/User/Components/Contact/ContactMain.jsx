import React, { useState } from 'react'
import Navbar from '../Home/Navbar'
import FooterMain from '../Footer/FooterMain'
import Swal from 'sweetalert2';
const ContactMain = () => {
  const [msg , setMsg] = useState({
    userName : "",
    userEmail : "",
    userMessage : ""
  });
  const initialMsgState = {
    userName : "",
    userEmail : "",
    userMessage : ""
  }
  const handleChange = (e) =>{
    setMsg({...msg,[e.target.name]: e.target.value})
  };

  const sendMsg = async(e)=>{
    e.preventDefault();
    try{
      console.log(msg.userMessage);
      const response = await fetch("https://lynkjobs-1.onrender.com/user/sendMessage",{
        method : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify(msg)
      });
      const data = await response.json();
      if(response.ok){
        setMsg(initialMsgState)
        Swal.fire({
          title:"Message Send",
          text : "Thank you for Connecting",
          icon : 'success'
        })
        
      }
      else{
        Swal.fire({
          title : (data.message),
          icon :'error'
        })
      }
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div>
         <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 grid md:grid-cols-2 gap-10">
        
        {/* Left - Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-3">
            Have questions or need help? Reach out to us anytime.
          </p>

          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <p>📧 Email: lynkjobs09@gmail.com</p>
            <p>📞 Phone: +91 87674 410609</p>
            <p>📍 Location: Bangalore, India</p>
          </div>

          {/* Optional Image / Illustration */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/3059/3059518.png"
            alt="contact"
            className="mt-8 w-64"
          />
        </div>

        {/* Right - Form */}
        <form onSubmit={sendMsg} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Send Message</h3>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name='userName'
            value={msg.userName}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name='userEmail'
            value={msg.userEmail}
            onChange={handleChange}
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            name='userMessage'
            value={msg.userMessage}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
    <FooterMain/>
    </div>
  )
}

export default ContactMain
