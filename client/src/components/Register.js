import Container from 'react-bootstrap/Container'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useContext } from "react";
import { AppContext } from '../App';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';




const result = '';
const baseUrl = `http://localhost:3030/users`;

function Register() {
  const {authRegisterValues} = useContext(AppContext); 
  const schema = yup.object().shape({
    email: yup.string().required('Wake up !!!!!!!!!'),
    password: yup.string().required('Wake up !!!!!!!!!'),        
});
const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
});

const {onRegisterSubmit} = useContext(AppContext);


  


  return (
    <Container>
      
       <Form onSubmit={handleSubmit(onRegisterSubmit)} >
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email")} />
        <p style={{color: "red"}} >{errors.email?.message}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password")} />
       <p style={{color: "red"}} >{errors.password?.message}</p> 
      </Form.Group>
       {authRegisterValues.message && <h3 class="text-danger" >{authRegisterValues.message}</h3> } 
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    
  );
}

export default Register;