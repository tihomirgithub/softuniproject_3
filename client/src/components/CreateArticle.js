import Container from 'react-bootstrap/Container'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useContext, useState } from 'react';
import { AppContext } from '../App';

const baseUrl = 'http://localhost:3030/jsonstore/articles';


function CreateArticle() {

  const initialState = [];
  
  const [articles, setArticles] = useState(initialState);

  const {tata} = useContext(AppContext);
  

  const schema = yup.object().shape({
    author: yup.string().max(15).required(),
    title: yup.string().max(15).required("required!!!!!!!!"),
    text: yup.string().required(),      
});
const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
});

const onSubmit = async (data) => {
  const responce = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data) 
  });
  const result = await responce.json();
  
  setArticles(initialState => [...initialState, {title:result.title}]); 
} 

  return (
    <Container>
        <Form onSubmit={handleSubmit(onSubmit)} >
     
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" placeholder={tata} value={tata} {...register("author")} />
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
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file"  />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    
  );
}

export default CreateArticle;