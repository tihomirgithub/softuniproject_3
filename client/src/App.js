
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Navigationbar from './components/Navigationbar.js';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Select from './components/Select.js';
import CreateArticle from './components/CreateArticle.js';
import {createContext} from 'react';

export const AppContext = createContext();

function App() {
  const tata = "tat";
  const user = "bb";

  
 

  return (
    <>
     <AppContext.Provider value = {{tata, user}}>
     <BrowserRouter>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/select" element={<Select />} />
          <Route path="/createArticle" element={<CreateArticle />} />
        </Routes>
      </BrowserRouter>
     </AppContext.Provider>
    
      
    </>
  );
  }

export default App;
