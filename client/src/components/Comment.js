
const Comment =({
    author,
    text
}) => {
    return (
        <>
         <h3>Author: {author}</h3> 
         <p>Text: {text}</p>
        </>
    )
}
export default Comment;