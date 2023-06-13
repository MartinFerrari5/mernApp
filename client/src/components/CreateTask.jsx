import React, { useEffect, useState } from "react";
import { postContext } from "../context/TaskContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import {AiOutlineLoading3Quarters as Spinner} from "react-icons/ai"
function CreateTask() {
  const violet = `p-2 bg-violet-900 rounded-md font-semibold text-lg
  hover:bg-violet-800 hover:shadow-md hover:shadow-violet-700 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none`
  const green = `p-2 bg-green-900 rounded-md font-semibold text-lg
  hover:bg-green-800 hover:shadow-md hover:shadow-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none`
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = useParams().id;
  const navigate = useNavigate()
  const [newPost, setNewPost] = useState({
    title:"",
    content:"",
    image:null
  })
  const {  savePost, updatePost, getPost, posts } = postContext();
 
 
if(id){
  useEffect(() => {
    const fetchData = async () => {
      const res=await getPost(id);
      setNewPost({
        title: res.title,
        content: res.content,
       
       })
     
    };
    fetchData();
  }, []);
}
  
 
  return (
    <div className="m-auto flex justify-center w-11/12 md:w-3/4 lg:w-2/4">
        
      <Formik 
        initialValues={newPost}
        validationSchema={Yup.object({
          title: Yup.string().required("Title required"),
          content: Yup.string().required("Content required")
        })}
        onSubmit={async (values, actions) => {
         
           if (!id) await savePost(values)
          else {
            const res= await updatePost(id, values)
            
          }
          
          actions.setSubmitting(false)
          navigate("/")
        }}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <Form
          
            className="text-white bg-gray-800 p-3 w-4/5 overflow-hidden m-auto"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              {isSubmitting && <Spinner className="animate-spin w-12 h-12 m-auto"/>}
            </div>
            <div className="flex justify-between ">
              <p>New Post</p>
              <p>
                <Link to="/">
                  Back
                </Link>
              </p>
            </div>
            <div className="campo flex flex-col m-2">
              <label className="text-gray-500" htmlFor="title">
                Title
              </label>
              
              <Field
                name="title"
                placeholder="Title"
                className="bg-gray-500 p-1 outline-none"
               
              />
              <ErrorMessage component="p" className="text-red-600" name="title"/>
            </div>
            <div className="campo flex flex-col m-2">
              <label className="text-gray-500" htmlFor="content">
                Descripcion
              </label>
              <Field
              component="textarea"
              rows="3"
                name="content"
                placeholder="Content"
                className="bg-gray-500 resize-none p-1 outline-none"
              />
              <ErrorMessage component="p" className="text-red-600" name="content"/>
            </div>
            <div className=" overflow-ellipsis whitespace-nowrap">
              <input type="file" name="image" onChange={(e)=>{
                setFieldValue("image", e.target.files[0])
              }}/>
            </div>

            {!id ? (
              <button
                type="submit"
                className= {violet}
                disabled={isSubmitting}
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                className= {green}
                disabled={isSubmitting}
              >
                Update
              </button>
            )}
          </Form>
        )}
      </Formik>
   
    </div>
  );
}

export default CreateTask;
