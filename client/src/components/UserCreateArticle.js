import Container from 'react-bootstrap/Container'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {  useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { result } from 'lodash';

const baseUrl = 'http://localhost:3030/data/articles';


function UserCreateArticle() {

  const {authValues} = useContext(AppContext);

  const navigate = useNavigate();

  const initialState = [];
  const [articles, setArticles] = useState(initialState);

  
  

  const schema = yup.object().shape({
    author: yup.string().max(15).required(),
    title: yup.string().max(15).required("required!!!!!!!!"),
    text: yup.string().required(), 
    image: yup.string(),    
});
const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
});

const {onUserCreateSubmit} = useContext(AppContext);




  return (
    <Container>
        <Form onSubmit={handleSubmit(onUserCreateSubmit)} >
     
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Author</Form.Label>
        <Form.Control readOnly type="text"  value={authValues.userEmail} {...register("author")} />
        <p style={{color: "red"}} >{errors.author?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="title" {...register("title")} />
        <p style={{color: "red"}} >{errors.title?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("text")} />
        <p style={{color: "red"}} >{errors.text?.message}</p>
      </Form.Group>
     


     
      <Form.Group controlId="formBasicSelect">
     <Form.Label>Select Image</Form.Label>
     <Form.Control as="select" {...register("image")} >
        <option value="">choose image</option>
        <option value="Chrysanthemum">Chrysanthemum</option>
        <option value="Desert">Desert</option>
        <option value="Koala">Koala</option>
     
     </Form.Control>
 </Form.Group>

     



      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    
  );
}

export default UserCreateArticle;