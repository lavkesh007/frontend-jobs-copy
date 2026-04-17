import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetch("https://lynkjobs-1.onrender.com/user/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("STATUS:", res.status);
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const scrollToAbout = ()=>{
    const section = document.getElementById("about");
    navigate("/?scroll=about");
    if(section){
      section.scrollIntoView({behavior : "smooth"})
    }
  }

  return (
    <div id='home' className="w-full">
      <div className="flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow">

        {/* 🔥 Logo */}
        <div className="flex items-center bg-black/10 rounded-2xl p-2 w-auto md:w-56 text-center flex-col">
          
          <h1 className='text-xl md:text-3xl text-slate-800 font-serif font-bold'>
            Ly <span className='text-orange-600'>Job's</span>
          </h1>
        </div>

        {/* 🔥 Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          <p className="cursor-pointer text-gray-600 text-lg hover:text-orange-500"
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}>
            Home
          </p>

          <p className="cursor-pointer text-gray-600 text-lg hover:text-orange-500" onClick={scrollToAbout}>
            About
          </p>

          <p className="cursor-pointer text-gray-600 text-lg hover:text-orange-500" onClick={()=>{
            navigate('/user/contact');
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 1);
          }}>
            Contact
          </p>

          {/* 🔥 User Section */}
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >

              <div className="cursor-pointer font-semibold text-orange-600 flex items-center gap-2">
                <span className="text-lg">{user.userName}</span>

                <img
                  className="w-8 h-8 rounded-full border"
                  src={
                    user?.image
                      ? user.image
                      : "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2191.jpg"
                  }
                  alt=""
                />
              </div>

              {open && (
                <div className="absolute right-0 w-44 bg-white border rounded-lg shadow-lg overflow-hidden">

                  <p
                    className="p-2 hover:bg-orange-100 cursor-pointer"
                    onClick={() => navigate("/user/profile")}
                  >
                    View Profile
                  </p>

                  <p
                    className="p-2 hover:bg-orange-100 cursor-pointer"
                    onClick={() => navigate("/user/alljobs")}
                  >
                    Jobs
                  </p>

                  <p
                    className="p-2 hover:bg-red-100 text-red-500 cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setUser(null);
                      navigate("/");
                    }}
                  >
                    Logout
                  </p>

                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/user/login")}
            >
              Login
            </button>
          )}

        </div>

        {/* 🔥 Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)} className="text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* 🔥 Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow px-4 py-3 flex flex-col gap-3">

          <p className="cursor-pointer text-gray-600"
            onClick={() => {
              navigate("/");
              setMobileMenu(false);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}>
            Home
          </p>

          <p className="cursor-pointer text-gray-600"
            onClick={() => {
              scrollToAbout();
              setMobileMenu(false);
            }}>
            About
          </p>

          <p className="cursor-pointer text-gray-600"
            onClick={()=>{
              navigate('/user/contact');
              setMobileMenu(false);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 1);
            }}>
            Contact
          </p>

          {user ? (
            <>
              <p onClick={()=>navigate("/user/profile")} className="cursor-pointer">Profile</p>
              <p onClick={()=>navigate("/user/alljobs")} className="cursor-pointer">Jobs</p>
              <p className="text-red-500 cursor-pointer"
                onClick={()=>{
                  localStorage.removeItem("token");
                  setUser(null);
                  navigate("/");
                }}>
                Logout
              </p>
            </>
          ) : (
            <button
              className="bg-orange-500 text-white py-2 rounded"
              onClick={() => navigate("/user/login")}
            >
              Login
            </button>
          )}

        </div>
      )}

    </div>
  );
};

export default Navbar;