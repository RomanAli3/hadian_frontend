import { ProjectContext } from "../ProjectContext"
import { AuthContext } from "../UserContext"
import { useContext, useEffect, useState } from "react"
function ProjectPage(){
    const {user,setUser} = useContext(AuthContext)
    const {projects,setProjects} =useContext(ProjectContext)
    const [allProjects,setAllProjects]=useState([])
      const [students, setStudents] = useState([]);
      const isAdmin = user?.role === "admin";
      useEffect(()=>{
        getAllStudents()
      },[])
     const getAllStudents = async () => {
         try {
                
                const response =await fetch("http://localhost:8000/user/all-users",{
                    method:"GET",
                });
                const data = await response.json();
                setStudents(data.data);
         }
         catch (error) {
             console.error("Error fetching students:", error);
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
                   getAllProjects()
            }

        }
 
    return(
        <main className="min-h-[80vh]">
           <div>
            <h3 className="text-3xl font-bold p-3">All Students Projects</h3>
           </div>
           <br/>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
            {projects.map((projects)=>(
                <div className="bg-slate-100 relative rounded-2xl shadow" key={projects._id}>
                      {isAdmin &&  <i onClick={()=>deleteProjectByAdmin(projects._id)} className="fa-solid fa-trash-can absolute top-4 right-4 text-red-500 hover:text-red-600"></i>}
                    <img className="w-full rounded-t-2xl" src={projects?.image}/>
                   
                    <div className="m-4">
                        <p className=" text-lg font-semibold">{projects.title}</p>
                        <p className="">{projects.description}</p>
                        <span><strong>Skills : </strong>{projects.skills}</span><br/>
                  <span>
                   <strong>Owner : </strong> @{students.find((student)=>
                   student._id === projects.owner 
                )?.userName  }
                  </span>
                  <br/>
                   {projects.video&&(
                     <a target="_blank" className="underline cursor-pointer hover:text-blue-700" href={projects.video}>
                       Watch Video
                    </a>
                   )}
                
                        </div>
                 </div>
            ))}
           </div>
        </main>
    )
}

export default ProjectPage