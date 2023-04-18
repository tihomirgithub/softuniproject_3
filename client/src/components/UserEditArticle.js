import Container from 'react-bootstrap/Container'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {useParams, useNavigate } from 'react-router-dom';

import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { result } from 'lodash';

const baseUrl = 'http://localhost:3030/data/articles';


function UserEditArticle() {

  const {authValues} = useContext(AppContext);

  const navigate = useNavigate();
  const { blogId } = useParams();

  const initialState = [];
  const [articles, setArticles] = useState(initialState);
  const [articleEdit, setArticleEdit] = useState([]);

  useEffect(() => {
    fetch (`${baseUrl}/${blogId}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setArticleEdit(Object.values(data));
      })

  }, [blogId])
  

  const schema = yup.object().shape({
    author: yup.string().max(15).required(),
    title: yup.string().max(15).required("required!!!!!!!!"),
    text: yup.string().required(), 
    image: yup.string(),    
});
const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
});

const {onUserEditSubmit} = useContext(AppContext);




  return (
    <Container>
      <Form onSubmit={handleSubmit(onUserEditSubmit)} >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Blog Id</Form.Label>
        <Form.Control readOnly type="text"  value={blogId} {...register("_id")} />
      </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Author</Form.Label>
          <Form.Control readOnly type="text"  value={authValues.userEmail} {...register("author")} />
          <p style={{color: "red"}} >{errors.author?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title: </Form.Label>
          <Form.Control type="text"  placeholder= {articleEdit[2]}  {...register("title")} />
          <p style={{color: "red"}} >{errors.title?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder= {articleEdit[3]} {...register("text")} />
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

export default UserEditArticle;