import { AuthContext } from "../UserContext"
import { useContext, useState } from "react"
function ProfilePage(){
    const {user,setUser} = useContext(AuthContext)
    const [profileisOpen,setProfileIsOpen]=useState(true)
    const [profilePic,setProfilePic]=useState(null)

    const handleChangeProfilePIc=(e)=>{
         e.preventDefault();
    }

    return(
        <main>
            <div className="min-h-screen">
<div>
{user?<div><br/>
<div className="flex gap-3 flex-col text-center items-center">
    <span><i onClick={()=>setProfileIsOpen(true)} class="fa-regular fa-camera absolute  text-white cursor-pointer"></i><img className="h-25 border-2 border-blue-400 w-25 rounded-full" src={user.profilePicture} />   </span>
<span><h4>@{user.userName}</h4>
<h4 className="text-semibold text-xl"><strong>Full Name:</strong> {user.fullName}</h4>
</span>
<span><h4>{user.email}</h4></span>
</div>
</div>:
<div className="h-full w-full flex justify-center items-center">
    <h5 className="text-3xl font-bold">Loading...</h5>
</div>
 }
</div>
  </div>
{
    profileisOpen&&(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
<div className="relative bg-gray-800 shadow rounded-md p-6 m-2">
        <span>
            <h6 className="text-2xl font-bold text-white">Change Profile Picture</h6>
           
        </span><br/>
        <form onSubmit={handleChangeProfilePIc} className='text-white'>
           <span>
            <input type="file" className="hidden" onChange={(e)=>setProfilePic(e.target.files[0])}/>
            <label className="text-2xl text-blue-800 w-full h-full"><i class="fa-regular fa-camera  text-white cursor-pointer"></i></label>
           </span>
            <button  type="submit" className="w-full bg-yellow-400 text-blue-900 py-2 rounded-md hover:bg-yellow-500 transition">Login</button>
        <button onClick={()=>setProfileIsOpen(false)} type='button' className="absolute hover:text-red-600 top-2 right-2 cursor-pointer" ><i className="fa-solid fa-xmark"></i></button>
        </form>

        </div>
        </div>
    )
}
        </main>
    )
}

export default ProfilePage