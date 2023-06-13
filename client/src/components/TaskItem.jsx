import React from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
function TaskItem(props) {
  // console.log(props.image);
  const navigate = useNavigate()
  const handleDelete = () => {
    
    toast((t)=>(
      <div>
        <p className="text-white">Do you want to delete "{props.title}"?</p>
        <div className="w-full flex justify-around m-2">
          <button onClick={async (e)=>{
            const message = await props.deletePost(e, props.id, props.num)
            toast.success(`Post ${message.title} deleted`,{
              duration: 2000
            })
            toast.dismiss(t.id)
          }} className="bg-red-700 hover:bg-red-500 font-bold rounded-md text-white p-2 capitalize">Delete</button>

          <button onClick={()=>{
            toast.dismiss(t.id)
          }} className="text-white bg-zinc-600 hover:bg-zinc-500 p-2 rounded-md  font-bold capitalize">Cancel</button>
        </div>
      </div>
    ),{
      duration: 4000,
      style:{
        background: "#202020"
      }
    })
  }
  return (
    <div
      className="bg-gray-700 text-white  p-3 m-3
    shadow-md hover:bg-gray-500 cursor-pointer h-fit"
    onClick={(e) => {
      navigate(`/tasks/${props.id}`);
    }}
    >
      <div className="flex justify-between" >
        <div
          className="flex flex-col grow mb-2"
          > 
          
            <p className="uppercase text-2xl">{props.title}</p>
            <p>{props.content}</p>
          </div>
      </div>
      <button
        // onClick={(e) => {
        //   props.deletePost(e, props.id, props.num);
        // }}
        onClick={(e)=>{
          e.preventDefault()
          e.stopPropagation()
          handleDelete()
        }}
        className="p-2 bg-red-600 rounded-md font-semibold text-md hover:bg-red-500 transition-colors hover:shadow-md"
      >
        Delete
      </button>
      <div>
        {props.image && (
          <img
            className="mt-2 object-cover h-44 w-full object-center"
            src={props.image ? props.image.url : ""}
            alt="img"
          />
        )}
      </div>
    </div>
  );
}

export default TaskItem;
