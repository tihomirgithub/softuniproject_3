import Container from 'react-bootstrap/Container'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useState } from 'react';

const result = '';
const baseUrl = `http://localhost:3030/users`;

function Login() {
 
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),        
});
const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
});

const [auth, setAuth] = useState({});

const onSubmit = async (data) => {

console.log(data);
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

} 
   

  return (
    <Container>
      
       <Form onSubmit={handleSubmit(onSubmit)} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password")} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    
  );
}

export default Login;