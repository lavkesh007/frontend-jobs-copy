import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProfile = () => {
    const navigate = useNavigate();
  // 🔹 Edit state
    const [isEdit , setIsEdit] = useState({
        name: false,
        email: false,
        phone: false,
        dob: false,
        passout: false,
        gender: false,
        qualification: false,
        college: false
    });

    // 🔹 User data
    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(false);

    // 🔹 Fetch data
    useEffect(()=>{
        fetch("http://15.134.142.177:8080/user/userDetails",{
        headers : {
            Authorization : "Bearer " + localStorage.getItem("token")
        }
        })
        .then(res => {
        if(!res.ok) throw new Error();
        return res.json();
        })
        .then(data=>setUser(data))
        .catch(()=>setUser({}));
    },[]);

    // 🔹 Toggle edit
    const handleToggle = (field)=>{
        setIsEdit({...isEdit,[field] : !isEdit[field]})
    }

    // 🔹 Handle input change
    const handleChange = (field, value) => {
        setUser({
        ...user,
        [field]: value
        });
    }
    
    const [file,setFile] = useState();
    const onSubmit = () => {
        const formdata = new FormData();
        formdata.append("user",JSON.stringify(user));
        if(file){
            formdata.append("image",file);
        }
        if(loading) return;
    setLoading(true);
    fetch("http://15.134.142.177:8080/user/editUser",{
        method:"POST",
        headers :{
        Authorization : "Bearer " + localStorage.getItem("token")
        },
        body : formdata
    })
    .then(res => {
        if(res.status === 401){
         return (  localStorage.removeItem("token"),
            navigate("/login")),
            setLoading(false);
        }
        if(res.ok){
            setLoading(false);
        Swal.fire({
            title : "Profile Updated!",
            icon:"success"
        })
        setIsEdit({
            name: false,
            email: false,
            phone: false,
            dob: false,
            passout: false,
            gender: false,
            qualification: false,
            college: false
        });
       
        navigate("/user/profile")
        } else {
            setLoading(false);
        Swal.fire({
            title : "Update Failed ❌",
            icon : "error"
        })
        }
        
    })
    }

  return ( 
    <div className='w-full flex justify-center min-h-screen items-center'>
      
      <div className='p-6 w-[550px] bg-white border rounded-xl'>

        {/* Profile */}
        <div className='flex items-center gap-5 justify-center mb-4'>
            <img 
              className='w-28 h-28 rounded-full border-spacing-1 border-slate-800' 
              src={user.image? user.image : "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg" }
              alt="" 
            />
            <div>
                <input type='file' className='text-sm' onChange={(e)=> setFile(e.target.files[0])}/>
                <p className='text-xs text-red-400'>*jpg,*png,*jpeg</p>
            </div>
        </div>

        <hr className='border-gray-400 mb-4'/>

        {/* User ID */}
        <div className='flex gap-28 mb-4'>
            <h1>User ID :</h1>
            <h1 className='font-semibold'>{user?.userID}</h1>
        </div>

        {/* Name */}
        <div className='grid grid-cols-3 items-center gap-4 mb-3'>
            <h1>User Name :</h1>
            <input
              type="text"
              value={user?.userName || ""}
              disabled={!isEdit.name}
              onChange={(e)=>handleChange("userName", e.target.value)}
              className='w-full h-9 p-2 rounded-lg border'
            />
            <button onClick={()=>handleToggle("name")} className='w-20 h-9 bg-slate-600 text-white rounded-xl'>
                {isEdit.name ? "Save" : "Edit"}
            </button>
        </div>

        {/* Email */}
        <div className='grid grid-cols-3 items-center gap-4 mb-3'>
            <h1>Email :</h1>
            <input
              type="text"
              value={user?.userEmail || ""}
              disabled={!isEdit.email}
              onChange={(e)=>handleChange("userEmail", e.target.value)}
              className='w-full h-9 p-2 rounded-lg border'
            />
            <button onClick={()=>handleToggle("email")} className='w-20 h-9 bg-slate-600 text-white rounded-xl'>
                {isEdit.email ? "Save" : "Edit"}
            </button>
        </div>

        {/* Phone */}
        <div className='grid grid-cols-3 items-center gap-4 mb-3'>
            <h1>PhoneNo :</h1>
            <input
              type="text"
              value={user?.PhoneNo || ""}
              disabled={!isEdit.phone}
              onChange={(e)=>handleChange("PhoneNo", e.target.value)}
              className='w-full h-9 p-2 rounded-lg border'
            />
            <button onClick={()=>handleToggle("phone")} className='w-20 h-9 bg-slate-600 text-white rounded-xl'>
                {isEdit.phone ? "Save" : "Edit"}
            </button>
        </div>

        {/* DOB */}
        <div className='grid grid-cols-3 items-center gap-4 mb-3'>
            <h1>DOB :</h1>
            <input
              type="text"
              value={user?.DOB || ""}
              disabled={!isEdit.dob}
              onChange={(e)=>handleChange("DOB", e.target.value)}
              className='w-full h-9 p-2 rounded-lg border'
            />
            <button onClick={()=>handleToggle("dob")} className='w-20 h-9 bg-slate-600 text-white rounded-xl'>
                {isEdit.dob ? "Save" : "Edit"}
            </button>
        </div>

        {/* Passout */}
        <div className='grid grid-cols-3 items-center gap-4 mb-3'>
            <h1>Passout Year :</h1>
            <input
              type="text"
              value={user?.passoutYear || ""}
              disabled={!isEdit.passout}
              onChange={(e)=>handleChange("passoutYear", e.target.value)}
              className='w-full h-9 p-2 rounded-lg border'
            />
            <button onClick={()=>handleToggle("passout")} className='w-20 h-9 bg-slate-600 text-white rounded-xl'>
                {isEdit.passout ? "Save" : "Edit"}
            </button>
        </div>

        {/* Gender */}
        <div className='grid grid-cols-3 items-center gap-4 mb-3'>
            <h1>Gender :</h1>
            <input
              type="text"
              value={user?.gender || ""}
              disabled={!isEdit.gender}
              onChange={(e)=>handleChange("gender", e.target.value)}
              className='w-full h-9 p-2 rounded-lg border'
            />
            <button onClick={()=>handleToggle("gender")} className='w-20 h-9 bg-slate-600 text-white rounded-xl'>
                {isEdit.gender ? "Save" : "Edit"}
            </button>
        </div>

        {/* Qualification */}
        <div className='grid grid-cols-3 items-center gap-4 mb-3'>
            <h1>Qualification :</h1>
            <input
              type="text"
              value={user?.highQualification || ""}
              disabled={!isEdit.qualification}
              onChange={(e)=>handleChange("highQualification", e.target.value)}
              className='w-full h-9 p-2 rounded-lg border'
            />
            <button onClick={()=>handleToggle("qualification")} className='w-20 h-9 bg-slate-600 text-white rounded-xl'>
                {isEdit.qualification ? "Save" : "Edit"}
            </button>
        </div>

        {/* College */}
        <div className='grid grid-cols-3 items-center gap-4 mb-3'>
            <h1>College Name :</h1>
            <input
              type="text"
              value={user?.collegeName || ""}
              disabled={!isEdit.college}
              onChange={(e)=>handleChange("collegeName", e.target.value)}
              className='w-full h-9 p-2 rounded-lg border'
            />
            <button onClick={()=>handleToggle("college")} className='w-20 h-9 bg-slate-600 text-white rounded-xl'>
                {isEdit.college ? "Save" : "Edit"}
            </button>
        </div>

        {/* Submit */}
        <div className='flex justify-center mt-5'>
            <button className={`w-32 h-10 bg-blue-500 text-white rounded-xl ${loading ? 'bg-blue-300 cursor-not-allowed':'bg-blue-500 hover:bg-blue-600'}`} onClick={onSubmit}>
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Updating...
                    </span>
                ):("Submit")}
            </button>
        </div>

      </div>
    </div>
  )
}

export default EditProfile