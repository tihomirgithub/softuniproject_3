import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App';
import Container from 'react-bootstrap/Container'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import _, { result, thru } from 'lodash';
import Form from 'react-bootstrap/Form';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Koala from "../assets/Koala";
import Desert  from "../assets/Desert";
import Chrysanthemum from "../assets/Chrysanthemum";


const baseUrl = 'http://localhost:3030/data/articles';
const baseCommentsUrl = 'http://localhost:3030/jsonstore';

function ArticleComments() {

  const [articleComments, setArticleComments] = useState([]);
  const navigate = useNavigate();
  const {authValues} = useContext(AppContext); 
  const { blogId } = useParams();

  

 
 

  

let desertCheck = false;
let koalaCheck = false;
let chrysanthemumCheck = false;

if (articleComments[4]=="Desert") {
  desertCheck = true;
}
if (articleComments[4]=="Koala") {
  koalaCheck = true;
}
if (articleComments[4]=="Chrysanthemum") {
 chrysanthemumCheck = true;
}

 
 
  const schema = yup.object().shape({
    user: yup.string().required(),
});
const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
});
  
  const onCommentCreateSubmit = async (data) => {
    console.log(data);
    const responce = await fetch(`${baseCommentsUrl}/${data.blog_id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data) 
    });
    const result = await responce.json(); 
    
  } 

    useEffect(() => {
      fetch (`${baseUrl}/${blogId}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setArticleComments(Object.values(data));
        })

    }, [blogId])

    console.log(articleComments);
   

  
 
  
    
  return (
    <>
    
    <Card style={{ width: '18rem' }}>
      {koalaCheck && <Koala />}
      {desertCheck && <Desert />}
      {chrysanthemumCheck && <Chrysanthemum />}

      

      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>author:{articleComments[1]} </Card.Title>
        <Card.Title>title:{articleComments[2]} </Card.Title>
        <Card.Text>
         text: {articleComments[3]}
        </Card.Text>
       
     
      </Card.Body>
    </Card>

    <Container>
      <h1>Make a Comment</h1>
        <Form onSubmit={handleSubmit(onCommentCreateSubmit)} >
     
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Author</Form.Label>
        <Form.Control readOnly type="text"  value={authValues.userEmail} {...register("author")} />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("text")} />
        <p style={{color: "red"}} >{errors.text?.message}</p>
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
   
    
    </>
    
  );
}

export default ArticleComments;