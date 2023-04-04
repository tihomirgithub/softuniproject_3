import { useEffect, useState } from "react";
import React from "react";
import BlogList from "./BlogList";
import { AppContext } from '../App';

const baseUrl = 'http://localhost:3030/data/articles';


function Home() {

  
  
  
  const [blogs, setBlogs] = useState(null);
 

  useEffect(() => {
    fetch(baseUrl)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setBlogs(Object.values(data));
      })
  }, [])
  console.log(blogs);
  return ( 
   <>
  
   <h1>Home</h1>
   
   <div >
 
      {blogs && <BlogList  blogs={blogs} />}
    </div>

    

   </>
  );
}

export default Home;