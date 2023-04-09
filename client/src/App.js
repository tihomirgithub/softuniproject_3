
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

export const AppContext = createContext();

const baseUrlArticles = 'http://localhost:3030/data/articles';

const result = '';
const baseUrl = `http://localhost:3030/users`;

function App() {
  const navigate = useNavigate();
  
  const [blogs, setBlogs] = useState(null);
  const [auth, setAuth] = useState({});

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
        console.log(result);
      setAuth(result);
      navigate('/');    
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
    console.log(result);
  setAuth(result);
  navigate('/');    
} 
  const onLogout = () => {
      setAuth({});
  }

const authValues = { 
  userId: auth._id,
  token: auth.accessToken,
  userEmail: auth.email,
  isAuthenticated: !!auth.accessToken
}

  return (
    <>
     <AppContext.Provider value = {{onUserCreateSubmit, onLoginSubmit,onRegisterSubmit,onLogout, authValues}}>
     
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path='/:blogId' element={<ArticleComments />} />
          
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
