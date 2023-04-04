import Article from "./Article";

const BlogList = ({ 
  blogs
 }) => {
    return (
      <div >
        {blogs.map(blog => (
            <>
            
          <Article blog_image={blog.image} 
          blog_title={blog.title} 
          blog_text={blog.text}
          blog_author={blog.author} 
          blog_id={blog._id}
          blog_owner_id={blog._ownerId}
          blod_createdOn={blog._createdOn}

           />
            </>
        
        ))}
      </div>
    );
  }
   
  export default BlogList;