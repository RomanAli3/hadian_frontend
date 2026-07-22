import { AuthContext } from "../UserContext"
import { useContext, useState } from "react"
function ProfilePage(){
    const {user,setUser} = useContext(AuthContext)
    const [profileisOpen,setProfileIsOpen]=useState(false)
    const [profilePic,setProfilePic]=useState(null)
      const [loading, setLoading] = useState(false);
      const [fullNameChangeisOpen,setFullNameChangeopen]=useState(false)
         const [fullName,setFullNameChange]=useState('')


         const [projectTiltle,setProjectTitle]=useState('')
         const [projectSkills,setProjectSkills]=useState('')
         const [projectDescription,setProjectDescription]=useState('')
         const [projectImage,setProjectImage] = useState(null)
         const [projectVideo,setProjectVideo] = useState(null)
    
         const [ProjectCreateOpen,setProjectCreateOpen]=useState(false)
         const HandleProjectCreation=async(e)=>{
          e.preventDefault()
          if(!projectTiltle.trim()||!projectSkills.trim()||!projectDescription.trim()){
            alert("Please enter all fields")
          }

          if(!projectImage&&!projectVideo){
            alert("Project image or video is required")
          }
          setLoading(true)
          const formData= new FormData()

          formData.append("title",projectTiltle)
          formData.append("description",projectDescription)
          formData.append("skills",projectSkills)
          formData.append("image",projectImage)
          formData.append("video",projectVideo)

          try {
            const response= await fetch("http://localhost:8000/project/create-project",{
              method:"POST",
              credentials:"include",
              body:formData
            })
            const data = await response.json()

            if(response.ok){
              setProjectTitle('')
              setProjectSkills("")
              setProjectDescription('')
              setProjectVideo(null)
              setProjectImage(null)
            }
            setProfileIsOpen(false)
            console.log(data)
          } catch (error) {
            alert("Error",error.message)
          }
          finally{
            setLoading(false)
          }

         }

    const handleChangeProfilePIc=async(e)=>{
         e.preventDefault();

         if(!profilePic){
            alert("Please select profile picture")
         }
         setLoading(true)
         const formData =new FormData()
         formData.append("profilePicture", profilePic);
         try {
            setProfileIsOpen(false)
            const response =await fetch("http://localhost:8000/user/change-profilePicture",{
                method:"PATCH",
                credentials:"include",
                body:formData
            })


            const data = await response.json()
            
         } catch (error) {
            alert("Please change time zone and try again",error)
         }finally{
            setProfilePic(null)

            setLoading(false)
            window.location.reload()
         }
    }
    const handleChangeFullName=async(e)=>{
      e.preventDefault()

      if(!fullName.trim()){
        alert("Please enter name")
      }
      setLoading(true)

      try {
        const response= await fetch("http://localhost:8000/user/change-fullName",{
          method:"PATCH",
          credentials:"include",
          headers:{
             "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullName:fullName
          })
        })

        const data = await response.json()

      } catch (error) {
        console.log(error)
        alert("Error while changing name",error)
      }
      finally{
        setLoading(false)
        setFullNameChange('')
        
        setFullNameChangeopen(false)
        window.location.reload()
      }
    }
    return(
        <main>
            <div className="min-h-screen">
<div className="">
{user?<div className="border-b border-slate-400"><br/>
<div className="flex gap-3 flex-col text-center  items-center">
    <span className="relative"><i onClick={()=>setProfileIsOpen(true)} className="fa-regular fa-camera z-40 relative top-23 left-7 border rounded-full  text-white  cursor-pointer"></i><img className="h-25 border-2 border-blue-400 w-25 rounded-full" src={user.profilePicture} />   </span>
<span><h4>@{user.userName}</h4>
<h4 className="text-semibold text-xl"><strong>Full Name:</strong> {user.fullName} <i onClick={()=>setFullNameChangeopen(true)} className="fa-solid fa-pencil text-sm hover:text-slate-700 cursor-pointer"></i></h4>
</span>
<span><h4>{user.email}</h4></span>
</div><br/>
<div className="p-3 text-center text-white shadow bg-slate-800 justify-center flex flex-wrap gap-5"><span className="p-4 border rounded-md shadow-lg"> <strong>Skills : </strong>{user.skills}  

</span> <span className="p-4 border rounded-md shadow-lg"><strong>Experience : </strong>{user.experience} year</span>
<span className="p-4 border rounded-md shadow-lg"><strong>Number : </strong>{user.phoneNumber}</span>
<span className="p-4 border rounded-md shadow-lg"><strong>Course : </strong>{user.course}</span>

</div>
</div>:
<div className="h-full w-full flex justify-center items-center">
    <h5 className="text-3xl font-bold">Loading...</h5>
</div>
 }
</div>
<br/>
<div className="border rounded-md m-2 min-h-[70vh] border-slate-300"><br/>

<div className=" flex justify-between m-5 items-center ">
<span>
<h4 className="text-2xl font-bold text-center">My Projects</h4>

  </span>
 <button onClick={()=>setProjectCreateOpen(true)} className=" text-center text-slate-800 cursor-pointer hover:text-slate-700 flex border rounded-lg p-2"><i class="fa-solid fa-circle-plus text-2xl"></i>
<p>Create Project</p>
</button>
</div>

  </div>
  </div>
{
  profileisOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-96 bg-gray-800 rounded-lg shadow-xl p-6">

        <button
          onClick={() => setProfileIsOpen(false)}
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <h2 className="text-2xl font-bold text-white text-center">
          Change Profile Picture
        </h2>

        <form onSubmit={handleChangeProfilePIc} className="mt-6">

          <input
            id="profile"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />

          <label
            htmlFor="profile"
            className="w-24 h-24 mx-auto flex items-center justify-center rounded-full border-2 border-dashed border-white cursor-pointer hover:border-yellow-400 transition"
          >
            <i className="fa-solid fa-camera text-3xl text-white"></i>
          </label>

          <p className="text-center text-gray-300 text-sm mt-3">
            {profilePic ? profilePic.name : "Choose an image"}
          </p>

          <button
            type="submit"
            className="w-full mt-5 bg-yellow-400 text-blue-900 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
          >
            Update Picture
          </button>

        </form>
      </div>
    </div>
  )
}  

   {ProjectCreateOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
<div className="relative bg-gray-800 shadow rounded-md p-6 m-2">
        <span>
            <h6 className="text-2xl font-bold text-white">Create Your Project</h6>
           
        </span><br/>
        <form onSubmit={HandleProjectCreation} className='text-white'>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2  md:gap-2">
            <input value={projectTiltle} onChange={(e)=>setProjectTitle(e.target.value)} type="text" placeholder="Title" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={projectDescription} onChange={(e)=>setProjectDescription(e.target.value)} type="text" placeholder="Description" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input value={projectSkills} onChange={(e)=>setProjectSkills(e.target.value)} type="text" placeholder="Skill" className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
           <input
  id="profilePic"
  type="file"
  accept="image/*"
  onChange={(e) => setProjectImage(e.target.files[0])}
  className="hidden"
/>

<label
  htmlFor="profilePic"
 className="w-full cursor-pointer p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {projectImage
    ? projectImage.name
    : "Project Picture"}
