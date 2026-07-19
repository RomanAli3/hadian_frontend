import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#081a3b] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-4 md:grid-cols-2 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/favicon.png" alt="logo" className="w-14 h-14" />
            <h2 className="text-2xl font-bold">
              Hadian Creative Hub
            </h2>
          </div>

          <p className="text-gray-300 leading-7">
            Empowering students with practical IT skills, creative learning,
            and real-world projects.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-yellow-400">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li><a href="/">Home</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-yellow-400">
            Popular Courses
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>Web Development</li>
            <li>Graphic Design</li>
            <li>Video Editing</li>
            <li>Digital Marketing</li>
            <li>MS Office</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-yellow-400">
            Contact Us
          </h3>

          <div className="space-y-5">

            <div className="flex gap-3">
              <FaPhoneAlt className="text-yellow-400 mt-1" />
              <span className="text-gray-300">
                +92 319 3248440
              </span>
            </div>

            <div className="flex gap-3">
              <FaMapMarkerAlt className="text-yellow-400 mt-1" />
              <span className="text-gray-300">
                Dar ul Huda School,
                <br />
                Kot Momin,
                <br />
                District Sargodha
              </span>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="text-yellow-400 mt-1" />
              <span className="text-gray-300">
                hadiancreative@gmail.com
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Hadian Creative Hub. All Rights Reserved.
          </p>

          <div className="flex gap-4">

            <a target="_blank"
              href="https://web.facebook.com/profile.php?id=61575027133697"
              className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-yellow-400 hover:text-black duration-300"
            >
              <FaFacebookF />
            </a>

            <a
            target="_blank"
              href="https://www.instagram.com/hadianscreativehub_/"
              className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-yellow-400 hover:text-black duration-300"
            >
              <FaInstagram />
            </a>

           

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;