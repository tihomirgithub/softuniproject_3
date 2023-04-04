
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Navigationbar from './components/Navigationbar.js';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Register from './components/Register.js';

import CreateArticle from './components/CreateArticle.js';
import UserCreateArticle from './components/UserCreateArticle.js';
import {useState, createContext} from 'react';



export const AppContext = createContext();

const result = '';
const baseUrl = `http://localhost:3030/users`;

function App() {
  const navigate = useNavigate();
  const tata = "tat"; 

  const [auth, setAuth] = useState({});

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
     <AppContext.Provider value = {{tata, onLoginSubmit,onRegisterSubmit,onLogout, authValues}}>
     
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        
          <Route path="/createArticle" element={<CreateArticle />} />
          <Route path="/userCreateArticle" element={<UserCreateArticle />} />
        </Routes>
      
     </AppContext.Provider>
    
      
    </>
  );
  }

export default App;
