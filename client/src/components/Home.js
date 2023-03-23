import { useEffect, useState } from "react";
import React from "react";
import BlogList from "./BlogList";
import { AppContext } from '../App';

const baseUrl = 'http://localhost:3030/jsonstore/articles';


function Home() {

  
    const [selectValue, setSelectValue] = React.useState("");
    const onChange = (event) => {
      const value = event.target.value;
      setSelectValue(value);
    };
  
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
   <div>
      <h2 className="mb-3">React Select onChange Example</h2>
      <select onChange={onChange} className="form-select">
        <option defaultValue disabled>
          Select Fruit
        </option>
        <option value="Apples">Apples</option>
        <option value="Grape">Grape</option>
        <option value="Bananas">Bananas</option>
        <option value="Blueberries">Blueberries</option>
        <option value="Melons">Melons</option>
      </select>
      {selectValue && <h2 className="mt-3">{selectValue}</h2>}
    </div>
      {blogs && <BlogList selectValue={selectValue} blogs={blogs} />}
    </div>

    

   </>
  );
}

export default Home;