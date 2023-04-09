import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import _, { result, thru } from 'lodash';

import { useNavigate , useParams, Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Koala from "../assets/Koala";
import Desert  from "../assets/Desert";
import Chrysanthemum from "../assets/Chrysanthemum";


const baseUrl = 'http://localhost:3030/jsonstore/likes';

function Article({ 
  blog_title,
  blog_text,
  blog_id,
  blog_image,
  blog_author,
  blog_owner_id,
  blog_createdOn
}) {

  const [likes, setLikes] = useState([]);
  const navigate = useNavigate();
  const {authValues} = useContext(AppContext); 

  const { blogId } = useParams();

  const isOwner =Object.values({blog_owner_id})[0] == authValues.userId;
  const baseDeleteUrl = 'http://localhost:3030/data/articles';

  

let desertCheck = false;
let koalaCheck = false;
let chrysanthemumCheck = false;

  if (blog_image=="Desert") {
     desertCheck = true;
  }
  if (blog_image=="Koala") {
     koalaCheck = true;
  }
  if (blog_image=="Chrysanthemum") {
    chrysanthemumCheck = true;
 }
 
  const schema = yup.object().shape({
    user: yup.string().required(),
});
const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
});
  
  const onSubmit = async (data) => {
    console.log(data);
    const responce = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data) 
    });
    const result = await responce.json(); 
    
  } 

    useEffect(() => {
      fetch(baseUrl)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setLikes(Object.values(data));
        })
     
        
    }, [])
   

    var newArray = likes.filter(function (el)
    {
      return  el.blog_id == blog_id ;
    }
    );  
     const arr = newArray.map(object => object.user);    
    
     var bb = _.uniqWith(arr,_.isEqual);

 
  const onDeleteSubmit = async(data) => {   
    const responce = await fetch(`${baseDeleteUrl}/${data.blog_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        "X-Authorization": authValues.token
      },
      body: JSON.stringify(data) 
    });
    console.log(data);
    const result = await responce.json();
    navigate('/');
  }
    
  return (
    <>
    
    <Card style={{ width: '18rem' }}>
      {koalaCheck && <Koala />}
      {desertCheck && <Desert />}
      {chrysanthemumCheck && <Chrysanthemum />}

     

      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>author: { blog_author }</Card.Title>
        <Card.Title>title: { blog_title }</Card.Title>
        <Card.Text>
         text: {blog_text}
        </Card.Text>
       
       
    <form onSubmit={handleSubmit(onSubmit)}> 
        <input type="hidden" value = {blog_id} {...register("blog_id")} />
        <input type="hidden" value = {authValues.userEmail} {...register("user")} />
      <Button variant="warning"  type="submit">Like</Button> {bb.length}
    </form>

    {isOwner && 
    <form onSubmit={handleSubmit(onDeleteSubmit)}> 
    <input type="hidden" value = {blog_id} {...register("blog_id")} /> 
    <Button className="mt-1" variant="danger"  type="submit">Delete</Button> 
    </form>
    }
     
    

     {authValues.isAuthenticated && <Link to={`/${blog_id}`} className="button">Comments</Link>}

      </Card.Body>
    </Card>
   
    
    </>
    
  );
}

export default Article;