</label>
        
<input
  id="projectVideo"
  type="file"
  accept="video/*"
  onChange={(e) => setProjectVideo(e.target.files[0])}
  className="hidden"
/>

<label
  htmlFor="projectVideo"
  className="block w-full cursor-pointer p-2 mb-4 rounded-md border border-gray-300 text-gray-400 hover:border-blue-500"
>
  {projectVideo ? projectVideo.name : "Choose Video"}
</label>
          </div>
<button type="submit" className="bg-yellow-400 w-full cursor-pointer hover:bg-amber-400/80 p-2 rounded-md">Create Project</button>

        <button onClick={()=>setProjectCreateOpen(false)} type='button' className="absolute hover:text-red-600 top-2 right-2 cursor-pointer" ><i className="fa-solid fa-xmark"></i></button>
        </form>

        </div>
        </div>
    )
   }

{fullNameChangeisOpen&&(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-96 bg-gray-800 rounded-lg shadow-xl p-6">

        <button
          onClick={() => setFullNameChangeopen(false)}
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <h2 className="text-2xl font-bold text-white text-center">
          Change Full Name
        </h2>

        <form onSubmit={handleChangeFullName} className="mt-6">

          <input
          placeholder="Enter Name"
            id="profile"
            type="text"
            className="px-2 py-1.5 w-full outline-1 rounded-lg text-white outline-white"
            
            value={fullName}
            onChange={(e) => setFullNameChange(e.target.value)}
          />


          <button
            type="submit"
            className="w-full mt-5 bg-yellow-400 text-blue-900 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
          >
            Update Name
          </button>

        </form>
      </div>
    </div>
)}

   {
    loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="loader"><i className="fa-solid fa-circle-notch text-white animate-spin text-xl"></i></div>
        </div>
    )
   }
 </main>
    )
}

export default ProfilePage