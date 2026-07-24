import { useEffect,useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../UserContext";
function StudensSection() {
    const [students, setStudents] = useState([]);
    const [length,setLength]=useState(6)
    const {user,setUser} =useContext(AuthContext)
const isAdmin = user?.role === "admin";
  
     const [loading, setLoading] = useState(false);
useEffect(()=>{
    getAllStudents()
},[])

     const getAllStudents = async () => {
         try {
                setLoading(true);
                const response =await fetch("http://localhost:8000/user/all-users",{
                    method:"GET",
                });
                const data = await response.json();
                setStudents(data.data);
         }
         catch (error) {
             console.error("Error fetching students:", error);
         }
         finally {
             setLoading(false);
         }
console.log("Students data:", students);
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
  return (
    <div className="bg-slate-200 py-20">
<h2 className="text-3xl font-bold text-center mb-10">All Users</h2>
{loading?<div><h5 className="text-center text-3xl font-bold">Loading...</h5></div>:
<div className="grid grid-cols-1  md:grid-cols-3 gap-5 m-5 ">
    {students.slice(0,length).map((student) => (
<div className="bg-white shadow-md rounded-lg relative p-6 mb-4" key={student._id}>
   {isAdmin &&  <i onClick={()=>deleteUserByAdmin(student._id)} className="fa-solid fa-trash-can absolute top-4 right-4 text-red-500 hover:text-red-600"></i>}
 <div>
    <img src={student.profilePicture} alt={student.fullName} className="w-20 h-20 rounded-full mb-4" />
   <p className="text">@{student.userName}</p><br/>
    <span>
        <h4><strong>Full Name: </strong>{student.fullName}</h4>
        <p><strong>Course: </strong>{student.course}</p>
        <p><strong>Experience: </strong>{student.experience} year</p>
        <p><strong>Phone: </strong>{student.phoneNumber}</p>
        <p><strong>Email: </strong>{student.email}</p>
    </span>
    </div>    
</div>
))}

</div>}
{students.length>6&&<p onClick={()=> {
    if (length === 6) {
      setLength(students.length);
    } else {
      setLength(6);
    }
  }} className="underline cursor-pointer  text-blue-900 text-center">{students.length==length?"Show less":"Show more"}</p>

}
</div>

)}
export default StudensSection