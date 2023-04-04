import {  useContext } from "react";
import { AppContext } from '../App';

import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigationbar() {

  const {authValues} = useContext(AppContext);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          
          <Nav className="me-auto">
            <Nav.Link>
            {' '}
              <Link className="text-decoration-none text-white" to="/">
                Home
              </Link>
            </Nav.Link>
            {authValues.isAuthenticated && (                    
            <Nav.Link>
            {' '}
              <Link className="text-decoration-none text-white" to="/logout">
                Logout
              </Link>
            </Nav.Link>    
                )}

            {authValues.isAuthenticated && (                    
            <Nav.Link>
            {' '}
              <>
              hi {authValues.userEmail}  
              </>
            </Nav.Link>    
                )}
             {authValues.isAuthenticated && (                    
            <Nav.Link>
            {' '}
            <Link className="text-decoration-none text-white" to="/userCreateArticle">
                UserCreateArticle
              </Link>
            </Nav.Link>    
                )}   
                

            {!authValues.isAuthenticated && (                    
            <Nav.Link>
            {' '}
              <Link className="text-decoration-none text-white" to="/login">
                Login
              </Link>
            </Nav.Link>    
                )}

            {!authValues.isAuthenticated && (                    
            <Nav.Link>
            {' '}
              <Link className="text-decoration-none text-white" to="/register">
                Register
              </Link>
            </Nav.Link>    
                )}
            
          
            <Nav.Link>
            {' '}
              <Link className="text-decoration-none text-white" to="/createArticle">
                CreateArticle
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;