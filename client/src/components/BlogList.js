import Article from "./Article";

const BlogList = ({ 
  blogs,
  selectValue
 }) => {
    return (
      <div >
        {blogs.map(blog => (
            <>
            
          <Article selectValue={selectValue} blog_title={blog.title} blog_text={blog.text} blog_id={blog._id} />
            </>
        
        ))}
      </div>
    );
  }
   
  export default BlogList;