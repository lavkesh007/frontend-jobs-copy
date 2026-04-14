import React, { useState } from 'react'
import Swal from 'sweetalert2';
const DeleteJob = () => {
  const [jobId, setJobId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = () => {
    if (!jobId) {
      setMessage("Please enter Job ID");
      return;
    }
    
    fetch(`https://lynkjobs-1.onrender.com/admin/deleteJob/${jobId}`, {
      
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken")
      }
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
        return   Swal.fire({
          title:(data.message),
          icon: "error",
        })
        };
       
        return (Swal.fire({
          title:"✅ Job deleted successfully",
          icon: "success",
        }),
        setJobId("")
      );

        
      })
      .catch((error) => 
        console.error(error),
        Swal.fire({
          title : "❌ Failed to delete job",
          icon : "error"
        }))
      
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
   
        <h2 className="text-2xl font-bold text-center text-red-400 mb-4">
          Delete Job
        </h2>

        {/* Input */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter Job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Job
          </button>
        </div>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default DeleteJob;