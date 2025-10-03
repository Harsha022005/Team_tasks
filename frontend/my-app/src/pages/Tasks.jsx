import React,{useState} from "react";
import { useEffect } from "react";
import axios from "axios";

function Tasks(){
    const [user_email, setUserEmail] = useState("");
    const [role, setRole] = useState("");
    const [tasks,settasks] = useState([]);
    const [title,settitle] = useState("");
    const [description,setdescription] = useState("");

    useEffect(()=>{
        const saved_token=localStorage.getItem("access_token");
        if(saved_token){
            try{
                const decoded=JSON.parse(atob(saved_token.split('.')[1]));
                setUserEmail(decoded.user_email);
                setRole(decoded.role);
            }catch(err){
                console.error("Invalid token:",err);
            }
        }   
    })
    async function handle_create_task(e){
        e.preventDefault();
        const task_data={
            title:title,
            description:description,
            user_email:user_email
        };
        try{
            const res=await axios.post("http://localhost:8000/task/create_task",task_data);
            if(res.status===200){
                alert("Task created successfully");
                settasks([...tasks,res.data]);
                settitle("");
                setdescription("");
            }       
        }
        catch(err){
            console.error("Error creating task:",err);
            alert("Error creating task. Please try again.");
        }
    }
    
    return (
        <div>
            <form action="">
                <div>
                    <input type="text" 
                    value={title}
                    onChange={(e)=>{settitle(e.target.value)}} />
                </div>
                <div>
                    <input type="text"
                    value={description}
                    onChange={(e)=>{setdescription(e.target.value)}} />
                </div>
                <button onClick={handle_create_task}>Create task</button>
            </form>
        </div>
    )
}