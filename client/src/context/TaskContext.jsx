import { createContext, useEffect, useState, useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
const TaskContext = createContext();

export const postContext = () => {
    return useContext(TaskContext)
}

const TaskContextProvider = (props) =>{
   
    const [posts, setPost] = useState([])
    const [oldPost, setOldPost] = useState()

    const savePost = async (values) => {
        const {title, content, image} = values
        console.log(values)
        const form = new FormData()

        for(let key in values){
            form.append(key, values[key])
        }
        
    
        if(title.length==0 || content.length==0) return
        else{ 
            
        // window.location.href="/"
        const url = "http://localhost:3000/"
        const result = await axios.post(url, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        setPost(prevalue =>{
            return [
                ...prevalue,
                result.data
            ]
        })
        console.log(result.data)
       
        }
    }
    const getPost = async (id) =>{
        const url = `http://localhost:3000/post/${id}`
       const response = await axios.get(url)
       
       
       return response.data
    }

    const updatePost = async (id,values) =>{
        const {title, content} = values
        const form = new FormData()

        for(let key in values){
            form.append(key, values[key])
        }
        const res = await axios.put(`http://localhost:3000/tasks/${id}`,form,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        setPost(posts.map(post=> post._id == id ? res.data : post))
        
        return res.data
        
        
        
    }
    const deletePost=async (e,id, k)=>{
        e.preventDefault()
      
       const deletedPosts = posts.filter((post, i)=> i!==k);
       setPost(deletedPosts)
        const url = `http://localhost:3000/delete/${id}`
        const response = await axios.delete(url)
        return response.data
    }
    useEffect(()=>{
        const fetchData = async ()=> {
            const response = await axios.get("http://localhost:3000/api");
            // const result = await response.json()
            // console.log(response)
            setPost(response.data)
        }
        fetchData()
    },[])
    return (
        <TaskContext.Provider value={{
            posts: posts,
            savePost,
            updatePost,
            deletePost,
            getPost,
            
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}
export default TaskContextProvider
