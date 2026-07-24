import { AuthContext } from "../UserContext"
import { ProjectContext } from "../ProjectContext"
import { useContext, useState,useEffect } from "react"
function ProfilePage(){
    const {user,setUser} = useContext(AuthContext)
        const {projects,setProjects} =useContext(ProjectContext)
        const [myProjects,setMyProjects]=useState([])
        
            useEffect(()=>{
              setProjects(projects)
            },[projects])
        

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
            alert("Error: Please Change Time Zone ")
          }
          finally{
            setLoading(false)
            window.location.reload()
          }

         }


           const deleteUserByAdmin=async(userId)=>{

               const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;
            try {
                const response = await fetch (`http://localhost:8000/user/delete/${userId}`,{
                    method:"DELETE",
                    credentials:"include"
                })

                const data = await response.json()
              
                alert("User Delete Successfully")
            } catch (error) {
                console.log(error)
                alert(error)
            }
            finally{
                   getAllStudents();
            }

        }


         const [oldPassword,setOldPassword]=useState('')
         const [newPassword,setNewPassword]=useState('')
         const [passwordChangeisOpen,setPasswordChangeopen]=useState(false)

         const handleChangePassword=async(e)=>{
          e.preventDefault()

          if(!oldPassword.trim()||!newPassword.trim()){
            alert("Please enter all fields")
          }

          try {
            setLoading(true)
            const response =await fetch("http://localhost:8000/user/change-password",{
              method:"PATCH",
              credentials:"include",
              headers:{
             "Content-Type": "application/json"
          },
          body:JSON.stringify({
            oldPassword:oldPassword,
            newPassword:newPassword
          })
            })

            
            const data = await response.json()

            if(response.ok){
              alert("Password change successfully")
            }
            setOldPassword("")
            setNewPassword("")
            
          } catch (error) {
            console.log(error)
            alert("error while changing password")
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
     const deleteProjectByAdmin=async(projectId)=>{

               const confirmDelete = window.confirm("Are you sure you want to delete this Project?");

    if (!confirmDelete) return;
            try {
                const response = await fetch (`http://localhost:8000/project/delete-project/${projectId}`,{
                    method:"DELETE",
                    credentials:"include"
                })

                const data = await response.json()
              
                alert("Project Delete Successfully")
            } catch (error) {
                console.log(error)
                alert(error)
            }
            finally{
                window.location.reload()
            }

        }
    return(
        <main>
            <div className="min-h-screen">
<div className="bg-linear-to-r from-slate-900 to-slate-800 text-white shadow-lg">
  {user ? (
    <>
      <div className="max-w-6xl mx-auto py-10 px-5">

        {/* Profile */}
        <div className="flex flex-col items-center">

          <div className="relative">
            <img
              src={user.profilePicture}
              className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover shadow-xl"
            />

            <button
              onClick={() => setProfileIsOpen(true)}
              className="absolute bottom-1 right-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center"
            >
              <i className="fa-solid fa-camera text-white text-sm"></i>
            </button>
          </div>

          <h4 className="mt-4 text-gray-300 text-lg">
            @{user.userName}
          </h4>

          <h2 className="text-3xl font-bold flex items-center gap-2">
            {user.fullName}
            <i
              onClick={() => setFullNameChangeopen(true)}
              className="fa-solid fa-pen-to-square text-lg cursor-pointer hover:text-blue-400"
            ></i>
          </h2>

          <p className="text-gray-400 mt-2">
            {user.email}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

          <div className="bg-slate-700 rounded-xl p-5 text-center shadow">
            <h5 className="text-gray-300">Skills</h5>
            <p className="font-bold mt-2">{user.skills}</p>
          </div>

          <div className="bg-slate-700 rounded-xl p-5 text-center shadow">
            <h5 className="text-gray-300">Experience</h5>
            <p className="font-bold mt-2">{user.experience} Year</p>
          </div>

          <div className="bg-slate-700 rounded-xl p-5 text-center shadow">
            <h5 className="text-gray-300">Phone</h5>
            <p className="font-bold mt-2">{user.phoneNumber}</p>
          </div>

          <div className="bg-slate-700 rounded-xl p-5 text-center shadow">
            <h5 className="text-gray-300">Course</h5>
            <p className="font-bold mt-2">{user.course}</p>
          </div>

        </div>

      </div>
    </>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <h2 className="text-3xl font-bold text-white animate-pulse">
        Loading...
      </h2>
    </div>
  )}
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
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
       {projects
    ?.filter(project => project.owner === user?._id)
    .map(project => (
            <div className="bg-slate-100 relative rounded-2xl shadow" key={project._id}>
                      <i onClick={()=>deleteProjectByAdmin(project._id)} className="fa-solid fa-trash-can absolute top-4 right-4 text-red-500 hover:text-red-600"></i>
                    <img className="w-full rounded-t-2xl" src={project?.image}/>
                   
                    <div className="m-4">
                        <p className=" text-lg font-semibold">{project.title}</p>
                        <p className="">{project.description}</p>
                        <span><strong>Skills : </strong>{project.skills}</span><br/>
                 
                  <br/>
                   {project.video&&(
                     <a target="_blank" className="underline cursor-pointer hover:text-blue-700" href={project.video}>
                       Watch Video
                    </a>
                   )}
                
                        </div>
                 </div>
         )
        )}
  </div></div>
  <div className="m-5 flex gap-3">
    <button className="bg-slate-100 cursor-pointer rounded-lg border p-3" onClick={()=>setPasswordChangeopen(true)}>Change Password</button>
    <button className="bg-slate-100 cursor-pointer rounded-lg border p-3"  onClick={()=>deleteUserByAdmin(user._id)}>Delete Account</button>
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
  {projectVideo ? "Video added" : "Choose Video"}
</label>
          </div>
<button type="submit" className="bg-yellow-400 w-full cursor-pointer hover:bg-amber-400/80 p-2 rounded-md">Create Project</button>

        <button onClick={()=>{
           setProjectTitle('')
              setProjectSkills("")
              setProjectDescription('')
              setProjectVideo(null)
              setProjectImage(null)
          setProjectCreateOpen(false)

        }} type='button' className="absolute hover:text-red-600 top-2 right-2 cursor-pointer" ><i className="fa-solid fa-xmark"></i></button>
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


{passwordChangeisOpen&&(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-96 bg-gray-800 rounded-lg shadow-xl p-6">

        <button
          onClick={() => {
            setPasswordChangeopen(false)
            setOldPassword("")
            setNewPassword("")
          }}
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <h2 className="text-2xl font-bold text-white text-center">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="mt-6">

          <input
          placeholder="Old Password"
            id="profile"
            type="text"
            className="px-2 py-1.5 w-full outline-1 rounded-lg text-white outline-white"
            
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

           <input
          placeholder="New Password"
            id="profile"
            type="text"
            className="px-2 mt-4 py-1.5 w-full outline-1 rounded-lg text-white outline-white"
            
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full mt-5 bg-yellow-400 text-blue-900 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
          >
            Update Password
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