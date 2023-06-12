import React from "react";
import { postContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
function Tasks() {
  const { posts, getPost, deletePost } = postContext();
  
  // console.log(tasks);
  return (
    <div className="flex flex-col w-screen justify-center m-auto">
      <div className="flex  justify-center w-3/6 m-auto text-white">
        <div className="flex flex-col md:flex-row align-middle w-1/2 justify-between">
          <p className="text-lg text-center">Posts({posts.length})</p>
          <a
            href="/tasks"
            className="p-2 bg-violet-900 text-center rounded-md font-semibold text-md hover:bg-violet-800 transition-colors hover:shadow-md hover:shadow-violet-700"
          >
            Create New Post
          </a>
        </div>
      </div>
      <form className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-center text-center mt-5">
        {posts.map((post, index) => {
        
          return (
            <TaskItem key={index} num={index} title={post.title} content={post.content}
            image={post.image ? post.image : ""}
            deletePost={deletePost}
            getPost = {getPost}
            id={post._id} />
          );
        })}
      </form>
    </div>
  );
}

export default Tasks;
