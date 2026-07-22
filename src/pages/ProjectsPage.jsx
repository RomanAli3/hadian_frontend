import { ProjectContext } from "../ProjectContext"
import { useContext, useEffect, useState } from "react"
function ProjectPage(){
    const {projects,setProjects} =useContext(ProjectContext)
    const [allProjects,setAllProjects]=useState([])
    useEffect(()=>{
        getAllProjects()
        console.log('projects',projects)
    },[])
    const getAllProjects=async()=>{

        try {
            const response= await fetch("http://localhost:8000/project/all-projects")
            const data = await response.json()
            setProjects(data.data)
            
            setAllProjects(data.data)
        } catch (error) {
            console.log(error)
            
        }
    }
    return(
        <main className="min-h-[80vh]">
           <div>
            <h3 className="text-3xl font-bold p-3">All Students Projects</h3>
           </div>
           <br/>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
            {allProjects.map((projects)=>(
                <div className="bg-slate-100 rounded-2xl shadow" key={projects.id}>
                    <img className="w-full rounded-t-2xl" src={projects?.image}/>
                    <div>
                        <p>{projects.title}</p>
                        </div>
                 </div>
            ))}
           </div>
        </main>
    )
}

export default ProjectPage