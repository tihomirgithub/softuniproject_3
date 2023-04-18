
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Navigationbar from './components/Navigationbar.js';

import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Register from './components/Register.js';




import UserCreateArticle from './components/UserCreateArticle.js';
import {useState,useEffect, createContext} from 'react';
import ArticleComments from './components/ArticleComments.js';
import UserEditArticle from './components/UserEditArticle.js';

export const AppContext = createContext();

const baseUrlArticles = 'http://localhost:3030/data/articles';
const baseDeleteUrl = 'http://localhost:3030/data/articles';

const result = '';
const baseUrl = `http://localhost:3030/users`;

function App() {
  const navigate = useNavigate();
  
  const [blogs, setBlogs] = useState(null);
  const [auth, setAuth] = useState({});
  const [authRegister, setAuthRegister] = useState({});
  

  const onUserCreateSubmit = async (data) => {
    console.log(data);
  
    const responce = await fetch(baseUrlArticles, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        "X-Authorization": authValues.token
      },
      body: JSON.stringify(data) 
    });
    const result = await responce.json();
    console.log (result);
    //setBlogs(s => [...s, result]);
    navigate('/');
  }

  const onUserEditSubmit = async (data) => {
    console.log(data);
  
    const responce = await fetch(`${baseDeleteUrl}/${data._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        "X-Authorization": authValues.token
      },
      body: JSON.stringify(data) 
    });
    const result = await responce.json();
    console.log (result);
    //setBlogs(s => [...s, result]);
    navigate('/');
  }
  
  const onDeleteSubmit = async(data) => {   
    const responce = await fetch(`${baseDeleteUrl}/${data.blog_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        "X-Authorization": authValues.token
      },
      body: JSON.stringify(data) 
    });
    console.log(data);
    //setBlogs(blogs => blogs.filter((blog) => blog._id !== data.blog_id));
    navigate('/');
  }




  const onLoginSubmit = async (data) => {
        const responce = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(data) 
        });
        const result = await responce.json();
        console.log(result.message);
       
       
      setAuth(result);

      
      

      result.message && setTimeout(() => setAuth({
        ...auth,
        message: null
      }), 2000);
      
      
      !result.message && navigate ('/');
         
  } 
  const onRegisterSubmit = async (data) => {
    const responce = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data, authValues.token) 
    });
    const result = await responce.json();
   
  setAuthRegister(result);
  setTimeout(() => setAuthRegister({}), 2000);
  !result.message && navigate ('/');  
} 
  const onLogout = () => {
      setAuth({});
      setAuthRegister({});
  }

 

const authValues = { 
  userId: auth._id,
  token: auth.accessToken,
  userEmail: auth.email,
  isAuthenticated: !!auth.accessToken,
  message: auth.message
}
const authRegisterValues = { 
  userId: authRegister._id,
  token: authRegister.accessToken,
  userEmail: authRegister.email,
  isAuthenticated: !!authRegister.accessToken,
  message: authRegister.message
}

  return (
    <>
     <AppContext.Provider value = {{onUserCreateSubmit, onUserEditSubmit, onDeleteSubmit, onLoginSubmit,onRegisterSubmit,onLogout, authValues, authRegisterValues}}>
     
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home   onDeleteSubmit={onDeleteSubmit} />} />
          <Route path='/:blogId' element={<ArticleComments />} />
          <Route path='/:blogId/edit' element={<UserEditArticle />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        
         
          <Route path="/userCreateArticle" element={<UserCreateArticle />} />

         
        </Routes>
      
     </AppContext.Provider>
    
      
    </>
  );
  }

export default App;
