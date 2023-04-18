import { useEffect, useState, useContext} from "react";

import { AppContext } from '../App';

import React from "react";
import BlogList from "./BlogList";



const baseUrl = 'http://localhost:3030/data/articles';


function Home() {

  
  const {authValues} = useContext(AppContext);
  
  const [blogs, setBlogs] = useState(null);
 

  useEffect(() => {
    fetch(baseUrl)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setBlogs(Object.values(data));
      })
  }, [blogs])

 
  
  
  return ( 
   <>
    {!authValues.isAuthenticated &&
     <h1>To make a like, comments or create articles you need to register and login !</h1>
    }
    {authValues.isAuthenticated &&
    <h1 class="text-center" >Enjoy !</h1>
    }
   
   
   <div >
 
      {blogs && <BlogList  blogs={blogs} />}
    </div>

    

   </>
  );
}

export default Home;