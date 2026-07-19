import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../UserContext.jsx";

function HeaderSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);


  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerUserName, setRegisterUserName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerfullName, setRegisterFullName] = useState('');
  const [resgisterPhoneNumber, setRegisterPhoneNumber] = useState('');
  const [registerProfilePicture, setRegisterProfilePicture] = useState(null);
  const [registerExperience, setRegisterExperience] = useState('');
  const [registerSkills, setRegisterSkills] = useState('');
  const [registerCourse, setRegisterCourse] = useState('');

  const {user,setUser} = useContext(AuthContext);
  const [userNameOrEmail ,setUserNameOrEmail] = useState('');
  const [passwordLogin ,setPasswordLogin] = useState('');
  const [loading, setLoading] = useState(false);
 const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!userNameOrEmail || !passwordLogin) {
        alert("Please fill in all fields");
        return;
    }
    setLoading(true);
    let email = "";
    let userName = "";

    if (userNameOrEmail.includes("@")) {
        email = userNameOrEmail;
    } else {
        userName = userNameOrEmail;
    }

    try {
        const response = await fetch("http://localhost:8000/user/login", {
            method: "POST",
              credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                userName,
                password: passwordLogin
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login Successful");
            console.log(data);
            await getUserData()
            setUserNameOrEmail('');
        setPasswordLogin('');
            setLoginOpen(false);
           
            
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("User not found ");
        
    }
    finally {
      setLoading(false);
      console.log("Login request completed",user);
    }
};

const handleRegisterSubmit = async (e) => {
  e.preventDefault();

  if (!registerUserName || !registerEmail || !registerPassword || !registerfullName || !resgisterPhoneNumber || !registerExperience || !registerSkills || !registerCourse) {
      alert("Please fill in all fields");
      return;
  }

  const formData = new FormData();
  formData.append("userName", registerUserName);
  formData.append("email", registerEmail);
  formData.append("password", registerPassword);
  formData.append("fullName", registerfullName);
  formData.append("phoneNumber", resgisterPhoneNumber);
  formData.append("experience", registerExperience);
  formData.append("skills", registerSkills);
  formData.append("course", registerCourse);

  if (registerProfilePicture) {
      formData.append("profilePicture", registerProfilePicture);
  }
  else{
    alert("Please select a profile picture");
  }
setLoading(true);
  try {
      const response = await fetch("http://localhost:8000/user/register", {
          method: "POST",
          body: formData
      });

      const data = await response.json();

      if (response.ok) {
          alert("Registration Successful! Login to your account");
          console.log(data);
          setRegisterUserName('');
          setRegisterEmail('');
          setRegisterPassword('');
          setRegisterFullName('');
          setRegisterPhoneNumber('');
          setRegisterExperience('');
          setRegisterSkills('');
          setRegisterCourse('');
          setRegisterProfilePicture(null);
          setRegisterOpen(false);
      }
}
catch (error) {
      console.error(error);
      alert("Registration failed , Set Clock time to automatic and try again");
  }
  finally {
    setLoading(false);
    console.log("Register request completed",user);
  }
}

const getUserData = async () => {
  setLoading(true);
  try{
    const response = await fetch('http://localhost:8000/user/current-user',{
      method:'GET',
      credentials:'include'
    })
    const data = await response.json();
    setUser(data.data)
    } 
  catch(error){
    console.error(error);
  }
  finally{
    setLoading(false);
 console.log("Get user data request completed",user);

}
}

useEffect(()=>{
  getUserData();
},[])

  const navClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 border-b border-yellow-400"
      : "text-white hover:text-yellow-300 transition";

  return (
    <header className="bg-linear-to-r  from-[#081529] via-[#0b1e3f] to-[#081529] shadow-xl sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="flex justify-center items-center h-12 w-12 rounded-full bg-white overflow-hidden">
              <img
                src="favicon.png"
                alt="Logo"
                className="h-10 w-10 object-contain"
              />
            </span>

            <h1 className="text-white font-bold text-lg sm:text-xl md:text-2xl">
              Hadian Creative Hub
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 text-lg">
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>

              <NavLink to="/Projects" className={navClass}>
                Projects
              </NavLink>

              <NavLink to="/About" className={navClass}>
                About Us
              </NavLink>

              <NavLink to="/Contact" className={navClass}>
                Contact
              </NavLink>
            </div>

          {
  user ? (
    <div className="flex items-center cursor-pointer gap-3">
      <img
        src={user.profilePicture}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />

      <span className="text-white font-semibold">
        {user.userName}
      </span>
    </div>
  ) : (
    <div className="flex gap-3">
      <button
        onClick={() => setLoginOpen(true)}
        className="border cursor-pointer hover:bg-white/20 border-white px-5 py-2 rounded-lg text-white"
      >
        Login
      </button>

      <button
        onClick={() => setRegisterOpen(true)}
        className="bg-yellow-400 cursor-pointer hover:bg-yellow-400/90 text-blue-900 px-5 py-2 rounded-lg"
      >
        Register
      </button>
    </div>
  )
}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 mt-5" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 text-white text-lg bg-gray-800 rounded-xl p-5">
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/"
              className={navClass}
            >
              Home
            </NavLink>

            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/Projects"
              className={navClass}
            >
              Projects
            </NavLink>

            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/About"
              className={navClass}
            >
              About Us
            </NavLink>

            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/Contact"
              className={navClass}
            >
              Contact
            </NavLink>

           {
  user ? (
    <div className="flex cursor-pointer items-center gap-3">
      <img
        src={user.profilePicture}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />

      <span className="text-white font-semibold">
        {user.userName}
      </span>
    </div>
  ) : (
    <div className="flex gap-3">
      <button
        onClick={() => setLoginOpen(true)}
        className="border border-white px-5 py-2 rounded-lg text-white"
      >
        Login
      </button>

      <button
        onClick={() => setRegisterOpen(true)}
        className="bg-yellow-400 text-blue-900 px-5 py-2 rounded-lg"
      >
        Register
      </button>
    </div>
  )
}
          </div>
        </div>
      </nav>
   {loginOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
<div className="relative bg-gray-800 shadow rounded-md p-6 m-2">
        <span>
            <h6 className="text-2xl font-bold text-white">Login into account</h6>
            <p className="text-yellow-300">Welcome Back!</p>
        </span><br/>
        <form onSubmit={handleLoginSubmit} className='text-white'>
            <input value={userNameOrEmail} onChange={(e)=>setUserNameOrEmail(e.target.value)} type="text" placeholder="Username or Email" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={passwordLogin} onChange={(e)=>setPasswordLogin(e.target.value)} type="password" placeholder="Password" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button  type="submit" className="w-full bg-yellow-400 text-blue-900 py-2 rounded-md hover:bg-yellow-500 transition">Login</button>
        <button onClick={()=>setLoginOpen(false)} type='button' className="absolute hover:text-red-600 top-2 right-2 cursor-pointer" ><i className="fa-solid fa-xmark"></i></button>
        </form>

        </div>
        </div>
    )
   }

   {registerOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
<div className="relative bg-gray-800 shadow rounded-md p-6 m-2">
        <span>
            <h6 className="text-2xl font-bold text-white">Register your account</h6>
            <p className="text-yellow-300">Welcome ! to Hadian Creative Hub</p>
        </span><br/>
        <form onSubmit={handleRegisterSubmit} className='text-white'>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2  md:gap-3">
            <input value={registerUserName} onChange={(e)=>setRegisterUserName(e.target.value)} type="text" placeholder="Username" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={registerEmail} onChange={(e)=>setRegisterEmail(e.target.value)} type="email" placeholder="Email" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={registerfullName} onChange={(e)=>setRegisterFullName(e.target.value)} type="text" placeholder="Full Name" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={resgisterPhoneNumber} onChange={(e)=>setRegisterPhoneNumber(e.target.value)} type="number" placeholder="Phone Number" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={registerExperience} onChange={(e)=>setRegisterExperience(e.target.value)} type="number" placeholder="Experience  (e.g: 2)" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={registerSkills} onChange={(e)=>setRegisterSkills(e.target.value)} type="text" placeholder="Skills" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={registerCourse} onChange={(e)=>setRegisterCourse(e.target.value)} type="text" placeholder="Course" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
           <input
  id="profilePic"
  type="file"
  accept="image/*"
  onChange={(e) => setRegisterProfilePicture(e.target.files[0])}
  className="hidden"
/>

<label
  htmlFor="profilePic"
 className="w-full cursor-pointer p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {registerProfilePicture
    ? registerProfilePicture.name
    : "Profile Picture"}
</label>
          </div>
<button type="submit" className="bg-yellow-400 w-full cursor-pointer hover:bg-amber-400/80 p-2 rounded-md">Register</button>

        <button onClick={()=>setRegisterOpen(false)} type='button' className="absolute hover:text-red-600 top-2 right-2 cursor-pointer" ><i className="fa-solid fa-xmark"></i></button>
        </form>

        </div>
        </div>
    )
   }

   {
    loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="loader"><i className="fa-solid fa-circle-notch text-white animate-spin text-xl"></i></div>
        </div>
    )
   }
    </header>
  );
}

export default HeaderSection;