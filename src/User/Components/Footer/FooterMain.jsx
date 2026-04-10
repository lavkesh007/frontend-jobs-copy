const FooterMain = () => {
  const scrollToAbout = ()=>{
    const section = document.getElementById("about");
    section.scrollIntoView({behavior : "smooth"})
    
  }
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold text-white">LyNK <span className="text-orange-500">Job's</span></h2>
          <p className="mt-3 text-sm">
            Your trusted platform to find jobs and grow your career.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/user/alljobs" className="hover:text-white">Find Jobs</a></li>
            <li><a href="/companies" className="hover:text-white">Companies</a></li>
            <li className="hover:text-white cursor-pointer" onClick={scrollToAbout}>About Us</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm">Email: lynkjobs09@gmail.com</p>
          <p className="text-sm mt-1">Phone: +91 8767410609</p>
          <p className="text-sm mt-1">Bangalore, India</p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Lynk Job's. All rights reserved.
      </div>

    </footer>
  );
};

export default FooterMain;