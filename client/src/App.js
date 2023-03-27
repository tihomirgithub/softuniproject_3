
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Navigationbar from './components/Navigationbar.js';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Register from './components/Register.js';
import Select from './components/Select.js';
import CreateArticle from './components/CreateArticle.js';
import {useState, createContext} from 'react';



export const AppContext = createContext();

const result = '';
const baseUrl = `http://localhost:3030/users`;

function App() {
  const navigate = useNavigate();
  const tata = "tat";
  const user = "bb";

  

  const [auth, setAuth] = useState({});

const onSubmit = async (data) => {
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
     <AppContext.Provider value = {{tata, user, onSubmit,onLogout, authValues}}>
     
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/select" element={<Select />} />
          <Route path="/createArticle" element={<CreateArticle />} />
        </Routes>
      
     </AppContext.Provider>
    
      
    </>
  );
  }

export default App;
