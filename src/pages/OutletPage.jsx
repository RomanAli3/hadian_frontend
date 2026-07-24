import {Outlet} from 'react-router-dom'
import HeaderSection from '../components/headerSection'
import Footer from '../components/FooterSection'
import { useContext,useEffect } from "react"
import { ProjectContext } from '../ProjectContext'

function OutletPage(){
         const {projects,setProjects} =useContext(ProjectContext)
     const getAllProjects=async()=>{

        try {
            const response= await fetch("http://localhost:8000/project/all-projects")
            const data = await response.json()
            setProjects(data.data)
        } catch (error) {
            console.log(error)
            
        }
    }
     useEffect(()=>{
            if (!projects || projects.length === 0) {
    getAllProjects();}
            console.log('projects',projects)
        },[],[projects])
    return(
        <>
        <HeaderSection/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default OutletPage